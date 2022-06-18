import { database } from "./db.js";

class CartaoDebitoRepository{

  //Retorna um cartão de Crédito o número
   async getCartaoByNum(numCartao) {

    try
    {
      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'select "CartaoDebitoId" as "CartaoId" from "CartaoDebito" WHERE "NumCD"=$1;';
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
        const sql = 'select * from "CartaoDebito" WHERE "CartaoDebitoId"=$1;';
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
          const sql = 'select * from "CartaoDebito" WHERE "UserId"=$1;';
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
                        cartao.cartaoData.NumCartao,
                        false,
                        cartao.cartaoData.Saldo,
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

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

//update do cartão de débito
  async updateCartao(cartao){
    try
    {
      console.log("O id é: "+cartao.Id);
      const db = await database.connect();
      
      if(db != undefined)
      {
        const sql = 'UPDATE "CartaoDebito" SET '
                      + '"NumCD"=$1,'
                      + '"Saldo"=$2,'
                      + '"Bandeira"=$3'
                  +' WHERE "CartaoDebitoId"=$4';
        const values = [cartao.cartaoData.numCartao,
                        cartao.cartaoData.SaldoCD,
                        cartao.cartaoData.BandeiraCD,
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
        const sql = 'DELETE FROM "CartaoDebito" WHERE "NumCD"=$1';
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

export const cartaoDebitoRepository = new CartaoDebitoRepository();
