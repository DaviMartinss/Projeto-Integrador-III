import { database } from "./db.js";

class CartaoDebitoRepository{

//cadastra um cartão de débito
  async insertCartao(cartao){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'INSERT INTO "cartao_debito"'
                  + '('
                      + 'id_user,'
                      + 'num_cartao_debito,'
                      + 'cartao_principal,'
                      + 'saldo'
                  + ')'
                  + 'VALUES ($1,$2,$3,$4);';
        const values = [cartao.UserId,
                        cartao.NumCartao,
                        cartao.CartaoPrincipal,
                        cartao.Saldo];
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
        const sql = 'UPDATE "cartao_debito" SET '
                  //+ '('
                      + 'num_cartao_debito=$1,'
                      + 'cartao_principal=$2,'
                      + 'saldo=$3 '
                  //+ ')'
                  +' WHERE id_cartao_debito=$4 AND id_user=$5';
        const values = [cartao.NumCartao,
                        cartao.CartaoPrincipal,
                        cartao.Saldo,
                        cartao.CartaoDebitoId,
                        cartao.UserId];
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
        const sql = 'DELETE FROM "cartao_debito" WHERE id_cartao_debito=$1 AND id_user=$2';
        const values = [cartao.CartaoDebitoId, cartao.UserId];
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
