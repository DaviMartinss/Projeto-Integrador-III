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
    const db = await database.connect();
    const sql = 'UPDATE "cartao_credito" SET'
              + '('
                  + 'num_cartao_credito,'
                  + 'data_fatura,'
                  + 'fatura,'
                  + 'limite,'
                  + 'anuidade,'
                  + 'adicional_juro'
              + ')'
              +' WHERE id_cartao_credito=$6 AND id_user=$7';
    const values = [cartao.NumCartao,
                    cartao.DataFatura,
                    cartao.Fatura,
                    cartao.Limite,
                    cartao.Anuidade,
                    cartao.JurosAdicional,
                    cartao.CartaoCreditoId,
                    cartao.UserId];
    await db.query(sql, values);
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
