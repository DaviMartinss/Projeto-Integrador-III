//Aplication IMPORTS
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import aes256 from "aes256";

//Encriptografia
var key = 'bf3c199c2470cb477d907b1e0917c17b';
var cipher = aes256.createCipher(key);
//Ex:
	//	cipher.encrypt(req.body.logpass)
	//	var decryptedSenha = cipher.decrypt("senha");


//Repository IMPORTS
import { database } from "./repository/db.js";
import { userRepository } from "./repository/UserRepository.js";
import { cartaoDebitoRepository } from "./repository/CartaoDebitoRepository.js";
import { cartaoCreditoRepository } from "./repository/CartaoCreditoRepository.js";
import { sendMail, sendMailBemVindo } from "./microservice/Email/sendEmail.js";

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var userId;

server.use(express.json())
server.use(express.urlencoded({ extended: true })); //habilita o uso do post dentro das rotas
server.use(express.static(path.join(__dirname + "/public"))); //habilita o uso de arquivos estaticos
server.set("views", path.join(__dirname + "/public/views")); //define a pasta de views
server.set("view engine","vash");

// ========================== ÁREA DE LOGIN E CRUD USUÁRIO ========================================================

server.get('/', (req, res) => {

	let test = 'TESTANDO'
	res.render('login', {test, erroLogin: false});
});

server.post("/", async (req, res) => {

	//verificar se o usuario é válido
	var userData = {email:req.body.logemail, password: cipher.encrypt(req.body.logpass)}

	var getUser = await userRepository.getUser(userData);

	if (getUser != undefined) {
		userId = getUser.id_user;
		res.render("index", { erroLogin: false });
	} else {
		res.render("login", { erroLogin: true });
	}
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

		//var buffer = Buffer.from(req.body.logpass);

		//req.body.logpass = cipher.encrypt(req.body.logpass);
		//console.log("senha crip: "+req.body.logpass);

		var userData = req.body

		userData.Password = cipher.encrypt(userData.Password); //criptografia md5

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
	//userData.UserId = userId

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
	userId = req.body.UserId;

	//verifica se o delete ocorreu com sucesso!
	var deleteUser;

	//deletamos o usuário pelo o id
	deleteUser = await userRepository.deleteUser(userId);

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
// ========================== CRUD DE CATEGORIA =====================================================================
//lista de categoria
server.get("/categoria", async (req, res) => {

	var categoria = await categoriaRepository.selectListCategoria();
	console.log(categoria);

});

//cadastro da categoria
server.post("/categoria", async (req, res) => {

	var user = await userRepository.getUser(emailUser);
	//Em req.body tem que passar o nome da categoria
	await categoriaRepository.insertCategoria(req.body, user.id_user); //cadastrando categoria

});

//atualiza categoria
server.put("/categoria_update", async (req, res) => {

	var res = await categoriaRepository.updateCategoria(req.body, "categoria antiga"); // passa o nome da categoria a ser deletada
	console.log(res);

});

//deleta categoria
server.delete("/categoria_delete", async (req, res) => {

	var res = await categoriaRepository.deleteCategoria(req.body); // passa o nome da categoria a ser deletada
	console.log(res);

});

// ========================== CRUD DE CARTÕES =====================================================================

server.get("/cartaoList", async (req, res) => {

	//Pega o tipo de cartões que será trazido como LISTA
	let type = req.query.Type;
	let userId = req.query.UserId;

	//Tipo Lista para pegar todos os Cartões do Banco
	var selectCartao;

	if(type == "CC")
	{
		selectCartao = await cartaoCreditoRepository.getCartaoList(userId);
	}
	else
	{
		selectCartao = await cartaoDebitoRepository.getCartaoList(userId);
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
























server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
