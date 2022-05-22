import { database } from "./db.js";

class CategoriaRepository {

  async getCategoriaList() {

    try {

      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'select * from categoria';
        const res = await db.query(sql);
        //console.log(res.rows);
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
        const sql = 'select * from categoria WHERE categoria=$1;';
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
        const sql = 'INSERT INTO categoria (categoria, id_user) VALUES ($1,$2);';
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
         const sql = 'UPDATE categoria SET categoria=$1 WHERE id_categoria=$2 AND id_user=$3;';
         const values = [categoria.Categoria, categoria.CategoriaId, categoria.UserId];
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
        const sql = 'DELETE FROM categoria WHERE id_categoria=$1 AND id_user=$2';
        const values = [categoria.CategoriaId, categoria.UserId];
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
