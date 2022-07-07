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
  async GetUserByEmailAndSenha(userData) {

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
  async GetUserById(userId) {

    try{

      var user = await userRepository.getUserById(userId);

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
  async GetUserList() {

    try{

      var userList = await userRepository.getUserList();

      if(!!userList.length)
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
  async GetUserByEmail(email) {

    try{

      var user = await userRepository.getUserByEmail(email);

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

      if(userExiste == undefined){

        insertUser = await userRepository.insertUser(userData);

        if(insertUser)
          return true;
        else
          return false;

      }else{
        console.log("Email já foi cadastrado por outro usuário!");
        return false;
      }

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //ATUALIZA O USUARIO POR INPUT
  async UpdateUserByInput(userData) {

    try{

      var updateUser;

      //console.log(userData.hasOwnProperty("NickName"));
      //console.log(Object.keys(userData));

      switch (Object.keys(userData)[0]) {

        case 'NickName':

          updateUser = await userRepository.updateUserNickName(userData);

          break;

        case 'Email':

          updateUser = await userRepository.updateUserEmail(userData);

          break;

        case 'Password':

          userData.Password = cipher.encrypt(userData.Password); //criptografia aes256

          updateUser = await userRepository.updateUserPassword(userData);

          break;

          case 'Avatar':

            updateUser = await userRepository.updateUserAvatar(userData);

            //IMPLEMENTAR
            break;

        default:
          console.log("Opção de update do USER INCORRETA OU DESCONHECIDA!");
      }

    	if(updateUser)
      {
        console.log("ATT USER");
        return true;
      }
    	else
      {
        console.log("ERRO ATT USER");
        return false;
      }

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //atualiza apenas o nome do usuário
  async updateUserNickName(userData) {

    try{

      //verifica se o update ocorreu com sucesso!
    	var updateUser;

    	updateUser = await userRepository.updateUserNickName(userData);

    	if(updateUser)
        return true;
    	else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //ATUALIZA O USUARIO
  async UpdateUser(userData) {

    try{

      userData.Password = cipher.encrypt(userData.Password); //criptografia aes256

      //verifica se o update ocorreu com sucesso!
    	var updateUser;

    	updateUser = await userRepository.updateUser(userData);

    	if(updateUser)
        return true;
    	else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //ATUALIZA O USUARIO
  async updateUserNickNameAndEmail(userData) {

    try{

      //verifica se o update ocorreu com sucesso!
    	var updateUser;

    	updateUser = await userRepository.updateUserNickNameAndEmail(userData);

    	if(updateUser)
        return true;
    	else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //DELETA O USUARIO
  async DeleteUser(userId) {

    try{

      //verifica se o delete ocorreu com sucesso!
    	var deleteUser = await userRepository.deleteUser(userId);

    	if(deleteUser)
    		return true;
    	else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //ATUALIZA A SENHA DO USUARIO
  async UpdatePassword(dados) {

    try{

      dados.newPassword = cipher.encrypt(dados.newPassword + '');

      var userChangePassword = await userRepository.updatePassword(dados);

    	if(userChangePassword){
    		console.log("Atualizado a senha com sucesso!");

    		//pegar os dados do usuário logado pelo o Id
    		const user = await userRepository.getUserById(dados.userId);
        return user;

    	}else{
    		console.log("Falha ao atualizar a senha");
    		return undefined;
    	}

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

}


export const userController = new UserController();
