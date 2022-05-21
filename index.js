//Aplication IMPORTS
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

//Repository IMPORTS
import { database } from "./repository/db.js";
import { userRepository } from "./repository/UserRepository.js";
import { cartaoDebitoRepository } from "./repository/CartaoDebitoRepository.js";
import { cartaoCreditoRepository } from "./repository/CartaoCreditoRepository.js";


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

	if (getUser[0] != undefined) {
		res.render("index", { erroLogin: false });
	} else {
		res.render("login", { erroLogin: true });
	}
});

server.get("/user_cadastro", async (req, res) => {

	var email = req.body.logemail;
	var insertUser = await userRepository.insertUser(req.body);

});

server.post("/user_cadastro", async (req, res) => {
	//verificar se o email já foi cadastrado (Falta fazer)
	var email = req.body.logemail;
	req.body.logpass = btoa(req.body.logpass);
	var insertUser = await userRepository.insertUser(req.body);
	res.redirect("/");

});

server.post("/user_update", async (req, res) => {

	//atualizar dados do usuário (passo o email porque ele deve ser único)
	await userRepository.updateUser(req.body, emailUser);
	res.redirect("/"); //deve ser redirecionanda para a tela de dados do usuário

});

server.post("/user_delete", async (req, res) => {

	//deletamos o usuário pelo o id
	var user = await userRepository.getUserByEmail(emailUser);
	await userRepository.updateUser(user.id_user);
	res.redirect("/"); //deve ser redirecionanda para a tela de dados do usuário

});

/*server.post("/user_delete", async (req, res) => {

	//deletamos o usuário pelo o id
	var user = await userRepository.getUserByEmail(emailUser);
	await userRepository.updateUser(user.id_user);
	res.redirect("/"); //deve ser redirecionanda para a tela de dados do usuário

});*/

// ========================== CRUD DE CARTÕES =====================================================================

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
