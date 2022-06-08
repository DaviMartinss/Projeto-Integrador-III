import { database } from "./db.js";

class CartaoDebitoRepository{

//pega uma lista de todos os cartões no Banco
  async getCartaoList(user) {

      try
      {
        const db = await database.connect();

        if(db != undefined )
        {
          const sql = 'select * from "CartaoDebito" WHERE "UserId"=$1;';
          const values = [user.UserId];
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

//cadastra um cartão de débito
  async insertCartao(cartao){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'INSERT INTO "CartaoDebito"'
                  + '('
                      + '"UserId",'
                      + '"NumCD",'
                      + '"CartaoPrincipal",'
                      + '"Saldo",'
                      + '"Bandeira"'
                  + ')'
                  + 'VALUES ($1,$2,$3,$4,$5);';
        const values = [cartao.UserId,
                        cartao.NumCartao,
                        cartao.CartaoPrincipal,
                        cartao.Saldo,
                        cartao.Bandeira];
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

//update do cartão de débito
  async updateCartao(cartao){
    try
    {
      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'UPDATE "CartaoDebito" SET '
                      + "NumCD=$1,"
                      + "CartaoPrincipal=$2,"
                      + "Saldo=$3,"
                      + "Bandeira=$4"
                  +' WHERE "CartaoDebitoId"=$5';
        const values = [cartao.NumCartao,
                        cartao.CartaoPrincipal,
                        cartao.Saldo,
                        cartao.Bandeira,
                        cartao.CartaoDebitoId];
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

//deleta cartão de débito
  async deleteCartao(cartao){
    try
    {
      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "CartaoDebito" WHERE "CartaoDebitoId"=$1';
        const values = [cartao.CartaoDebitoId];
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

export const cartaoDebitoRepository = new CartaoDebitoRepository();
