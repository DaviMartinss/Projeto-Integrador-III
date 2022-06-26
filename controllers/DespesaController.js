import { despesaRepository } from "../repository/DespesaRepository.js";


class DespesaController {
  constructor() {

  }

  async GetDespesaById(despesaId) {

    try{

      var despesa = await despesaRepository.getDespesaById(despesaId);

      if(despesa != undefined)
      {
        return despesa;
      }
      else {
        console.log("NENHUMA DESPESA CADASTRADA!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  // pega o total de Despesa de um mês
  async GetDespesaTotalMes(user) {

    try{

      var despesaTotalMes = [];

      despesaTotalMes = await despesaRepository.getDespesaTotalMes(user);
      
      
      if(!!despesaTotalMes.length)
      {
        return despesaTotalMes;
      }
      else {
        console.log("NENHUMA DESPESA CADASTRADA!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  //PEGA UMA LISTA DE DESPESAS DE UM DETERMINADO USER
  async GetDespesaList(user) {

    try{

      //console.log(user)

    	var despesaList = await despesaRepository.getDespesaByUser(user.UserId);

      if(!!despesaList.length)
      {
        return despesaList;
      }
      else {
        console.log("NENHUMA DESPESA CADASTRADA PARA O USUÁRIO INFORMADO!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  //CADASTRA A DESPESA
  async GenerateDespesa(despesaData) {

    try{

      //verifica se o insert ocorreu com sucesso!
    	var insertDespesa = await despesaRepository.insertDespesa(despesaData);

      if(insertDespesa)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //ATUALIZA A DESPESA
  async UpdateDespesa(despesaData) {

    try{

      //verifica se o update ocorreu com sucesso!
    	var updateDespesa = await despesaRepository.updateDespesa(despesaData);

      if(updateDespesa)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //DELETA A DESPESA
  async DeleteDespesa(despesaId) {

    try{

      //verifica se o update ocorreu com sucesso!
    	var deleteDespesa = await despesaRepository.deleteDespesaById(despesaId.DespesaId);

      if(deleteDespesa)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }
}


export const despesaController = new DespesaController();
