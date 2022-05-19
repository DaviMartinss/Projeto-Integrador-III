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
server.set("views", path.join(__dirname + "/src/views")); //define a pasta de views
server.set("view engine","vash");

server.get('/', (req, res) => {

	let test = 'TESTANDO'

	res.render('login', {test});
});

server.post("/", async (req, res) => {
	//verificar se o usuario é válido

	var userData = req.body

	var getUser = await userRepository.selectUser();

	/*getUser.forEach((user) => {
		//Verifica os dados no banco relacionados ao ID -> email
		if(user == userData){
			console.log("PODE LOGAR");
		}
	});


	/*if (user) {
		res.redirect("/loja");
		// let veiculos = await veiculosRepository.getVeiculos();
		// res.render("loja", { veiculos });
	} else {
		res.render("singin", { erroLogin: true });
	}*/
});

server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
