//import { userRepository } from "../repository/UserRepository.js";

import { cartaoCreditoController } from "./CartaoCreditoController.js";
import { cartaoDebitoController } from "./CartaoDebitoController.js";

class CartaoController {

    constructor() { }

    //pega o id pelo o número
    async getCartaoByNum(cartao) {

        try {

            var type = cartao.Type;

            var selectCartao;

            if (type == "CC") {
                selectCartao = await cartaoCreditoController.GetCartaoCreditoByNum(cartao.NumCartao);
            }
            else {
                
                selectCartao = await cartaoDebitoController.GetCartaoDebitoByNum(cartao.NumCartao);
            }

            return selectCartao;
        } catch (e) {
            console.log(e);
            return false;
        }
    }


    // retorna um cartão pelo o Id
    async getCartaoById(cartao) {

        try {

            var type = cartao.Type;

            var selectCartao;

            if (type == "CC") {
                selectCartao = await cartaoCreditoController.GetCartaoCreditoById(cartao.CartaoCreditoId);
            }
            else {
                selectCartao = await cartaoDebitoController.GetCartaoDebitoByUserId(cartao.UserId);
            }

            return selectCartao;
        } catch (e) {
            console.log(e);
            return false;
        }
    }


    //retorna uma lista de cratão de créedito ou débito
    async getCartaoByType(cartao) {

        try {

            var type = cartao.type;

            var selectCartao;

            if (type == "CC") {
                selectCartao = await cartaoCreditoController.GetCartaoCreditoListByUserId(cartao.UserId);
            }
            else {
                selectCartao = await cartaoDebitoController.GetCartaoDebitoByUserId(cartao.UserId);
            }

            return selectCartao;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    //cadastra cartão de crédito ou débito
    async InsertCartao(cartaoData) {
        
        try {

            if (cartaoData.Type == 'CC') {
                
                return await cartaoCreditoController.InsertCartao(cartaoData);
                
            } else {
                
                return await cartaoDebitoController.InsertCartao(cartaoData);
                
            }

        } catch (e) {
            console.log(e);
            return false;
        }

    }

    //Atualiza um cartão de crédio ou débito
    async UpdateCartao(cartaoData) {
        try {

            var updateCartao = false;

            if (cartaoData.Type == "CC") {
                //UPDATE Cartão de Crédito
                updateCartao = await cartaoCreditoController.UpdateCartao(cartaoData);

                if (updateCartao) {
                    return true;
                } else {
                   return false;
                }

            } else {
                //UPDATE Cartão de Débito
                updateCartao = await cartaoDebitoController.UpdateCartao(cartaoData);

                if (updateCartao) {
                    return true;
                } else {
                   return false;
                }
            }

        } catch (e) {
            console.log(e);
            return false;
        }

    }

    //Deleta um cartão de crédito ou débito
    async DeleteCartao(cartao) {
        try {

            var deleteCartao = false;
            
            if (cartao.Type == 'CC') {
            
                deleteCartao = await cartaoCreditoController.DeleteCartao(cartao);

                if (deleteCartao) {
                    return true;
                    
                } else {
                    return false;
                    
                }

            } else {
                
                deleteCartao = await cartaoDebitoController.DeleteCartao(cartao);

                if (deleteCartao) {
                    return true;
                } else {
                    return false;
                }
            }

        } catch (e) {
            console.log(e);
            return false;
        }

    }
}

export const cartaoController = new CartaoController();
