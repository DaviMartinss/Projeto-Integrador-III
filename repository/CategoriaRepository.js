import { database } from "./db.js";

class CategoriaRepository {

  async selectListCategoria() {

      const bd = await database.connect();
      const sql = 'select * from categoria';
      const res = await bd.query(sql);
      console.log(res.rows);
      return res.rows;
  }

  //pega a categoria pelo o nome
  async getCategoriaByName(categoria) {

    const bd = await database.connect();
    const sql = 'select * from categoria WHERE categoria=$1;';
    const res = await bd.query(sql,[categoria]);
    return res.rows;
}

//cadastra uma categoria
  async insertCategoria(categoria, user_id){
      
    const db = await database.connect();
    const sql = 'INSERT INTO categoria (categoria, id_user) VALUES ($1,$2);';
    const values = [categoria, user_id];
    await db.query(sql, values);
   }

   //update da categoria
   async updateCategoria(novaCategoria, categoria){

    const db = await database.connect();
    const sql = 'UPDATE categoria SET categoria=$1, categoria=$2;';
    const values = [novaCategoria, categoria];
    await db.query(sql, values);
  }

//deleta categoria
  async deleteCategoria(categoria){

    const db = await database.connect();
    const sql = 'DELETE FROM categoria WHERE categoria=$1';
    const values = [categoria];
    const res = await db.query(sql, values);
    return res.rows;
  }

}

export const categoriaRepository = new CategoriaRepository();
