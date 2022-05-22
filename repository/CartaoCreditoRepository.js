import { database } from "./db.js";

class CartaoCreditoRepository{

//pega uma lista de todos os cartões no Banco
  async getCartaoList(userId) {

      try
      {
        const db = await database.connect();

        if(db != undefined )
        {
          const sql = 'select * from "cartao_credito" WHERE id_user=$1;';
          const values = [userId];
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

      if(db != undefined)
      {
        const sql = 'INSERT INTO "cartao_credito"'
                  + '('
                      + 'id_user,'
                      + 'num_cartao_credito,'
                      + 'data_fatura,'
                      + 'fatura,'
                      + 'limite,'
                      + 'anuidade,'
                      + 'adicional_juro'
                  + ')'
                  + 'VALUES ($1,$2,$3,$4,$5,$6,$7);';
        const values = [cartao.UserId,
                        cartao.NumCartao,
                        cartao.DataFatura,
                        cartao.Fatura,
                        cartao.Limite,
                        cartao.Anuidade,
                        cartao.JurosAdicional];
        await db.query(sql, values);

        return true;
      }
      else
      {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (e) {
      console.log(ex);
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
        const sql = 'UPDATE "cartao_credito" SET '
                //  + '('
                      + 'num_cartao_credito=$1,'
                      + 'data_fatura=$2,'
                      + 'fatura=$3,'
                      + 'limite=$4,'
                      + 'anuidade=$5,'
                      + 'adicional_juro=$6'
                  //+ ')'
                  +' WHERE id_cartao_credito=$7 AND id_user=$8';
        const values = [cartao.NumCartao,
                        cartao.DataFatura,
                        cartao.Fatura,
                        cartao.Limite,
                        cartao.Anuidade,
                        cartao.JurosAdicional,
                        cartao.CartaoCreditoId,
                        cartao.UserId];

        //console.log(sql);

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
        const sql = 'DELETE FROM "cartao_credito" WHERE id_cartao_credito=$1 AND id_user=$2';
        const values = [cartao.CartaoCreditoId, cartao.UserId];
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
