import { database } from "./repository/db.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { userRepository } from "./repository/UserRepository.js";


const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var emailUser = "";

server.use(express.urlencoded({ extended: true })); //habilita o uso do post dentro das rotas
server.use(express.static(path.join(__dirname + "/public"))); //habilita o uso de arquivos estaticos
server.set("views", path.join(__dirname + "/public/views")); //define a pasta de views
server.set("view engine","vash");

server.get('/', (req, res) => {

	let test = 'TESTANDO'

	res.render('login', {test, erroLogin: false});
});

server.post("/", async (req, res) => {
	//verificar se o usuario é válido
	var userData = {email:req.body.logemail, password:  req.body.logpass}


	emailUser = userData.email; //atribui para a variavél global emailUser o email do usuário

	var getUser = await userRepository.selectUser(userData.email, userData.password);

	if (getUser[0] != undefined) {
		res.render("login", { erroLogin: false });
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

server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
