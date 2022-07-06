import { categoriaRepository } from "../repository/CategoriaRepository.js";


class CategoriaController {
  constructor() {

  }

  //retorna uma categoria pelo o id
  async GetCategoriaById(categoriaId) {

    try{

    	var categoria = await categoriaRepository.GetCategoriaById(categoriaId);
      
      if(categoria != undefined)
      {
        return categoria; 
      }
      else {
        console.log("NÃO EXISTE ESSA CATEGORIA");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  
  //pega a categoria pelo o nome 
  async getCategoriaByName(categoriaNome) {

    try{

    	var categoria = await categoriaRepository.getCategoriaByName(categoriaNome);
      
      if(categoria != undefined)
      {
        return categoria; 
      }
      else {
        console.log("NÃO EXISTE ESSA CATEGORIA");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  //PEGA UMA LISTA DE CATEGORIAS DE UM DETERMINADO USER
  async GetCategoriaList(user) {

    try{

    	var categoriaList = await categoriaRepository.getCategoriaList(user);

      if(!!categoriaList.length)
      {
        return categoriaList;
      }
      else {
        console.log("NENHUMA CATEGORIA CADASTRADA PARA O USUÁRIO INFORMADO!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  //CADASTRA A CATEGORIA
  async GenerateCategoria(categoriaData) {

    try{

      //verifica se o insert ocorreu com sucesso!
    	var insertCategoria = await categoriaRepository.insertCategoria(categoriaData); //cadastrando categoria

      if(insertCategoria)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //ATUALIZA A CATEGORIA
  async UpdateCategoria(categoriaData) {

    try{

      //verifica se o update ocorreu com sucesso!
    	var updateCategoria = await categoriaRepository.updateCategoria(categoriaData);

      if(updateCategoria)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //DELETA A CATEGORIA
  async DeleteCategoria(categoriaData) {

    try{

      //verifica se o update ocorreu com sucesso!
    	var deleteCategoria = await categoriaRepository.deleteCategoria(categoriaData);

      if(deleteCategoria)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }
}


export const categoriaController = new CategoriaController();
