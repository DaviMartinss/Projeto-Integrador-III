import { database } from "./db.js";

class SendEmailRepository {

  async getSendEmailByUserId(userId) {

    try {

      const db = await database.connect();

      if (db != undefined) {

        const sql = 'select * from "SendEmail" where "UserId"=$1 order by 1 desc;';
        const values = [userId];
        const SendEmail = await db.query(sql, values);
        db.release();
        return SendEmail[0];

      } else {

        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return undefined;
      }
    } catch (e) {
        
      console.log(e);
      return undefined;
    }
  }

  //Salva a senha enviada para o usuário
  async SaveSendEmail(dados) {
    
    try {
      const db = await database.connect();

      if (db != undefined) {
      
        const sql = 'INSERT INTO "SendEmail" ("Password", "UserId") VALUES ($1, $2);';
        const values = [dados.newPassword, dados.userId];
        
        await db.query(sql, values);
        db.release();
        return true;

      } else {

        return false;
      }
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}

export const sendEmailRepository = new SendEmailRepository();
