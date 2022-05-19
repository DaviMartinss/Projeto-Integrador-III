import express from "express";
import path from "path";
import { fileURLToPath } from "url";



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

server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
