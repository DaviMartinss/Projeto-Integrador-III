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

//Repository IMPORTS
import { database } from "./repository/db.js";
import { userRepository } from "./repository/UserRepository.js";
import { receitaRepository } from "./repository/ReceitaRepository.js";
import { categoriaRepository } from "./repository/CategoriaRepository.js";
import { cartaoDebitoRepository } from "./repository/CartaoDebitoRepository.js";
import { cartaoCreditoRepository } from "./repository/CartaoCreditoRepository.js";

//Services IMPORTS
import { sendMail, sendMailBemVindo } from "./microservice/Email/sendEmail.js";


const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



server.use(express.json())
server.use(express.urlencoded({ extended: true })); //habilita o uso do post dentro das rotas
server.use(express.static(path.join(__dirname + "/public"))); //habilita o uso de arquivos estaticos
server.set("views", path.join(__dirname + "/public/views")); //define a pasta de views
server.set("view engine","vash");


//Para testes e n ter que ficar logando no sistema direto essa rota manda direto para TELAS OBJETIVAS

server.get('/home', (req, res) => {

	res.render("home", { erroLogin: false });
});

server.get('/receita', (req, res) => {

	res.render("receita", { erroLogin: false });
});

server.get('/despesa', (req, res) => {

	res.render("despesa", { erroLogin: false });
});

server.get('/cartaoCredito', (req, res) => {

	res.render("cartaoCredito", { erroLogin: false });
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

server.get('/', (req, res) => {

	let test = 'TESTANDO'
	user = undefined;
	res.render('login', {test, erroLogin: false});
});

server.post("/", async (req, res) => {

	console.log(req.body);

	//verificar se o usuario é válido
	var userData = {Email:req.body.logemail, Password: cipher.encrypt(req.body.logpass)}

	//pega a lista de usuario para verificar email e senha validos
	//isso devido a criptografia ser gerada para senha é sempre diferente
	var getUserList = await userRepository.getUserList();

	getUserList.forEach( userLista => {

<<<<<<< Updated upstream
		if(userData.Email == userLista.Email && cipher.decrypt(userData.Password) == cipher.decrypt(userLista.PassWord))
			user = userLista;
=======
		if(userData.Email == user.Email && cipher.decrypt(userData.Password) == cipher.decrypt(user.PassWord))
			user = user;
			console.log("ACEITO ! ! !");
>>>>>>> Stashed changes

	});

	console.log(userData);

	console.log("valor de user", user);

	if(user != undefined)
	{
		res.render("index", { erroLogin: false });
	}
	else
	{
		res.render("login", { erroLogin: true });
	}
});

server.get("/signup", (req, res) => {
	res.render("signup");
});

server.get("/login", (req, res) => {
	res.render("/");
});

//verifica usuários no banco , essa rota e para auxilio de testes
server.get("/usuarioList", async (req, res) => {

	var getUserList = await userRepository.getUserList();

	res.send(getUserList);

});

//cadastra usuário
server.post("/usuario", async (req, res) => {

	//verificar se o email já foi cadastrado
	var userExiste = await userRepository.getUserByEmail(req.body.Email);

	//verifica se o insert ocorreu com sucesso!
	var insertUser;

	if(userExiste == ''){

		var userData = req.body

		userData.Password = cipher.encrypt(userData.Password); //criptografia aes256

		insertUser = await userRepository.insertUser(userData);

		if(insertUser)
		{
			sendMailBemVindo.run(userData.NickName, userData.Email);
			res.redirect("/");
		}
		else
		{
			console.log("ERRO NO CADASTRO DO USUÁRIO");
			res.render("login", { erroLogin: true });
		}

	}else{
		console.log("Email já foi cadastrado por outro usuário!");
	}
});

//atualiza usuário
server.put("/usuario", async (req, res) => {

	var userData = req.body

	//Descomentar quando tiver o front funcionando para o usuário logar
	//userData.UserId = user.UserId

	userData.Password = cipher.encrypt(userData.Password); //criptografia md5

	//verifica se o update ocorreu com sucesso!
	var updateUser;

	updateUser = await userRepository.updateUser(userData);

	if(updateUser)
	{
		//deve redirecionar para página de informações do usuário
		console.log("USUÁRIO ATUALIZADO");
	}
	else
	{
		//deve redirecionar para página de informações do usuário com o alerta ERRO
		console.log("ERRO NA ATUALIZAÇÃO");
	}

});

//deleta usuário
server.delete("/usuario", async (req, res) => {

	//Comentar esse código abaixo quando front tiver funcional
	user = req.body.UserId;

	//verifica se o delete ocorreu com sucesso!
	var deleteUser;

	//deletamos o usuário pelo o id
	deleteUser = await userRepository.deleteUser(user);

	if(deleteUser)
	{
		console.log("USUÁRIO DELETADO");
		res.redirect("/");
	}
	else
	{
		//deve redirecionar para página de informações do usuário com o alerta ERRO
		console.log("ERRO AO DELETAR O USUÁRIO");
	}

});

server.post("/changePassword", async (req, res) => {

	//verifiacar se as duas senhas informadas pelo o usuário são iguais e válidas

	req.body.Password = cipher.encrypt(req.body.Password); //criptografia aes256

	//Caso não tenha o UserId, usar o da variável global
	userChangePassword = await userRepository.updatePassword(req.body);

	if(userChangePassword){
		console.log("Usuário deletado com sucesso");

		//pegar os dados do usuário logado pelo o Id
		user = await userRepository.getUserById(userId);

		sendMail.run(req.body.NickName, user.Email);
		res.redirect("/");

		//redefina para a pagina desejada
	}else{
		console.log("Falha ao atualizar a senha");
		//redefina para a pagina desejada
	}
});

// ========================== CRUD DE CATEGORIA =====================================================================

//lista de categoria
server.get("/categoriaList", async (req, res) => {

	var categoriaList = await categoriaRepository.getCategoriaList(req.query.UserId);

	res.send(categoriaList)

});

//cadastro da categoria
server.post("/categoria", async (req, res) => {

	var categoriaData = req.body

	//Descomentar quando tiver o front funcionando para o usuário logar
	//categoriaData.UserId = user.UserId

	//verifica se o insert ocorreu com sucesso!
	var insertCategoria;

	insertCategoria = await categoriaRepository.insertCategoria(categoriaData); //cadastrando categoria

	if(insertCategoria)
	{
		//deve redirecionar para página de categoria
		console.log("CATEGORIA CADASTRADA");
	}
	else
	{
		//deve redirecionar para página de cadastro de categoria com alerta de erro
		console.log("CATEGORIA NÃO FOI CADASTRADA");
	}

});

//atualiza categoria
server.put("/categoria", async (req, res) => {

	var categoriaData = req.body

	//Descomentar quando tiver o front funcionando para o usuário logar
	//categoriaData.UserId = user.UserId

	//verifica se o update ocorreu com sucesso!
	var updateCategoria;

	updateCategoria = await categoriaRepository.updateCategoria(categoriaData);

	if(updateCategoria)
	{
		//deve redirecionar para página de categoria
		console.log("CATEGORIA ATUALIZADA");
	}
	else
	{
		//deve redirecionar para página de atualização de categoria com alerta de erro
		console.log("CATEGORIA NÃO FOI ATUALIZADA");
	}

});

//deleta categoria
server.delete("/categoria", async (req, res) => {

	var categoriaData = req.body

	//Descomentar quando tiver o front funcionando para o usuário logar
	//categoriaData.UserId = user.UserId

	//verifica se o update ocorreu com sucesso!
	var deleteCategoria;

	deleteCategoria = await categoriaRepository.deleteCategoria(categoriaData);

	if(deleteCategoria)
	{
		//deve redirecionar para página de categoria
		console.log("CATEGORIA DELETADA");
	}
	else
	{
		//deve redirecionar para página de categoria com alerta de erro
		console.log("CATEGORIA NÃO FOI DELETADA");
	}

});

// ========================== CRUD DE CARTÕES =====================================================================

server.get("/cartaoList", async (req, res) => {

	//Pega o tipo de cartões que será trazido como LISTA
	let type = req.query.Type;
	let user = req.query.UserId;

	//Tipo Lista para pegar todos os Cartões do Banco
	var selectCartao;

	if(type == "CC")
	{
		selectCartao = await cartaoCreditoRepository.getCartaoList(user);
	}
	else
	{
		selectCartao = await cartaoDebitoRepository.getCartaoList(user);
	}

	//ENVIA A LISTA DE VOLTA PARA PÁGINA
	res.send(selectCartao);

});


server.post("/cartao", async (req, res) => {

	/* TYPE do cartão referente o tipo se CartãoCrédito ou CartãoDébito
		 type = "CC" , cartaoCredito
		 type = "CD" , cartaoDebito
	*/

	//Tipo booleano para saber se o insert teve sucesso
	var insertCartao = false;

	//Recebe os dados do cartão de crédito
	var cartaoData = req.body

	if(cartaoData.Type == "CC")
	{
		//INSERT Cartão de Crédito
		insertCartao = await cartaoCreditoRepository.insertCartao(cartaoData);

		if(insertCartao)
		{
			//redenrizar TELA DE CARTAO DE CREDITO
			console.log("CADASTROU");
		}else
		{
			//redenrizar TELA DE CADASTRO DE CARTAO CREDITO COM ALERTA DE ERRO
			console.log("ERRO NO CADASTRO");
		}

	}else
	{
		//INSERT Cartão de Débito
		insertCartao = await cartaoDebitoRepository.insertCartao(cartaoData);

		if(insertCartao)
		{
			//redenrizar TELA DE CARTAO DE DEBITO
			console.log("CADASTROU");
		}else
		{
			//redenrizar TELA DE CADASTRO DE CARTAO DEBITO COM ALERTA DE ERRO
			console.log("ERRO NO CADASTRO");
		}
	}
});

server.put("/cartao", async (req, res) => {

	/* TYPE do cartão referente o tipo se CartãoCrédito ou CartãoDébito
		 type = "CC" , cartaoCredito
		 type = "CD" , cartaoDebito
	*/

	//Tipo booleano para saber se o UPDATE teve sucesso
	var updateCartao = false;

	//Recebe os dados do cartão de crédito
	var cartaoData = req.body

	if(cartaoData.Type == "CC")
	{
		//UPDATE Cartão de Crédito
		updateCartao = await cartaoCreditoRepository.updateCartao(cartaoData);

		if(updateCartao)
		{
			//redenrizar TELA DE CARTAO DE CREDITO
			console.log("ATUALIZOU");
		}else
		{
			//redenrizar TELA DE UPDATE DE CARTAO CREDITO COM ALERTA DE ERRO
			console.log("ERRO NA ATUALIZAÇÃO");
		}

	}else
	{
		//UPDATE Cartão de Débito
		updateCartao = await cartaoDebitoRepository.updateCartao(cartaoData);

		if(updateCartao)
		{
			//redenrizar TELA DE CARTAO DE DEBITO
			console.log("ATUALIZOU");
		}else
		{
			//redenrizar TELA DE UPDATE DE CARTAO DEBITO COM ALERTA DE ERRO
			console.log("ERRO NA ATUALIZAÇÃO");
		}
	}


});

server.delete("/cartao", async (req, res) => {

	/* TYPE do cartão referente o tipo se CartãoCrédito ou CartãoDébito
		 type = "CC" , cartaoCredito
		 type = "CD" , cartaoDebito
	*/

	//Tipo booleano para saber se o DELETE teve sucesso
	var deleteCartao = false;

	//Recebe os dados do cartão de crédito
	var cartaoData = req.body

	if(cartaoData.Type == "CC")
	{
		//DELETE Cartão de Crédito
		deleteCartao = await cartaoCreditoRepository.deleteCartao(cartaoData);

		if(deleteCartao)
		{
			//redenrizar TELA DE CARTAO DE CREDITO
			console.log("APAGOU CARTAO");
		}else
		{
			//redenrizar TELA DE CARTAO CREDITO COM ALERTA DE ERRO
			console.log("ERRO AO APAGAR CARTAO");
		}

	}else
	{
		//DELETE Cartão de Débito
		deleteCartao = await cartaoDebitoRepository.deleteCartao(cartaoData);

		if(deleteCartao)
		{
			//redenrizar TELA DE CARTAO DE DEBITO
			console.log("APAGOU CARTAO");
		}else
		{
			//redenrizar TELA DE CARTAO DEBITO COM ALERTA DE ERRO
			console.log("ERRO AO APAGAR CARTAO");
		}
	}
});

// ========================== CRUD DE RECEITAS =====================================================================

//lista de receitas
server.get("/receitaList", async (req, res) => {

	//Descomentar quando tiver o front funcionando para o usuário logar
	//receitaData.UserId = user.UserId

	var receitaList = await receitaRepository.getReceitaList(req.query.UserId);
	res.send(receitaList)

});

//cadastro da receita
server.post("/receita", async (req, res) => {

	var receitaData = req.body

	//Descomentar quando tiver o front funcionando para o usuário logar
	//receitaData.UserId = user.UserId

	//verifica se o insert ocorreu com sucesso!
	var insertReceita;

	insertReceita = await receitaRepository.insertReceita(receitaData); //cadastrando receita

	if(insertReceita)
	{
		//deve redirecionar para página de receita
		console.log("RECEITA CADASTRADA");
	}
	else
	{
		//deve redirecionar para página de cadastro de receita com alerta de erro
		console.log("RECEITA NÃO FOI CADASTRADA");
	}

});

//atualiza receita
server.put("/receita", async (req, res) => {

	var receitaData = req.body

	//Descomentar quando tiver o front funcionando para o usuário logar
	//receitaData.UserId = user.UserId

	//verifica se o update ocorreu com sucesso!
	var updateReceita;

	updateReceita = await receitaRepository.updateReceita(receitaData);

	if(updateReceita)
	{
		//deve redirecionar para página de receita
		console.log("RECEITA ATUALIZADA");
	}
	else
	{
		//deve redirecionar para página de atualização de receita com alerta de erro
		console.log("RECEITA NÃO FOI ATUALIZADA");
	}

});

//deleta categoria
server.delete("/receita", async (req, res) => {

	var receitaData = req.body

	//Descomentar quando tiver o front funcionando para o usuário logar
	//categoriaData.UserId = user.UserId

	//verifica se o update ocorreu com sucesso!
	var deleteReceita;

	deleteReceita = await receitaRepository.deleteReceita(receitaData);

	if(deleteReceita)
	{
		//deve redirecionar para página de receita
		console.log("RECEITA DELETADA");
	}
	else
	{
		//deve redirecionar para página de receita com alerta de erro
		console.log("RECEITA NÃO FOI DELETADA");
	}

});




















server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
