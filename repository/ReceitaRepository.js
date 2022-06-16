import { database } from "./db.js";

class ReceitaRepository {

  async getReceita(receita) {

      try {

        const db = await database.connect();

        if(db != undefined )
        {
          //IMPLEMENTE CASO SEJA NECESSÁRIO
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

  //pega uma lista de receitas
  async getReceitaList(user) {

    try {

      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'SELECT * FROM "Receita" WHERE "UserId"=$1;';
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

//cadastra uma receita
  async insertReceita(receita){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'INSERT INTO "Receita" '
                  + '('
                    + '"CategoriaId",'
                    + '"Data",'
                    + '"FormaAlocacao",'
                    + '"Valor",'
                    + '"SeRepete",'
                    + '"UserId"'
                  + ')'
                  + ' VALUES ($1,$2,$3,$4,$5,$6);';

        const values = [receita.CategoriaId,
                        receita.Data,
                        receita.FormaAlocacao,
                        receita.Valor,
                        receita.SeRepete,
                        receita.UserId];

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
   async updateReceita(receita){

     try {

       const db = await database.connect();

       if(db != undefined)
       {
         const sql = 'UPDATE "Receita" SET '
                     + '"CategoriaId"=$1,'
                     + '"Data"=$2,'
                     + '"FormaAlocacao"=$3,'
                     + '"Valor"=$4,'
                     + '"SeRepete"=$5'
                     + 'WHERE "ReceitaId"=$6';

         const values = [receita.CategoriaId,
                         receita.Data,
                         receita.FormaLocacao,
                         receita.Valor,
                         receita.SeRepete,
                         receita.ReceitaId];

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

//deleta receita
  async deleteReceita(receita){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "Receita" WHERE "ReceitaId"=$1';
        const values = [receita.ReceitaId];
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

export const receitaRepository = new ReceitaRepository();
