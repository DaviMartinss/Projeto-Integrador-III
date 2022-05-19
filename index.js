import { database } from "./repository/db.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { userRepository } from "./repository/UserRepository.js";


const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

	var getUser = await userRepository.selectUser(userData.email, userData.password);

	if (getUser[0] != undefined) {
		res.render("login", { erroLogin: false });
	} else {
		res.render("login", { erroLogin: true });
	}
});

server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
