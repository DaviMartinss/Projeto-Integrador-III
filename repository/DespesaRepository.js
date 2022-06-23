import { database } from "./db.js";

class DespesaRepository {

  async getDespesaById(despesaId) {

    try {

      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'SELECT * FROM "Despesa" WHERE "DespesaId"=$1;';
        const res = await db.query(sql, [despesaId]);
        db.release();
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

//Retorna todas as despesas do usuário
  async getDespesaByUser(userId) {

      try {

        const db = await database.connect();

        if(db != undefined )
        {
            const sql = 'SELECT * FROM "Despesa" WHERE "UserId"=$1;';
            const values = [userId]
            const despesas = await db.query(sql,values);
            db.release();
            return despesas.rows;
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

//cadastra uma Despesa
  async insertDespesa(despesa){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'INSERT INTO "Despesa" '
                  + '('
                    + '"Valor",'
                    + '"Data",'
                    + '"Descricao",'
                    + '"FormaPagamento",'
                    + '"NumParcelas",'
                    + '"Status",'
                    + '"NumCC",'
                    + '"NumCD",'
                    + '"CategoriaId",'
                    + '"UserId"'
                  + ')'
                  + ' VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);';

        const values = [despesa.Valor,
                        despesa.Data,
                        despesa.Descricao,
                        despesa.FormaPagamento,
                        despesa.NumParcelas,
                        despesa.Status,
                        despesa.NumCC,
                        despesa.NumCD,
                        despesa.CategoriaId,
                        despesa.UserId];

        await db.query(sql, values);
        db.release();
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

   //update da Despesa
   async updateDespesa(despesa){

     try {

       const db = await database.connect();

       if(db != undefined)
       {
         const sql = 'UPDATE "Despesa" SET'
                     + '"Valor"=$1,'
                     + '"Data"=$2,'
                     + '"Descricao"=$3,'
                     + '"FormaPagamento"=$4,'
                     + '"NumParcelas"=$5,'
                     + '"Status"=$6,'
                     + '"NumCC"=$7,'
                     + '"NumCD"=$8,'
                     + '"CategoriaId"=$9'
                     + 'WHERE "DespesaId"=$10';

         const values = [despesa.Valor,
                         despesa.Data,
                         despesa.Descricao,
                         despesa.FormaPagamento,
                         despesa.NumParcelas,
                         despesa.Status,
                         despesa.NumCC,
                         despesa.NumCD,
                         despesa.CategoriaId,
                         despesa.DespesaId];

         await db.query(sql, values);
         db.release();
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

//deleta Despesa
  async deleteDespesaById(despesaId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "Despesa" WHERE "DespesaId"=$1';
        const values = [despesaId];
        await db.query(sql, values);
        db.release();
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

export const despesaRepository = new DespesaRepository();
