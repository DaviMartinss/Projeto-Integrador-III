import { database } from "./db.js";

class CartaoCreditoRepository {

  //cadastra um cartão de crédito
  async insertUser(user){
    const db = await database.connect();
    const sql = 'INSERT INTO "user" (nickname, Email, password) VALUES ($1,$2,$3);';
    const values = [user.logname, user.logemail, user.logpass];
    await db.query(sql, values);
   }

   //update do cartão de crédito
   async updateUser(user, email){
    const db = await database.connect();
    const sql = 'UPDATE "user" SET nickname=$1, Email=$2, password=$3 WHERE Email=$4';
    const values = [user.logname, user.logemail, user.logpass, email];
    await db.query(sql, values);
  }

//deleta cartão de crédito
  async deleteUser(user_id){
    const db = await database.connect();
    const sql = 'DELETE FROM "user" WHERE id_user=$1';
    const values = [user_id];
    await db.query(sql, values);
  }

}

export const cartaoCreditoRepository = new CartaoCreditoRepository();
