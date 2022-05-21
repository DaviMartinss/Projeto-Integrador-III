import { database } from "./db.js";

class CartaoDebitoRepository{

//cadastra um cartão de crédito
  async insertCartao(cartao){
    const db = await database.connect();

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

//update do cartão de crédito
  async updateCartao(cartao){
    try
    {
      const db = await database.connect();
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

    } catch (e) {
      console.log(e);
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

export const cartaoDebitoRepository = new CartaoDebitoRepository();
