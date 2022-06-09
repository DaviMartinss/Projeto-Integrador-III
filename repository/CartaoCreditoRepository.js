import { database } from "./db.js";

class CartaoCreditoRepository{

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

      //console.log(cartao);

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
                        cartao.NumCartao,
                        cartao.DataFatura,
                        cartao.Fatura,
                        cartao.Limite,
                        cartao.Limite,
                        cartao.Anuidade,
                        cartao.JurosAdicional,
                        cartao.Bandeira];
        await db.query(sql, values);

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
                      + '"NumCC"=$1,'
                      + '"DataFatura"=$2,'
                      + '"Fatura"=$3,'
                      + '"Limite"=$4,' //FALTA ATT O CREDITO
                      + '"Anuidade"=$5,'
                      + '"JurosAdicional"=$6,'
                      + '"Bandeira"=$7'
                  +' WHERE "CartaoCreditoId"=$8';
        const values = [cartao.NumCartao,
                        cartao.DataFatura,
                        cartao.Fatura,
                        cartao.Limite,
                        cartao.Anuidade,
                        cartao.JurosAdicional,
                        cartao.Bandeira,
                        cartao.CartaoCreditoId];

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

//deleta cartão de crédito
  async deleteCartao(cartao){
    try
    {
      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "CartaoCredito" WHERE "CartaoCreditoId"=$1';
        const values = [cartao.CartaoCreditoId];
        await db.query(sql, values);

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
