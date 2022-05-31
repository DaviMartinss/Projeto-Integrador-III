import { cartaoDebitoRepository } from "../repository/CartaoDebitoRepository.js";

class CartaoDebitoController {

    constructor() { }
    
    //Retorna todos os cartões de débito do usuário
    async GetCartaoDebitoByUserId(userId) {

        try {

            var listCartaoDebito = await cartaoDebitoRepository.getCartaoList(userId);

            if (listCartaoDebito != undefined) {
                return listCartaoDebito;
            }
            else {
                console.log("Não existe cartão de crédito cadastrado para esse usuário");
                return undefined;
            }

        } catch (e) {

            console.log(e);
            return undefined;
        }
    }

    //Cadastra Cartão de Débito
    async InsertCartao(cartaoDebito) {

        try {

            var insertCartaoDebito;

            insertCartaoDebito = await cartaoDebitoRepository.insertCartao(cartaoDebito);

            if (insertCartaoDebito)
                return true;
            else
                return false;

        } catch (e) {
            console.log(e);
            return false;
        }
    }

    //Atualiza um cartão de débito
    async UpdateCartao(cartaoDebito) {
        try {

            var updateCartaoDebito;

            updateCartaoDebito = await cartaoDebitoRepository.updateCartao(cartaoDebito);

            if (updateCartaoCredito)
                return true;
            else
                return false;

        } catch (e) {
            console.log(e);
            return false;
        }
    }

    //deleta um cartão de débito
    async DeleteCartao(cartaoDebito) {
        try {

            var deleteCartaoDebito;

            deleteCartaoDebito = await cartaoDebitoRepository.deleteCartao(cartaoDebito);

            if (deleteCartaoDebito)
                return true;
            else
                return false;

        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

export const cartaoDebitoController = new CartaoDebitoController();
