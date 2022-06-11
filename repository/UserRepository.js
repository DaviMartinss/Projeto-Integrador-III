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

      //console.log(userId);

      if(db != undefined )
      {
        const sql = 'select * from "User" WHERE "UserId"=$1;';
        const values = [userId]
        const res = await db.query(sql,values);
        return res.rows[0];
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

      //console.log(email);

      if(db != undefined )
      {
        const sql = 'SELECT * FROM "User" WHERE "Email"=$1;';
        const res = await db.query(sql,[email]);
        return res.rows[0];
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
        const sql = 'INSERT INTO "User" ("NickName", "Email", "PassWord", "Avatar") VALUES ($1,$2,$3, $4);';
        const values = [user.NickName, user.Email, user.Password, user.Avatar];
        await db.query(sql, values);

        return true;
      }
      else
      {
        //console.log("ERRO NA CONEXÃO COM POSTGREESQL");
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

//UPDATE INPUT USER ============================================================================

  //update do nome do user
  async updateUserNickName(user){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'UPDATE "User" SET "NickName"=$1 WHERE "UserId"=$2';
        const values = [user.NickName, user.UserId];
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

  //update do email do user
  async updateUserEmail(user){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'UPDATE "User" SET "Email"=$1 WHERE "UserId"=$2';
        const values = [user.Email, user.UserId];
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

  //update do password do user
  async updateUserPassword(user){

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

  async updateUserAvatar(user){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'UPDATE "User" SET "Avatar"=$1 WHERE "UserId"=$2';
        const values = [user.Avatar, user.UserId];
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

 //============================================================================

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
  async deleteUser(userId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "User" WHERE "UserId"=$1';
        const values = [userId];
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
