//import { userRepository } from "../repository/UserRepository.js";

import { cartaoCreditoController } from "./CartaoCreditoController.js";
import { cartaoDebitoController } from "./CartaoDebitoController.js";

class CartaoController {

    constructor() { }

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
        console.log(cartaoData);
        try {

            //Tipo booleano para saber se o insert teve sucesso
            var insertCartao = false;

            if (cartaoData.cartaoData.Type == 'CC') {
                //INSERT Cartão de Crédito
                
                insertCartao = await cartaoCreditoController.InsertCartao(cartaoData);

                if (insertCartao) {
                    //redenrizar TELA DE CARTAO DE CREDITO
                    
                    return true;
                } else {
                    //redenrizar TELA DE CADASTRO DE CARTAO CREDITO COM ALERTA DE ERRO
                    console.log("ERRO NO CADASTRO");
                    return false;
                }

            } else {
                //INSERT Cartão de Débito
                insertCartao = await cartaoDebitoController.InsertCartao(cartaoData); // mudar para o controller

                if (insertCartao) {
                    //redenrizar TELA DE CARTAO DE DEBITO
                    return true;
                } else {
                    //redenrizar TELA DE CADASTRO DE CARTAO DEBITO COM ALERTA DE ERRO
                    console.log("ERRO NO CADASTRO");
                    return false;
                }
            }

        } catch (e) {
            console.log(e);
            return false;
        }

    }

    //Atualiza um cartão de crédio ou débito
    async UpdateCartao(cartaoData) {
        try {

            //Tipo booleano para saber se o UPDATE teve sucesso
            var updateCartao = false;

            //Assim irá funcionar passando UserId via JSON ou usando a interface
            //Via interface irá entrar e passar o UserId
            if (cartaoData.UserId == undefined) {
                cartaoData.UserId = user.UserId
            }

            if (cartaoData.Type == "CC") {
                //UPDATE Cartão de Crédito
                updateCartao = await cartaoCreditoController.UpdateCartao(cartaoData);

                if (updateCartao) {
                    //redenrizar TELA DE CARTAO DE CREDITO
                    console.log("Cartão de Crédito atualizado com sucesso");
                } else {
                    //redenrizar TELA DE UPDATE DE CARTAO CREDITO COM ALERTA DE ERRO
                    console.log("Falha ao atualizar o Cartão de Crédito");
                }

            } else {
                //UPDATE Cartão de Débito
                updateCartao = await cartaoDebitoController.UpdateCartao(cartaoData);

                if (updateCartao) {
                    //redenrizar TELA DE CARTAO DE DEBITO
                    console.log("Cartão de Crédito atualizado com sucesso");
                } else {
                    //redenrizar TELA DE UPDATE DE CARTAO DEBITO COM ALERTA DE ERRO
                    console.log("Falha ao atualizar o Cartão de Crédito");
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
