import { database } from "./db.js";

class CartaoCreditoRepository{

//cadastra um cartão de crédito
  async insertCartao(cartao){
    const db = await database.connect();

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

//update do cartão de crédito
  async updateCartao(cartao){

    try
    {
      const db = await database.connect();
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

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

//deleta cartão de crédito
  async deleteUser(user_id){
    const db = await database.connect();
    const sql = 'DELETE FROM "user" WHERE id_user=$1';
    const values = [user_id];
    await db.query(sql, values);
  }

}

export const cartaoCreditoRepository = new CartaoCreditoRepository();
