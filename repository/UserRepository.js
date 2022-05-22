import { database } from "./db.js";

class UserRepository {

  async getUser(user) {

      try {

        const db = await database.connect();

        if(db != undefined )
        {
          const sql = 'select * from "user" WHERE Email=$1 AND password=$2;';
          const values = [user.email, user.password]
          const user = await db.query(sql,values);
          return user;
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

  //pega uma lista de usuários
  async getUserList() {

    try {

      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'select * from "user";';
        const res = await db.query(sql);
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

  //pega o usuário pelo o email
  async getUserByEmail(email) {

    try {

      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'select * from "user" WHERE email=$1;';
        const res = await db.query(sql,[email]);
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

//cadastra um usuário
  async insertUser(user){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'INSERT INTO "user" (nickname, Email, password) VALUES ($1,$2,$3);';
        const values = [user.NickName, user.Email, user.Password];
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

   //update do usuário
   async updateUser(user){

     try {

       const db = await database.connect();

       if(db != undefined)
       {
         const sql = 'UPDATE "user" SET nickname=$1, Email=$2, password=$3 WHERE id_user=$4';
         const values = [user.NickName, user.Email, user.Password, user.UserId];
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

//deleta usuário
  async deleteUser(user_id){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "user" WHERE id_user=$1';
        const values = [user_id];
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
}

export const userRepository = new UserRepository();
