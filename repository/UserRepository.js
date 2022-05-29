import { database } from "./db.js";

class UserRepository {

  async getUser(user) {

      try {

        const db = await database.connect();

        if(db != undefined )
        {
          const sql = 'select * from "User" WHERE "Email"=$1 AND "PassWord"=$2;';
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

  // retorna o usuário logado

  async getUserById(userId) {

    try {

      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'select * from "User" WHERE "UserId"=$1;';
        const values = [userId]
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
        const sql = 'select * from "User";';
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
        const sql = 'select * from "User" WHERE "Email"=$1;';
        const res = await db.query(sql,[email]);
        return res;
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
      console.log("user: "+user);
      if(db != undefined)
      {
        const sql = 'INSERT INTO "User" ("NickName", "Email", "PassWord") VALUES ($1,$2,$3);';
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
         const sql = 'UPDATE "User" SET "NickName"=$1, "Email"=$2, "PassWord"=$3 WHERE "UserId"=$4';
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

//Update senha
async updatePassword(user){

  try {

    const db = await database.connect();

    if(db != undefined)
    {
      const sql = 'UPDATE "User" SET "PassWord"=$1 WHERE "UserId"=$2';
      const values = [user.Password, user.UserId];
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
        const sql = 'DELETE FROM "User" WHERE "UserId"=$1';
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
