import { database } from "./db.js";
class UserRepository {

  async selectUser(email, password) {
      const bd = await database.connect();
      //console.log("select * from" + ' "user" '+ " WHERE login='" + email +"' AND senha='" + password + "';");
      const res = await bd.query("select * from" + ' "user" '+ " WHERE Email='" + email +"' AND password='" + password + "';");
      return res.rows;
  }

  //pega o usuário pelo o email
  async getUserByEmail(email) {
    const bd = await database.connect();
    const sql = await bd.query('SELECT * FROM "user" WHERE email=$1');
    const values = [email];
    await db.query(sql, values);

    console.log(res.rows);

    return res.rows;
}

//cadastra um usuário
  async insertUser(user){
    const db = await database.connect();
    const sql = 'INSERT INTO "user" (nickname, Email, password) VALUES ($1,$2,$3);';
    const values = [user.logname, user.logemail, user.logpass];
    await db.query(sql, values);
   }

   //update do usuário
   async updateUser(user, email){
    const db = await database.connect();
    const sql = 'UPDATE "user" SET nickname=$1, Email=$2, password=$3 WHERE Email=$4';
    const values = [user.logname, user.logemail, user.logpass, email];
    await db.query(sql, values); 
  }

//deleta usuário
  async deleteUser(user_id){
    const db = await database.connect();
    const sql = 'DELETE FROM "user" WHERE id_user=$1';
    const values = [user_id];
    await db.query(sql, values); 
  }

}

export const userRepository = new UserRepository();
