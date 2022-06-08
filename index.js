//Aplication IMPORTS
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import aes256 from "aes256";

//Variavel global responsável pela seção do usuário
var user = undefined;

//Encriptografia
var key = 'bf3c199c2470cb477d907b1e0917c17b';
var cipher = aes256.createCipher(key);
//Ex:
	//	cipher.encrypt("senha")
	//	cipher.decrypt("senha");

//Repository IMPORTS - SERA REMOVIDO AO IMPLEMENTAR OS CONTROLLERS
import { database } from "./repository/db.js";
import { receitaRepository } from "./repository/ReceitaRepository.js";
import { cartaoDebitoRepository } from "./repository/CartaoDebitoRepository.js";
import { cartaoCreditoRepository } from "./repository/CartaoCreditoRepository.js";

//Controlers IMPORTS
import { userController } from "./controllers/UserController.js";
import { categoriaController } from "./controllers/CategoriaController.js";
import { cartaoController} from "./controllers/CartaoController.js"

//Services IMPORTS
import { sendMail, sendMailBemVindo } from "./microservice/Email/sendEmail.js";
import { cartaoCreditoController } from "./controllers/CartaoCreditoController.js";

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.json())
server.use(express.urlencoded({ extended: true })); //habilita o uso do post dentro das rotas
server.use(express.static(path.join(__dirname + "/public"))); //habilita o uso de arquivos estaticos
server.set("views", path.join(__dirname + "/public/views")); //define a pasta de views
server.set("view engine","vash");

//Para testes e n ter que ficar logando no sistema direto essas rotas mandam direto para TELAS OBJETIVAS

server.get('/home', (req, res) => {

	res.render("home", { erroLogin: false });
});

server.get('/receita', (req, res) => {

	res.render("receita", { erroLogin: false });
});

server.get('/despesa', (req, res) => {

	res.render("despesa", { erroLogin: false });
});

server.get('/cartaoCredito', async (req, res) => {

	var listCartaoCredito = await cartaoCreditoController.GetCartaoCreditoByUserId(user.UserId);

	res.render("credito", { listCartaoCredito });

});


server.get('/cartaoDebito', (req, res) => {

	res.render("cartaoDebito", { erroLogin: false });
});

server.get('/categoria', (req, res) => {

	res.render("categoria", { erroLogin: false });
});

server.get('/forms', (req, res) => {

	res.render("forms", { erroLogin: false });
});

server.get('/tables', (req, res) => {

	res.render("tables", { erroLogin: false });
});

// ========================== ÁREA DE LOGIN E CRUD USUÁRIO ========================================================

//ROTA DE LOGIN DO USUÁRIO
server.get('/', (req, res) => {

	let test = 'TESTANDO'
	user = undefined; //Caso o user volte para tela de inicio a constante global é redefinida, ou seja, fecha e "sessão"
	res.render('login', {test, erroLogin: false});
});

//ROTA DE LOGIN DO USUÁRIO
server.post("/", async (req, res) => {

	//verificar se o usuario é válido
	var userData = {Email:req.body.logemail, Password: req.body.logpass}

  user = await userController.GetUserByEmailAndSenha(userData);

	//console.log(user);

	if(user != undefined)
	{
		res.render("home", { erroLogin: false });
	}
	else
	{
		res.render("login", { erroLogin: true });
	}
});

//ROTA DE CADASTRO DO USUÁRIO
server.get("/signup", (req, res) => {
	res.render("signup");
});

server.get("/categorias", (req, res) => {
	res.render("categorias");
});

server.get("/receitas", (req, res) => {
	res.render("receitas");
});

server.get("/despesas", (req, res) => {
	res.render("despesas");
});

server.get("/cdebito", (req, res) => {
	var listCartaoDebito = await cartaoDebitoController.GetCartaoDebitoByUserId(user.UserId);
	res.render("debito", {listCartaoDebito});
});

server.get("/ccredito", async (req, res) => {
	var listCartaoCredito = await cartaoCreditoController.GetCartaoCreditoListByUserId(user.UserId);

	res.render("credito", { listCartaoCredito });
});

server.get("/debitoCadastra", async (req, res) => {
	var listCartaoCredito = await cartaoCreditoController.GetCartaoCreditoListByUserId(user.UserId);

	res.render("credito", { listCartaoCredito });
});

//ROTA DE CADASTRO DO USUÁRIO
server.post("/signup",  async(req, res) => {

	var userData = req.body

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

server.get("/reset-password", (req, res) => {
	res.render("reset-password");
});

server.post("/reset-password", async(req, res) => {
	//console.log(req.body);

	var userExiste = await userRepository.GetUserByEmail(req.body.Email);

	if(userExiste != undefined)
	{
		sendMail.run(cipher.decrypt(userLista.PassWord), req.body.Email);
	}
	else {
		console.log("Email não foi cadastrado por um usuário no sistema!");
	}
});


//verifica usuários no banco , essa rota e para auxilio de testes
server.get("/usuarioList", async (req, res) => {

	var getUserList = await userController.GetUserList();

	res.send(getUserList);

});

server.get("/account", async (req, res) => {

		var userData = await userController.GetUserById(user.UserId);

		userData.PassWord = cipher.decrypt(user.PassWord);

		res.render("account", {userData});

});


//ATT INFOS DO USER 
server.post("/account", async (req, res) => {

		var userData = req.body

		//Assim irá funcionar passando UserId via JSON ou usando a interface
		//Via interface irá entrar e passar o UserId
		if(userData.UserId == undefined){
			userData.UserId = user.UserId
		}

		//verifica se o update ocorreu com sucesso!
		var updateUser = await userController.UpdateUserByInput(userData);

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

});

//ROTA ATUALIZA SENHA DO USUÁRIO
server.post("/changePassword", async (req, res) => {

	//verifiacar se as duas senhas informadas pelo o usuário são iguais e válidas

	//Esse if serve para caso for usar JSON
	if(req.body.UserId != undefined)
	{
		user = {UserId: req.body.UserId, Password:cipher.encrypt(req.body.Password) };
	}
	else
	{
		user = {UserId: user.UserId, Password:cipher.encrypt(req.body.Password) };
	}

	//Caso não tenha o UserId, usar o da variável global
	var userChangePassword = await userController.UpdatePassword(user);

	//console.log(userChangePassword);

	if(userChangePassword != undefined){

		sendMail.run(userChangePassword.NickName, userChangePassword.Email);
		res.redirect("/");

		//redefina para a pagina desejada
	}else{
		console.log("Falha ao atualizar a senha");
		//redefina para a pagina desejada
	}
});



//ROTA DE CADASTRO DO USUÁRIO
server.post("/signup",  async(req, res) => {

	var userData = req.body

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

// ========================== CRUD DE CATEGORIA =====================================================================





// ========================== CRUD DE CARTÕES =====================================================================

server.get("/cartaoListByType", async (req, res) => {

	var cartaoData = req.query

	if(cartaoData.UserId == undefined){
		cartaoData.UserId = user.UserId
	}

	var cartaoList = await cartaoController.getCartaoByType(cartaoData);

	res.send(cartaoList);

});

//cadastra cartaão
server.post("/cartao", async (req, res) => {

	var cartaoData = req.body

	if(cartaoData.UserId == undefined){
		cartaoData.UserId = user.UserId
	}

	//verifica se o insert ocorreu com sucesso!
	var insertCartao = await cartaoController.InsertCartao(cartaoData);

	if(insertCartao)
	{
		console.log("cartão salvo com sucesso");
		res.redirect("/"); //mandar para a tela que deseja
	}
	else
	{
		console.log("Falha ao cadastrar o cartão");
		res.render("login", { erroLogin: true });//manda para a tela que deseja
	}

});



server.put("/cartao", async (req, res) => {



});

server.delete("/cartao", async (req, res) => {


});

// ========================== CRUD DE RECEITAS =====================================================================

server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});


// ROTAS FUTURAS AO USAR AJAX - PI 4

//USER

// //ROTA ATUALIZA O USUÁRIO
// server.put("/usuario", async (req, res) => {
//
// 	var userData = req.body
//
// 	//Assim irá funcionar passando UserId via JSON ou usando a interface
// 	//Via interface irá entrar e passar o UserId
// 	if(userData.UserId == undefined){
// 		userData.UserId = user.UserId
// 	}
//
// 	//verifica se o update ocorreu com sucesso!
// 	var updateUser = await userController.UpdateUser(userData);
//
// 	if(updateUser)
// 	{
// 		//deve redirecionar para página de informações do usuário
// 		//console.log("USUÁRIO ATUALIZADO");
// 	}
// 	else
// 	{
// 		//deve redirecionar para página de informações do usuário com o alerta ERRO
// 		//console.log("ERRO NA ATUALIZAÇÃO");
// 	}
//
// });
//
// //ROTA DELETA O USUÁRIO
// server.delete("/usuario", async (req, res) => {
//
// 	console.log("ENTROU NA ROTA");
//
// 	if(req.body.UserId != undefined)
// 		user = req.body
//
// 	//verifica se o delete ocorreu com sucesso!
// 	var deleteUser = await userController.DeleteUser(user.UserId);
//
// 	if(deleteUser)
// 	{
// 		//console.log("USUÁRIO DELETADO");
// 		res.redirect("/");
// 	}
// 	else
// 	{
// 		//deve redirecionar para página de informações do usuário com o alerta ERRO
// 		//console.log("ERRO AO DELETAR O USUÁRIO");
// 	}
//
// });

//RECEITA

// //lista de receitas
// server.get("/receitaList", async (req, res) => {
//
// 	//Assim irá funcionar passando UserId via JSON ou usando a interface
// 	//Via interface irá entrar e passar o UserId
// 	if(req.query.UserId != undefined){
// 		user.UserId = req.query.UserId;
// 	}
//
// 	var receitaList = await receitaRepository.getReceitaList(user.UserId);
// 	res.send(receitaList)
//
// });
//
// //cadastro da receita
// server.post("/receita", async (req, res) => {
//
// 	var receitaData = req.body
//
// 	//Assim irá funcionar passando UserId via JSON ou usando a interface
// 	//Via interface irá entrar e passar o UserId
// 	if(receitaData.UserId == undefined){
// 		receitaData.UserId = user.UserId;
// 	}
//
// 	//verifica se o insert ocorreu com sucesso!
// 	var insertReceita;
//
// 	insertReceita = await receitaRepository.insertReceita(receitaData); //cadastrando receita
//
// 	if(insertReceita)
// 	{
// 		//deve redirecionar para página de receita
// 		console.log("RECEITA CADASTRADA");
// 	}
// 	else
// 	{
// 		//deve redirecionar para página de cadastro de receita com alerta de erro
// 		console.log("RECEITA NÃO FOI CADASTRADA");
// 	}
//
// });
//
// //atualiza receita
// server.put("/receita", async (req, res) => {
//
// 	var receitaData = req.body
//
// 	//Assim irá funcionar passando UserId via JSON ou usando a interface
// 	//Via interface irá entrar e passar o UserId
// 	if(receitaData.UserId == undefined){
// 		receitaData.UserId = user.UserId;
// 	}
//
// 	//verifica se o update ocorreu com sucesso!
// 	var updateReceita;
//
// 	updateReceita = await receitaRepository.updateReceita(receitaData);
//
// 	if(updateReceita)
// 	{
// 		//deve redirecionar para página de receita
// 		console.log("RECEITA ATUALIZADA");
// 	}
// 	else
// 	{
// 		//deve redirecionar para página de atualização de receita com alerta de erro
// 		console.log("RECEITA NÃO FOI ATUALIZADA");
// 	}
//
// });
//
// //deleta categoria
// server.delete("/receita", async (req, res) => {
//
// 	var receitaData = req.body
//
// 	//Descomentar quando tiver o front funcionando para o usuário logar
// 	//Assim irá funcionar passando UserId via JSON ou usando a interface
// 	//Via interface irá entrar e passar o UserId
// 	if(receitaData.UserId == undefined){
// 		receitaData.UserId = user.UserId;
// 	}
//
// 	//verifica se o update ocorreu com sucesso!
// 	var deleteReceita;
//
// 	deleteReceita = await receitaRepository.deleteReceita(receitaData);
//
// 	if(deleteReceita)
// 	{
// 		//deve redirecionar para página de receita
// 		console.log("RECEITA DELETADA");
// 	}
// 	else
// 	{
// 		//deve redirecionar para página de receita com alerta de erro
// 		console.log("RECEITA NÃO FOI DELETADA");
// 	}
//
// });

//CATEGORIA

// //lista de categoria
// server.get("/categoriaList", async (req, res) => {
//
// 	//Assim irá funcionar passando UserId via JSON ou usando a interface
// 	//Via interface irá entrar e passar o UserId
// 	if(req.query.UserId != undefined){
// 		 user = {UserId:req.query.UserId}
// 	}
//
// 	var categoriaList = await categoriaController.GetCategoriaList(user);
//
// 	res.send(categoriaList)
//
// });
//
// //cadastro da categoria
// server.post("/categoria", async (req, res) => {
//
// 	var categoriaData = req.body
//
// 	//Assim irá funcionar passando UserId via JSON ou usando a interface
// 	//Via interface irá entrar e passar o UserId
// 	if(categoriaData.UserId == undefined){
// 		categoriaData.UserId = user.UserId
// 	}
//
// 	//verifica se o insert ocorreu com sucesso!
// 	var insertCategoria = await categoriaController.GenerateCategoria(categoriaData); //cadastrando categoria
//
// 	if(insertCategoria)
// 	{
// 		//deve redirecionar para página de categoria
// 		console.log("CATEGORIA CADASTRADA");
// 	}
// 	else
// 	{
// 		//deve redirecionar para página de cadastro de categoria com alerta de erro
// 		console.log("CATEGORIA NÃO FOI CADASTRADA");
// 	}
//
// });
//
// //atualiza categoria
// server.put("/categoria", async (req, res) => {
//
// 	var categoriaData = req.body
//
// 	//Assim irá funcionar passando UserId via JSON ou usando a interface
// 	//Via interface irá entrar e passar o UserId
// 	if(categoriaData.UserId == undefined){
// 		categoriaData.UserId = user.UserId
// 	}
//
// 	//verifica se o update ocorreu com sucesso!
// 	var updateCategoria = await categoriaController.UpdateCategoria(categoriaData);
//
// 	if(updateCategoria)
// 	{
// 		//deve redirecionar para página de categoria
// 		console.log("CATEGORIA ATUALIZADA");
// 	}
// 	else
// 	{
// 		//deve redirecionar para página de atualização de categoria com alerta de erro
// 		console.log("CATEGORIA NÃO FOI ATUALIZADA");
// 	}
//
// });
//
// //deleta categoria
// server.delete("/categoria", async (req, res) => {
//
// 	var categoriaData = req.body
//
// 	//Assim irá funcionar passando UserId via JSON ou usando a interface
// 	//Via interface irá entrar e passar o UserId
// 	if(categoriaData.UserId == undefined){
// 		categoriaData.UserId = user.UserId
// 	}
//
// 	//verifica se o update ocorreu com sucesso!
// 	var deleteCategoria = await categoriaController.DeleteCategoria(categoriaData);
//
// 	if(deleteCategoria)
// 	{
// 		//deve redirecionar para página de categoria
// 		console.log("CATEGORIA DELETADA");
// 	}
// 	else
// 	{
// 		//deve redirecionar para página de categoria com alerta de erro
// 		console.log("CATEGORIA NÃO FOI DELETADA");
// 	}
//
// });
