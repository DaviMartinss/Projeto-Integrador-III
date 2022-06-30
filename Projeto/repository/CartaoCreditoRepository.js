import { database } from "./db.js";

class CartaoCreditoRepository{

  //Retorna um cartão de crédito pelo o número
  async getCartaoByNum(numCartao) {

    try
    {
      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'select "CartaoCreditoId" as "CartaoId" from "CartaoCredito" WHERE "NumCC"=$1;';
        const values = [numCartao];
        const res = await db.query(sql,values);
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

  //Retorna um cartão de Crédito o Id
  async getCartaoById(cartaoId) {

    try
    {
      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'select * from "CartaoCredito" WHERE "CartaoCreditoId"=$1;';
        const values = [cartaoId];
        const res = await db.query(sql,values);
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

//pega uma lista de todos os cartões no Banco
  async getCartaoList(user) {

      try
      {
        const db = await database.connect();

        if(db != undefined )
        {
          const sql = 'select * from "CartaoCredito" WHERE "UserId"=$1;';
          const values = [user];
          const res = await db.query(sql,values);
          db.release();
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

//cadastra um cartão de crédito
  async insertCartao(cartao){

    try
    {
      const db = await database.connect();

      if(db != undefined)
      {
        
        const sql = 'INSERT INTO "CartaoCredito"'
                  + '('
                      + '"UserId",'
                      + '"NumCC",'
                      + '"DataFatura",'
                      + '"Fatura",'
                      + '"Limite",'
                      + '"Credito",'
                      + '"Anuidade",'
                      + '"JurosAdicional",'
                      + '"Bandeira"'
                  + ')'
                  + 'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);';
        const values = [cartao.UserId,
                        cartao.cartaoData.NumCartao,
                        cartao.cartaoData.DataFatura,
                        cartao.cartaoData.Fatura,
                        cartao.cartaoData.Limite,
                        cartao.cartaoData.Limite,
                        cartao.cartaoData.Anuidade,
                        cartao.cartaoData.JurosAdicional,
                        cartao.cartaoData.Bandeira];
        await db.query(sql, values);
        db.release();
        return true;
      }
      else
      {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (e) {
      console.log(e);
      return false;
    }
  }

//update do cartão de crédito
  async updateCartao(cartao){

    try
    {
      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'UPDATE "CartaoCredito" SET '
                      + '"DataFatura"=$1,'
                      + '"Fatura"=$2,'
                      + '"Credito"=$3,'
                      + '"Limite"=$4,' 
                      + '"Anuidade"=$5,'
                      + '"JurosAdicional"=$6,'
                      + '"Bandeira"=$7'
                  +' WHERE "CartaoCreditoId"=$8';
        const values = [
                        cartao.cartaoData.DataFatura,
                        cartao.cartaoData.Fatura,
                        cartao.cartaoData.Credito,
                        cartao.cartaoData.Limite,
                        cartao.cartaoData.Anuidade,
                        cartao.cartaoData.JurosAdicional,
                        cartao.cartaoData.Bandeira,
                        cartao.Id];

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

//deleta cartão de crédito
  async deleteCartao(cartao){
    try
    {
      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "CartaoCredito" WHERE "NumCC"=$1';
        const values = [cartao.numCartao];
        await db.query(sql, values);
        db.release();
        return true;
      }
      else
      {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export const cartaoCreditoRepository = new CartaoCreditoRepository();
