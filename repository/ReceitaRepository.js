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
  async getReceitaList(userId) {

    try {

      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'select * from "receitas" WHERE id_user=$1;';
        const res = await db.query(sql, [userId]);
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
  async insertReceita(receita){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'INSERT INTO "receitas" '
                  + '('
                    + ' fonte_receita,'
                    + ' data_receita,'
                    + ' forma_de_alocacao,'
                    + ' valor_receita,'
                    + ' se_repete,'
                    + ' id_user'
                  + ')'
                  + ' VALUES ($1,$2,$3,$4,$5,$6);';

        const values = [receita.CategoriaId,
                        receita.Data,
                        receita.FormaLocacao,
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
         const sql = 'UPDATE "receitas" SET '
                     + ' fonte_receita=$1,'
                     + ' data_receita=$2,'
                     + ' forma_de_alocacao=$3,'
                     + ' valor_receita=$4,'
                     + ' se_repete=$5'
                   + 'WHERE id_receita=$6 AND id_user=$7';

         const values = [receita.CategoriaId,
                         receita.Data,
                         receita.FormaLocacao,
                         receita.Valor,
                         receita.SeRepete,
                         receita.ReceitaId,
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

//deleta receita
  async deleteReceita(receita){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "receitas" WHERE id_receita=$1 AND id_user=$2';
        const values = [receita.ReceitaId, receita.UserId];
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
