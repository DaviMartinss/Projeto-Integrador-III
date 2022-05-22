//Aplication IMPORTS
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import aes256 from "aes256";

var key = 'bf3c199c2470cb477d907b1e0917c17b';

//var decryptedPlainText = cipher.decrypt(encryptedPlainText);
//Repository IMPORTS
import { database } from "./repository/db.js";
import { userRepository } from "./repository/UserRepository.js";
import { cartaoDebitoRepository } from "./repository/CartaoDebitoRepository.js";
import { cartaoCreditoRepository } from "./repository/CartaoCreditoRepository.js";
import { sendMail, sendMailBemVindo } from "./microservice/Email/sendEmail.js";

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var emailUser = "";

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
	var userData = {email:req.body.logemail, password: btoa(req.body.logpass)}
	emailUser = userData.email; //atribui para a variavél global emailUser o email do usuário
	var getUser = await userRepository.selectUser(userData);

	var decryptedSenha = cipher.decrypt("senha");
	
	if (getUser[0] != undefined) {
		res.render("index", { erroLogin: false });
	} else {
		res.render("login", { erroLogin: true });
	}
});

//cadastra usuário
server.post("/user_cadastro", async (req, res) => {

	//verificar se o email já foi cadastrado
	var userExiste = await userRepository.getUserByEmail(req.body.logemail);

	if(userExiste == ''){

		//var buffer = Buffer.from(req.body.logpass);
		var cipher = aes256.createCipher(key);
		req.body.logpass = cipher.encrypt(req.body.logpass);
		console.log("senha crip: "+req.body.logpass);

		await userRepository.insertUser(req.body);
		sendMailBemVindo.run(req.body.logname, req.body.logemail);
	}else{
		console.log("Erro");
	}

	res.redirect("/");
});

//atualiza usuário
server.put("/user_update", async (req, res) => {

	//atualizar dados do usuário (passo o email porque ele deve ser único)
	await userRepository.updateUser(req.body, emailUser);
	res.redirect("/"); //deve ser redirecionanda para a tela de dados do usuário

});

//deleta usuário
server.delete("/user_delete", async (req, res) => {

	//deletamos o usuário pelo o id
	var user = await userRepository.getUserByEmail(emailUser);
	await userRepository.deleteUser(user.id_user);
	res.redirect("/"); //deve ser redirecionanda para a tela de dados do usuário

});
// ========================== CRUD DE CATEGORIA =====================================================================
//lista de categoria
server.get("/categoria", async (req, res) => {

	var categoria = await categoriaRepository.selectListCategoria();
	console.log(categoria);

});

//cadastro da categoria
server.post("/categoria", async (req, res) => {
	
	var user = await userRepository.getUserByEmail(emailUser);
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

	}else
	{
		//INSERT Cartão de Débito
		insertCartao = await cartaoDebitoRepository.insertCartao(cartaoData);
	}

	if(insertCartao)
	{
		//redenrizar TELA DE CARTAO DE CREDITO
		console.log("CADASTROU");
	}else
	{
		//redenrizar TELA DE CADASTRO DE CARTAO COM ALERTA DE ERRO
		console.log("ERRO NO CADASTRO");
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

	}else
	{
		//UPDATE Cartão de Débito
		updateCartao = await cartaoDebitoRepository.updateCartao(cartaoData);
	}

	if(updateCartao)
	{
		//redenrizar TELA DE CARTAO DE CREDITO
		console.log("ATUALIZOU");
	}else
	{
		//redenrizar TELA DE UPDATE DE CARTAO COM ALERTA DE ERRO
		console.log("ERRO NA ATUALIZAÇÃO");
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

	}else
	{
		//DELETE Cartão de Débito
		deleteCartao = await cartaoDebitoRepository.deleteCartao(cartaoData);
	}

	if(deleteCartao)
	{
		//redenrizar TELA DE CARTAO DE CREDITO
		console.log("APAGOU CARTAO");
	}else
	{
		//redenrizar TELA DE CARTAO COM ALERTA DE ERRO
		console.log("ERRO AO APAGAR CARTAO");
	}
});
























server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
