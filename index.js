import express from "express";
import { fileURLToPath } from "url";
import path from "path";


const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


server.use(express.urlencoded({ extended: true })); //habilita o uso do post dentro das rotas
server.use(express.static(path.join(__dirname + "/public"))); //habilita o uso de arquivos estaticos
server.set("views", path.join(__dirname + "/src/views")); //define a pasta de views


server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
