import { cartaoCreditoRepository } from "../repository/CartaoCreditoRepository.js";

class CartaoCreditoController {

    constructor() { }

    // Retorna um cartão pelo o número

    async GetCartaoCreditoByNum(numCartao) {

        try {
            
            return await cartaoCreditoRepository.getCartaoByNum(numCartao);

        } catch (e) {

            console.log(e);
            return undefined;
        }
    }

    //Retorna apenas um cartão pelo o Id
    async GetCartaoCreditoById(cartaoId) {

        try {
            
            return await cartaoCreditoRepository.getCartaoById(cartaoId);

        } catch (e) {

            console.log(e);
            return undefined;
        }
    }

    //Retorna todos os cartões de crédito do usuário
    async GetCartaoCreditoListByUserId(userId) {

        try {

            var listCartaoCredito = await cartaoCreditoRepository.getCartaoList(userId);

            if (!!listCartaoCredito.length) {
                return listCartaoCredito;
            }
            else {
                //console.log("Não existe cartão de crédito cadastrado para esse usuário");
                return undefined;
            }

        } catch (e) {

            console.log(e);
            return undefined;
        }
    }

    //Cadastra Cartão de Crédito
    async InsertCartao(cartaoCredito) {

        try {

            var insertCartaoCredito = await cartaoCreditoRepository.insertCartao(cartaoCredito);

            if (insertCartaoCredito)
                return true;
            else
                return false;

        } catch (e) {
            console.log(e);
            return false;
        }
    }

    //Atualiza um cartão de crédito
    async UpdateCartao(cartaoCredito) {
        try {

            var updateCartaoCredito;

            updateCartaoCredito = await cartaoCreditoRepository.updateCartao(cartaoCredito);

            if (updateCartaoCredito)
                return true;
            else
                return false;

        } catch (e) {
            console.log(e);
            return false;
        }
    }

    //deleta um cartão de crédito
    async DeleteCartao(cartaoCredito) {
        try {

            var deleteCartaoCredito;

            deleteCartaoCredito = await cartaoCreditoRepository.deleteCartao(cartaoCredito);

            if (deleteCartaoCredito)
                return true;
            else
                return false;

        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

export const cartaoCreditoController = new CartaoCreditoController();
