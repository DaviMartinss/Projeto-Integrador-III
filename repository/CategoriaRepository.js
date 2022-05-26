import { database } from "./db.js";

class CategoriaRepository {

  async getCategoriaList(user) {

    try {

      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'select * from "Categoria" WHERE "UserId"=$1';
        const res = await db.query(sql, [user.UserId]);
        return res.rows;
      }
      else
      {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return undefined;
      }

    } catch (e) {

      console.log(e);
      return undefined;
    }

  }

  //pega a categoria pelo o nome
  async getCategoriaByName(categoria) {

    try {

      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'select * from "Categoria" WHERE "Categoria"=$1;';
        const res = await db.query(sql,[categoria.Categoria]);
        return res.rows;
      }
      else
      {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return undefined;
      }

    } catch (e) {

      console.log(e);
      return undefined;
    }
  }

//cadastra uma categoria
  async insertCategoria(categoria){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'INSERT INTO "Categoria" ("Categoria", "UserId") VALUES ($1,$2);';
        const values = [categoria.Categoria, categoria.UserId];
        await db.query(sql, values);

        return true;
      }
      else
      {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (ex) {

      console.log(ex);
      return false;
    }

   }

   //update da categoria
   async updateCategoria(categoria){

     try {

       const db = await database.connect();

       if(db != undefined)
       {
         const sql = 'UPDATE "Categoria" SET "Categoria"=$1 WHERE "CategoriaId"=$2;';
         const values = [categoria.Categoria, categoria.CategoriaId];
         await db.query(sql, values);

         return true;
       }
       else
       {
         console.log("ERRO NA CONEXÃO COM POSTGREESQL");
         return false;
       }

     } catch (ex) {

       console.log(ex);
       return false;
     }

  }

//deleta categoria
  async deleteCategoria(categoria){

    try {
      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "Categoria" WHERE "CategoriaId"=$1';
        const values = [categoria.CategoriaId];
        const res = await db.query(sql, values);
        return res.rows;

        return true;
      }
      else
      {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

}

export const categoriaRepository = new CategoriaRepository();
