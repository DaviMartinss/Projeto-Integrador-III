import { receitaRepository } from "../repository/ReceitaRepository.js";

class ReceitaController {
  constructor() {

  }

  //PEGA TODOS AS RECEITAS E TRAS NA LISTA
  async GetReceitaList(user) {

    try{

      var receitaList = await receitaRepository.getReceitaList(user);

      if(receitaList != undefined)
      {
        return receitaList;
      }
      else {
        console.log("NENHUMA RECEITA CADASTRADA!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  async GetReceitaById(receitaId) {

    try{

      var receita = await receitaRepository.getReceitaById(receitaId);

      if(receita != undefined)
      {
        return receita;
      }
      else {
        console.log("NENHUMA RECEITA CADASTRADA!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  async GenerateReceita(receitaData) {

    try{

      //verificar se a receita já foi cadastrada
      //var userExiste = await receitaRepository.getUserByEmail(userData.Email);

      //verifica se o insert ocorreu com sucesso!
      var insertReceita;

    //  if(userExiste == undefined){

        insertReceita = await receitaRepository.insertReceita(receitaData);

        if(insertReceita)
          return true;
        else
          return false;

      // }else{
      //   console.log("Email já foi cadastrado por outro usuário!");
      //   return false;
      // }

    }catch(e){

      console.log(e);
      return false;
    }
  }

  async UpdateReceita(receitaData) {

    try{

      //verifica se o update ocorreu com sucesso!
    	var updateReceita = await receitaRepository.updateUser(receitaData);

    	if(updateReceita)
        return true;
    	else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //DELETA O USUARIO
  async DeleteReceita(receitaData) {

    try{

      //verifica se o delete ocorreu com sucesso!
    	var deleteReceita = await receitaRepository.deleteReceita(receitaData);

    	if(deleteReceita)
    		return true;
    	else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }
}

export const receitaController = new ReceitaController();
