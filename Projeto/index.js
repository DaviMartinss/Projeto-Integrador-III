//Aplication IMPORTS
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import aes256 from "aes256";

//Repository IMPORTS - SERA REMOVIDO AO IMPLEMENTAR OS CONTROLLERS
//#region Repositorys
import { database } from "./repository/db.js";
import { receitaRepository } from "./repository/ReceitaRepository.js";
import { cartaoDebitoRepository } from "./repository/CartaoDebitoRepository.js";
import { cartaoCreditoRepository } from "./repository/CartaoCreditoRepository.js";
import { userRepository } from "./repository/UserRepository.js";
//#endregion

//Controlers IMPORTS
//#region Controllers
import { userController } from "./controllers/UserController.js";
import { categoriaController } from "./controllers/CategoriaController.js";
import { cartaoController} from "./controllers/CartaoController.js";
import { cartaoCreditoController } from "./controllers/CartaoCreditoController.js";
import { cartaoDebitoController } from "./controllers/CartaoDebitoController.js";
import { sendEmailController} from "./controllers/SendEmailController.js";
import { receitaController } from "./controllers/ReceitaController.js";
import { despesaController} from "./controllers/DespesaController.js"
import { homeController} from "./controllers/HomeController.js"
//#endregion

//Services IMPORTS
//#region Services
import { sendMail, sendMailBemVindo } from "./microservice/Email/sendEmail.js";
import multer from "multer"; //Upload de arquivos
import { Console } from "console"; //Upload de arquivos
//#endregion

//Configurações Globais da Aplicação
//#region Configurações

//Variavel global responsável pela seção do usuário
var user = undefined;

//Variavel de resgate do nome do avatar salvo no storage
var avatarName = '';

//Encriptografia
var key = 'bf3c199c2470cb477d907b1e0917c17b';
var cipher = aes256.createCipher(key);
//Ex:
//	cipher.encrypt("senha")
//	cipher.decrypt("senha");

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.json()) //habilita o uso de JSONS
server.use(express.urlencoded({ extended: true })); //habilita o uso do post dentro das rotas
server.use(express.static(path.join(__dirname + "/public"))); //habilita o uso de arquivos estaticos
server.set("views", path.join(__dirname + "/public/views")); //define a pasta de views
server.set("view engine","vash");

//#endregion

// -> SERVICE usado para salvar imagens na pasta do servidor
//#region SERVICE SAVE IMAGENS

const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, "public/avatar/");
	},
	filename: function(req, file, cb){
		avatarName = Date.now() + user.NickName + path.extname(file.originalname);
		cb(null, avatarName);
	}
})

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const aceito = ['image/jpg', 'image/jpeg', 'image/png'];
		cb(null, aceito.includes(file.mimetype));
	}
});

// #endregion

async function teste(avatar){
	var userData = avatar;

	//Assim irá funcionar passando UserId via JSON ou usando a interface
	//Via interface irá entrar e passar o UserId
	if(userData.UserId == undefined){
		userData.UserId = user.UserId
	}

	//verifica se o update ocorreu com sucesso!
	var updateUser = await userController.UpdateUserByInput(userData);

	if(updateUser){
		//console.log(user.UserId);
		//ATT CONSTANTE GLOBAL COM DADOS ATT
		user = await userController.GetUserById(user.UserId);
		return true;
		//deve redirecionar para página de informações do usuário
		//console.log("USUÁRIO ATUALIZADO");
	}
	else{
		return false;
	}
}

// ========================== ROTAS LOGIN ========================================================

//ROTA DE LOGIN DO USUÁRIO
server.get('/', (req, res) => {

	let test = 'TESTANDO'
	user = undefined; //Caso o user volte para tela de inicio a constante global é redefinida, ou seja, fecha e "sessão"
	res.render('login', {test, erroLogin: false});
});

//ROTA DE LOGIN DO USUÁRIO
server.post("/", async (req, res) => {

	var userData = {Email:req.body.logemail, Password: req.body.logpass}

	user = await userController.GetUserByEmailAndSenha(userData);

	if(user != undefined)
	{

		res.redirect("/home");
	}
	else
	{
		res.render("login", { erroLogin: true });
	}
});

server.get('/home', async (req, res) => {

	if(user != undefined)
	{
		var home = await homeController.GetInfosHome(user);

		res.render("home", { erroLogin: false, user, home});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

// ========================== ROTAS CRUD USUÁRIO ========================================================

//ROTA DE CADASTRO DO USUÁRIO
server.get("/signup", (req, res) => {
	res.render("signup");
});

//ROTA DE CADASTRO DO USUÁRIO
server.post("/signup",  async(req, res) => {

	var userData = req.body

	userData.Avatar = "avatar/default.png";
	//verifica se o insert ocorreu com sucesso!
	var insertUser = await userController.GenerateUser(userData);

	if(insertUser)
	{
		sendMailBemVindo.run(userData.NickName, userData.Email);
		res.redirect("/");
	}
	else
	{
		res.render("login", { erroLogin: true });
	}

});

//verifica usuários no banco , essa rota e para auxilio de testes
server.get("/usuarioList", async (req, res) => {

	var getUserList = await userController.GetUserList();

	res.send(getUserList);

});

server.get("/account", async (req, res) => {

	if(user != undefined)
	{
		var userData = await userController.GetUserById(user.UserId);

		userData.PassWord = cipher.decrypt(user.PassWord);

		res.render("account", {userData});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

server.post("/accountUP", async (req, res) => {

	var userData = req.body

	if(userData.UserId == undefined){
		userData = {
			UserId:user.UserId,
			NickName: req.body.NickName,
			Email: req.body.Email
		}
	}

	var updateUser = false;

	var userEmailExists = await userController.GetUserByEmail(userData.Email);

	if(userEmailExists == undefined)
	{
		updateUser = await userController.updateUserNickNameAndEmail(userData);
	}
	else {
		//atualiza só o nome
		updateUser = await userController.updateUserNickName(userData);
		console.log("JÁ EXISTE USUÁRIO COM ESTE EMAIL CADASTRADO");
	}

	if(updateUser)
	{
		//console.log(user.UserId);
		//ATT CONSTANTE GLOBAL COM DADOS ATT
		user = await userController.GetUserById(user.UserId);

		res.redirect('/account');
		//deve redirecionar para página de informações do usuário
		//console.log("USUÁRIO ATUALIZADO");
	}
	else
	{
		//deve redirecionar para página de informações do usuário com o alerta ERRO
		//console.log("ERRO NA ATUALIZAÇÃO");
	}

});

//ROTA DELETA O USUÁRIO
server.get("/deleteUser", async (req, res) => {

	if(user != undefined)
	{
		if(req.body.UserId != undefined)
		user = req.body

		//verifica se o delete ocorreu com sucesso!
		var deleteUser = await userController.DeleteUser(user.UserId);

		if(deleteUser)
		{
			//console.log("USUÁRIO DELETADO");
			res.redirect("/");
		}
		else
		{
			//deve redirecionar para página de informações do usuário com o alerta ERRO
			//console.log("ERRO AO DELETAR O USUÁRIO");
		}
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}
});

//ROTA ATUALIZA SENHA DO USUÁRIO
server.post("/changePassword", async (req, res) => {

	user = {userId: user.UserId, newPassword:req.body.Password };
	var userChangePassword = await userController.UpdatePassword(user);

	if(userChangePassword != undefined){

		sendMail.run(req.body.Password, userChangePassword.Email);
		res.redirect("/");

	}else{
		console.log("Falha ao atualizar a senha");
		//redefina para a pagina desejada
	}
});

//Alteração de avatar.
server.post("/alterAvatar", upload.single("image"), (req, res) => {

	var tipos = ['jpeg', 'jpg', 'png'];

	//avatarName definido na linha 52
	var avaName = {"Avatar": "avatar/" + avatarName};

	var userData = avaName;

	console.log(userData);

	if ((avatarName.includes(tipos[0])) || (avatarName.includes(tipos[1])) || (avatarName.includes(tipos[2]))){
		console.log("imagem valida");

		//chamar a funcao aqui
		let confirmacao = teste(userData);

		if (confirmacao){
			console.log(userData);
			res.redirect("/account");
		}
	} else {
		var userData = user;
		//userData.PassWord = cipher.decrypt(user.PassWord);
		userData.class = "alert alert-danger";
		userData.alert = "Apenas arquivos no formato JPG, JPEG ou PNG!"
		res.render("account", {userData});
	}

	res.redirect("/home");

	avatarName = ''
});

server.get("/reset-password", (req, res) => {
	res.render("reset-password");
});

server.post("/reset-password", async(req, res) => {

	var userExiste = await userRepository.getUserByEmail(req.body.Email);

	if(userExiste != undefined)
	{
		// gerando senha aleatória
		var min = Math.ceil(10000000);
		var max = Math.floor(99999999);
		var novaSenha = Math.floor(Math.random() * (max - min + 1)) + min;
		// fim da função

		var dados = {newPassword: novaSenha, userId: userExiste.UserId}

		var salvaSenha = await sendEmailController.SavePassword(dados);

		if(salvaSenha){

			var Novosdados = {newPassword: novaSenha, userId: userExiste.UserId}
			userController.UpdatePassword(Novosdados);

			sendMail.run(novaSenha, req.body.Email);
			res.redirect('/');
		}else{
			console.log("Erro ao salvar nova senha");
		}

	}
	else {
		console.log("Email não foi cadastrado por um usuário no sistema!");
	}
});
// ========================== ROTAS CRUD DE CATEGORIA =====================================================================

server.get('/categoria', (req, res) => {

	if(user != undefined)
	{
		res.render("categoria", { erroLogin: false, user });
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

server.get('/cadastraCategoria', async(req, res) => {

	if(user != undefined)
	{
		res.render("cadastraCategoria", {user, erroTEXT: 'undefined'});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

server.post("/categoriaCAD", async (req, res) => {


	var categoriaData = req.body;

	//Assim irá funcionar passando UserId via JSON ou usando a interface
	//Via interface irá entrar e passar o UserId
	if(categoriaData.UserId == undefined){
		categoriaData = {UserId: user.UserId, Categoria:req.body.Categoria}
	}

	//verifica se o insert ocorreu com sucesso!
	var insertCategoria = await categoriaController.GenerateCategoria(categoriaData); //cadastrando categoria

	if(insertCategoria)
	{
		res.redirect('/categorias');
		//deve redirecionar para página de categoria
		console.log("CATEGORIA CADASTRADA");
	}
	else
	{
		res.render("cadastraCategoria", {user, erroTEXT:'Erro no cadastro!'});
		//deve redirecionar para página de cadastro de categoria com alerta de erro
		console.log("CATEGORIA NÃO FOI CADASTRADA");
	}
});


server.get("/categorias", async (req, res) => {

	if(user != undefined)
	{
		var listaCategoria = await categoriaController.GetCategoriaList(user);

		// console.log(listaCategoria);

		res.render("categorias", {listaCategoria, user});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});


server.get("/categoriaDEL", async (req, res) => {

	if(user != undefined)
	{
		var categoriaData = req.query

		//Assim irá funcionar passando UserId via JSON ou usando a interface
		//Via interface irá entrar e passar o UserId
		if(categoriaData.UserId == undefined){
			categoriaData = {UserId: user.UserId, CategoriaId:req.query.CategoriaId}
		}

		//verifica se o update ocorreu com sucesso!
		var deleteCategoria = await categoriaController.DeleteCategoria(categoriaData);

		if(deleteCategoria)
		{
			res.redirect("/categorias")
		}
		else
		{
			//deve redirecionar para página de categoria com alerta de erro
			console.log("CATEGORIA NÃO FOI DELETADA");
		}

	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}
});


server.get("/atualizaCategoria", async(req, res) => {
	if(user != undefined)
	{
		var categoria = await categoriaController.GetCategoriaById(req.query.categoria);
		res.render("atualizaCategoria", {categoria, user});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

server.post("/categoriaUP", async (req, res) => {

	var categoriaData = req.body;
		categoriaData = {
			UserId: user.UserId,
			Categoria:req.body.Categoria,
			CategoriaId:req.query.categoria
		}

	//verifica se o insert ocorreu com sucesso!
	var insertCategoria = await categoriaController.UpdateCategoria(categoriaData); //cadastrando categoria

	if(insertCategoria)
	{
		res.redirect('/categorias');
		console.log("CATEGORIA ATUALIZADA");
	}
	else
	{
		//deve redirecionar para página de cadastro de categoria com alerta de erro
		console.log("CATEGORIA NÃO FOI ATUALIZADA");
	}


});

// ========================== ROTAS CRUD DE CARTÕES =====================================================================

//#region Cartão de Crédito

server.get('/cartaoCredito', async (req, res) => {

	if(user != undefined)
	{
		var listCartaoCredito = await cartaoCreditoController.GetCartaoCreditoByUserId(user.UserId);

		res.render("credito", { listCartaoCredito, user });

	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}
});

server.get("/ccredito", async (req, res) => {

	if(user != undefined)
	{

		var listCartaoCredito = await cartaoCreditoController.GetCartaoCreditoListByUserId(user.UserId);

		res.render("credito", { listCartaoCredito, user });
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

//VIEW PARA CADASTRAR CARTÃO DE CRÉDITO
server.get('/cadastraCartaoC', async(req, res) => {

	if(user != undefined)
	{
		res.render("cadastraCartaoC", {user});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}
});

//VIEW PARA CADASTRAR CARTÃO DE CRÉDITO
server.get('/atualizaCartaoC', async (req, res) => {

	if(user != undefined)
	{
		var cartaoCredito = await cartaoCreditoController.GetCartaoCreditoById(req.query.CartaoCreditoId);

		res.render("atualizaCartaoC", {cartaoCredito, user});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});


//#region Cartão de Débito

server.get('/cartaoDebito', (req, res) => {
	res.render("cartaoDebito", { erroLogin: false, user });
});

server.get("/cdebito", async (req, res) => {
	var listCartaoDebito = await cartaoDebitoController.GetCartaoDebitoListByUserId(user.UserId);
	res.render("debito", {listCartaoDebito, user});
});

server.get("/debitoCadastra", async (req, res) => {
	var listCartaoDebito = await cartaoDebitoController.GetCartaoDebitoListByUserId(user.UserId);

	res.render("debito", { listCartaoDebito, user });
});

//VIEW PARA CADASTRAR CARTÃO
server.get('/cadastraCartaoD', async(req, res) => {
	res.render("cadastraCartaoD", {user});
});

//VIEW PARA ATUALIZAR CARTÃO
server.get('/atuatizaCartaoD', async(req, res) => {
	var cartaoDebito = await cartaoDebitoController.GetCartaoDebitoById(req.query.CartaoDebito);
	res.render("atualizaCartaoD", {cartaoDebito, user});
});

//#endregion

//Lista Cartões Dependendo do Typo
server.get("/cartaoListByType", async (req, res) => {

	if(user != undefined)
	{
		var cartaoData = req.query

		if(cartaoData.UserId == undefined){
			cartaoData.UserId = user.UserId
		}

		var cartaoList = await cartaoController.getCartaoByType(cartaoData);

		res.send(cartaoList);

	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

//cadastra cartaão
server.post("/cartao", async (req, res) => {

	var type = req.query.Type;

	var cartaoData = req.body
	var Insertdados = {UserId: user.UserId, cartaoData, Type: type}
	var insertCartao = await cartaoController.InsertCartao(Insertdados);

	if(insertCartao && type == 'CC')
	{
		res.redirect('/ccredito');

	}else if (insertCartao && type == 'CD'){
		res.redirect('/cdebito');
	}
	else
	{
		console.log("Falha ao cadastrar o cartão");
		res.render("login", { erroLogin: true }); //manda para a tela que deseja
	}

});

//atualiza Cartão
server.post("/Updatecartao", async(req, res) => {

	// pega o id do cartão
	var cartaoDadosId = {NumCartao: req.body.numCartao, Type: req.query.Type}

	var cartaoId = await cartaoController.getCartaoByNum(cartaoDadosId);

	var cartao = {cartaoData: req.body, Type: req.query.Type, Id: cartaoId.CartaoId}

	var UpdateCartao = await cartaoController.UpdateCartao(cartao);

	if(UpdateCartao && cartao.Type == 'CC')
	{
		res.redirect('/ccredito');

	}else if (UpdateCartao &&  cartao.Type == 'CD'){
		res.redirect('/cdebito');
	}
	else
	{
		console.log("Falha ao Atualizar o cartão");
		res.render("login", { erroLogin: true }); //manda para a tela que deseja
	}

});

//deleta Cartão
server.get("/deleteCartao", async (req, res) => {

	if(user != undefined)
	{
		var cartao = req.query;
		var cartaoData = {numCartao: cartao.NumCartao, Type: cartao.Type}

		var deleteCartao = await cartaoController.DeleteCartao(cartaoData);

		if(deleteCartao && cartaoData.Type == 'CC')
		{
			//mostrar mensagem de sucesso
			res.redirect('/ccredito');
		}
		else if(deleteCartao && cartaoData.Type == 'CD')
		{
			//mostrar mensagem de sucesso
			res.redirect('/cdebito');

		}else if(!deleteCartao && cartaoData.Type == 'CC'){
			//mostrar mensagem de erro
			console.log("Falha ao deletar o cartão de crédito");
			res.redirect('/ccredito');
		}else{
			//mostrar mensagem de erro
			console.log("Falha ao deletar o cartão de Débito");
			res.redirect('/cdebito');
		}
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

// ========================== ROTAS CRUD DE RECEITAS =====================================================================

// server.get('/receita', (req, res) => {
// 	res.render("receita", { erroLogin: false, user });
// });

server.get("/receitas", async (req, res) => {

	if(user != undefined)
	{

		var listaReceita = await receitaController.GetReceitaList(user);
		var listaCategoria = await categoriaController.GetCategoriaList(user);

		res.render("receitas", {listaReceita, listaCategoria, user});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

//VIEW PARA CADASTRAR RECEITA
server.get('/receitaCAD', async(req, res) => {

	if(user != undefined)
	{
		var listaCategoria = await categoriaController.GetCategoriaList(user);

		// console.log(listaCategoria);

		res.render("cadastraReceita", {user, listaCategoria});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

server.post("/receitaCAD", async (req, res) => {


	var receitaData = req.body;

	//Assim irá funcionar passando UserId via JSON ou usando a interface
	//Via interface irá entrar e passar o UserId
	if(receitaData.UserId == undefined){
		receitaData = {
			UserId: user.UserId,
			Data: req.body.Data,
			FormaAlocacao: req.body.FormaAlocacao,
			CategoriaId: parseInt(req.body.CategoriaId),
			Valor: parseFloat(req.body.Valor),
			SeRepete: (req.body.SeRepete == 'on' ? true : false)
		}
	}

	console.log(req.body);

	//verifica se o insert ocorreu com sucesso!
	var insertReceita = await receitaController.GenerateReceita(receitaData); //cadastrando receita

	if(insertReceita)
	{

		res.redirect('/receitas');

		console.log("RECEITA CADASTRADA");
	}
	else
	{

		console.log("RECEITA NÃO FOI CADASTRADA");
	}

});

//VIEW PARA ATUALIZAR RECEITA
server.get('/receitaUP', async(req, res) => {

	if(user != undefined)
	{
		var receitaId = req.query.ReceitaId;

		var listaCategoria = await categoriaController.GetCategoriaList(user);

		var receita = await receitaController.GetReceitaById(receitaId)

		//console.log(receita);

		res.render("atualizaReceita", {user, listaCategoria, receita});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

server.post("/receitaUP", async (req, res) => {

	var receitaData = req.body;

	//Assim irá funcionar passando UserId via JSON ou usando a interface
	//Via interface irá entrar e passar o UserId
	if(receitaData.UserId == undefined){
		receitaData = {
			UserId: user.UserId,
			ReceitaId: parseInt(req.body.ReceitaId),
			Data: req.body.Data,
			FormaAlocacao: req.body.FormaAlocacao,
			CategoriaId: parseInt(req.body.CategoriaId),
			Valor: parseFloat(req.body.Valor),
			SeRepete: (req.body.SeRepete == 'on' ? true : false)
		}
	}

	console.log(receitaData);

	console.log("--");

	console.log(req.body);

	//verifica se o update ocorreu com sucesso!
	var updateReceita = await receitaController.UpdateReceita(receitaData);

	if(updateReceita)
	{
		res.redirect('/receitas');
		//deve redirecionar para página de categoria
		console.log("RECEITA ATUALIZADA");
	}
	else
	{
		//deve redirecionar para página de cadastro de categoria com alerta de erro
		console.log("RECEITA NÃO FOI ATUALIZADA");
	}
});

server.get("/receitaDEL", async (req, res) => {

	if(user != undefined)
	{
		var receitaData = req.query

		//Assim irá funcionar passando UserId via JSON ou usando a interface
		//Via interface irá entrar e passar o UserId
		if(receitaData.UserId == undefined){
			receitaData = {UserId: user.UserId, ReceitaId:parseInt(req.query.ReceitaId)}
		}

		//verifica se o delete ocorreu com sucesso!
		var deleteReceita = await receitaController.DeleteReceita(receitaData);

		if(deleteReceita)
		{
			//deve redirecionar para página de RECEITA
			console.log("RECEITA DELETADA");
			res.redirect("/receitas")
		}
		else
		{
			//deve redirecionar para página de RECEITA com alerta de erro
			console.log("RECEITA NÃO FOI DELETADA");
		}
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

// ========================== ROTAS CRUD DE DESPESAS =====================================================================

// server.get('/despesa', (req, res) => {
//
// 	res.render("despesa", { erroLogin: false, user });
// });

server.get("/despesas", async (req, res) => {

	if(user != undefined)
	{
		var listaDespesa = await despesaController.GetDespesaList(user);

		var listaCategoria = await categoriaController.GetCategoriaList(user);

		res.render("despesas", {user, listaDespesa, listaCategoria});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

//VIEW PARA CADASTRAR DESPESA
server.get('/despesaCAD', async (req, res) => {

	if(user != undefined)
	{
		var listaCategoria = await categoriaController.GetCategoriaList(user);

		var listaCC = await cartaoCreditoController.GetCartaoCreditoListByUserId(user.UserId);

		var listaCD = await cartaoDebitoController.GetCartaoDebitoListByUserId(user.UserId);

		res.render("cadastraDespesa", { user, listaCategoria, listaCC, listaCD });

	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

server.post("/despesaCAD", async (req, res) => {

	var despesaData = req.body;

	// console.log(despesaData);

	//Assim irá funcionar passando UserId via JSON ou usando a interface
	//Via interface irá entrar e passar o UserId
	if(despesaData.UserId == undefined){
		despesaData = {
			UserId: user.UserId,
			CategoriaId: parseInt(req.body.CategoriaId),
			Data: req.body.Data,
			Valor: parseFloat(req.body.Valor),
			FormaPagamento: parseInt(req.body.FormaPagamento),
			Status: (req.body.Status == 'true' ? true : false),
			NumParcelas: ( req.body.NumParcelas != undefined ? parseInt(req.body.NumParcelas) : undefined),
			NumCC: ( req.body.NumCC != undefined ? parseInt(req.body.NumCC) : undefined),
			NumCD: ( req.body.NumCD != undefined ? parseInt(req.body.NumCD) : undefined),
			Descricao: req.body.Descricao
		}
	}

	//verifica se o insert ocorreu com sucesso!
	var insertDespesa = await despesaController.GenerateDespesa(despesaData); //cadastrando despesa

	if(insertDespesa)
	{
		res.redirect('/despesas');

		console.log("DESPESA CADASTRADA");
	}
	else
	{
		console.log("DESPESA NÃO FOI CADASTRADA");
	}

});

//VIEW PARA ATUALIZAR DESPESA
server.get('/despesaUP', async(req, res) => {

	if(user != undefined)
	{
		var despesaId = req.query.DespesaId;

		// console.log(despesaId);

		var listaCategoria = await categoriaController.GetCategoriaList(user);

		var despesa = await despesaController.GetDespesaById(despesaId);

		var listaCC = await cartaoCreditoController.GetCartaoCreditoListByUserId(user.UserId);

		var listaCD = await cartaoDebitoController.GetCartaoDebitoListByUserId(user.UserId);

	 // console.log(listaCD);

		res.render("atualizaDespesa", {user, listaCategoria, despesa, listaCC, listaCD});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}
});

server.post("/despesaUP", async (req, res) => {

	var despesaData = req.body;

	//Assim irá funcionar passando UserId via JSON ou usando a interface
	//Via interface irá entrar e passar o UserId
	if(despesaData.UserId == undefined){
		despesaData = {
			UserId: user.UserId,
			DespesaId:  parseInt(req.body.DespesaId),
			CategoriaId: parseInt(req.body.CategoriaId),
			Data: req.body.Data,
			Valor: parseFloat(req.body.Valor),
			FormaPagamento: parseInt(req.body.FormaPagamento),
			Status: (req.body.Status == 'true' ? true : false),
			NumParcelas: ( req.body.NumParcelas != undefined ? parseInt(req.body.NumParcelas) : undefined),
			NumCC: ( req.body.NumCC != undefined ? parseInt(req.body.NumCC) : undefined),
			NumCD: ( req.body.NumCD != undefined ? parseInt(req.body.NumCD) : undefined),
			Descricao: req.body.Descricao
		}
	}

	//console.log(despesaData);

	var updateDespesa = await despesaController.UpdateDespesa(despesaData);

	if(updateDespesa)
	{
		res.redirect('/despesas');
		console.log("DESPESA ATUALIZADA");
	}
	else
	{
		console.log("DESPESA NÃO FOI ATUALIZADA");
	}
});

server.get("/despesaDEL", async (req, res) => {

	if(user != undefined)
	{
		var despesaData = req.query

		//Assim irá funcionar passando UserId via JSON ou usando a interface
		//Via interface irá entrar e passar o UserId
		if(despesaData.UserId == undefined){
			despesaData = {UserId: user.UserId, DespesaId:parseInt(req.query.DespesaId)}
		}

		//verifica se o delete ocorreu com sucesso!
		var deleteDespesa = await despesaController.DeleteDespesa(despesaData);

		if(deleteDespesa)
		{
			console.log("DESPESA DELETADA");
			res.redirect("/despesas")
		}
		else
		{
			console.log("DESPESA NÃO FOI DELETADA");
		}
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}
});


server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
