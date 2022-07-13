import { cartaoDebitoRepository } from "../repository/CartaoDebitoRepository.js";

class CartaoDebitoController {

    constructor() { }

    //Retorna apenas um cartão de Débito pelo o número

    async GetCartaoDebitoByNum(numCartao) {

        try {

            return await cartaoDebitoRepository.getCartaoByNum(numCartao);

        } catch (e) {

            console.log(e);
            return undefined;
        }
    }

    //Retorna apenas um cartão pelo o Id
    async GetCartaoDebitoById(cartaoId) {

        try {

            return await cartaoDebitoRepository.getCartaoById(cartaoId);

        } catch (e) {

            console.log(e);
            return undefined;
        }
    }

    //Retorna todos os cartões de débito do usuário
    async GetCartaoDebitoListByUserId(userId) {

        try {

            var listCartaoDebito = await cartaoDebitoRepository.getCartaoList(userId);

            //verifica se a lista vem NULL
            if (!!listCartaoDebito.length) {
                return listCartaoDebito;
            }
            else {
                //console.log("Não existe cartão de débito cadastrado para esse usuário");
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

            var cartaoExiste = await cartaoDebitoController.GetCartaoDebitoByNum(cartaoDebito.cartaoData.NumCartao);
            if(cartaoExiste != undefined)
                return false;
                
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

            var updateCartaoDebito = false;

            updateCartaoDebito = await cartaoDebitoRepository.updateCartao(cartaoDebito);

            if (updateCartaoDebito)
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
