import { database } from "./db.js";
class UserRepository {

  async selectUser(email, password) {
      const bd = await database.connect();
      //console.log("select * from" + ' "user" '+ " WHERE login='" + email +"' AND senha='" + password + "';");
      const res = await bd.query("select * from" + ' "user" '+ " WHERE login='" + email +"' AND senha='" + password + "';");
      return res.rows;
  }

     async insertUser(user){
       const db = await database.connect();
      const sql = 'INSERT INTO "user" (nome, login, senha) VALUES ($1,$2,$3);';
       const values = [user.logname, user.logemail, user.logpass];
       await db.query(sql, values);
   }
}

export const userRepository = new UserRepository();
