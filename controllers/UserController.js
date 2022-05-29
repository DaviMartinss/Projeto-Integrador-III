import { userRepository } from "../repository/UserRepository.js";
import aes256 from "aes256";

//Encriptografia
var key = 'bf3c199c2470cb477d907b1e0917c17b';
var cipher = aes256.createCipher(key);
//Ex:
	//	cipher.encrypt("senha")
	//	cipher.decrypt("senha");

class UserController {
  constructor() {
  }

  //pega USER PELO EMAIL E SENHA
  async getUser(userData) {

    try{
      var user = undefined;
      var getUserList = await userRepository.getUserList();

    	getUserList.forEach( userLista => {

    		if(userData.Email == userLista.Email && userData.Password == cipher.decrypt(userLista.PassWord))
    			 user = userLista;

    	});

      if(user != undefined)
      {
        return user;
      }
      else {
        console.log("USUÁRIO INEXISTENTE");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }

  }

  //PEGA O USER PELO ID
  async getUserById(userId) {

    try{

      var user = await getUserById(userId);

      if(user != undefined)
      {
        return user;
      }
      else {
        console.log("USUÁRIO INEXISTENTE");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  //PEGA TODOS OS USERS E TRAS NA LISTA
  async getUserList() {

    try{

      var userList = await getUserList();

      if(userList != undefined)
      {
        return userList;
      }
      else {
        console.log("NENHUM USUÁRIO CADASTRADO!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  //PEGA TODOS OS USERS E TRAS NA LISTA
  async getUserByEmail(email) {

    try{

      var user = await getUserByEmail(email);

      if(user != undefined)
      {
        return user;
      }
      else {
        console.log("NENHUM USUÁRIO COM EMAIL=" + email + " CADASTRADO!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  //CADASTRA O USUARIO
  async GenerateUser(userData) {

    try{
      
      userData.Password = cipher.encrypt(userData.Password); //criptografia aes256

      //verificar se o email já foi cadastrado
      var userExiste = await userRepository.getUserByEmail(userData.Email);

      //verifica se o insert ocorreu com sucesso!
      var insertUser;

      if(userExiste[0] == undefined){

        insertUser = await userRepository.insertUser(userData);

        if(insertUser)
        {
          return true;
        }
        else
        {
          console.log("ERRO NO CADASTRO DO USUÁRIO");
          return false;
        }

      }else{
        console.log("Email já foi cadastrado por outro usuário!");
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

}


export const userController = new UserController();
