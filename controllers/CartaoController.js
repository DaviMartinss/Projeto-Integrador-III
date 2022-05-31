//import { userRepository } from "../repository/UserRepository.js";

import { cartaoCreditoController } from "./CartaoCreditoController";
import { cartaoDebitoController } from "./CartaoDebitoController";

class CartaoController {

    constructor() { }

    //retorna uma lista de cratão de créedito ou débito
    async getCartaoByType(cartao) {

        try {

            var type = cartao.type;

            var selectCartao;

            if (type == "CC") {
                selectCartao = await cartaoCreditoController.GetCartaoCreditoByUserId(cartao.UserId);
            }
            else {
                selectCartao = await cartaoDebitoController.GetCartaoDebitoByUserId(cartao.UserId);
            }

            res.send(selectCartao);
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    //cadastra cartão de crédito ou débito
    async InsertCartao(cartaoData) {

        try {

            /* TYPE do cartão referente o tipo se CartãoCrédito ou CartãoDébito
         type = "CC" , cartaoCredito
         type = "CD" , cartaoDebito
        */

            //Tipo booleano para saber se o insert teve sucesso
            var insertCartao = false;

            //Assim irá funcionar passando UserId via JSON ou usando a interface
            //Via interface irá entrar e passar o UserId
            if (cartaoData.UserId == undefined) {
                cartaoData.UserId = user.UserId
            }

            if (cartaoData.Type == "CC") {
                //INSERT Cartão de Crédito
                insertCartao = await cartaoCreditoController.InsertCartao(cartaoData);

                if (insertCartao) {
                    //redenrizar TELA DE CARTAO DE CREDITO
                    console.log("CADASTROU");
                } else {
                    //redenrizar TELA DE CADASTRO DE CARTAO CREDITO COM ALERTA DE ERRO
                    console.log("ERRO NO CADASTRO");
                }

            } else {
                //INSERT Cartão de Débito
                insertCartao = await cartaoDebitoController.InsertCartao(cartaoData); // mudar para o controller

                if (insertCartao) {
                    //redenrizar TELA DE CARTAO DE DEBITO
                    console.log("CADASTROU");
                } else {
                    //redenrizar TELA DE CADASTRO DE CARTAO DEBITO COM ALERTA DE ERRO
                    console.log("ERRO NO CADASTRO");
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

            /* TYPE do cartão referente o tipo se CartãoCrédito ou CartãoDébito
             type = "CC" , cartaoCredito
             type = "CD" , cartaoDebito
        */

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
    async DeleteCartao(cartaoData) {
        try {

            /* TYPE do cartão referente o tipo se CartãoCrédito ou CartãoDébito
         type = "CC" , cartaoCredito
         type = "CD" , cartaoDebito
    */

            //Tipo booleano para saber se o DELETE teve sucesso
            var deleteCartao = false;

            if (cartaoData.UserId == undefined) {
                cartaoData.UserId = user.UserId
            }

            if (cartaoData.Type == "CC") {
                //DELETE Cartão de Crédito
                deleteCartao = await cartaoCreditoController.DeleteCartao(cartaoData);

                if (deleteCartao) {
                    //redenrizar TELA DE CARTAO DE CREDITO
                    console.log("Cartão de Crédito deletado com sucesso");
                } else {
                    //redenrizar TELA DE CARTAO CREDITO COM ALERTA DE ERRO
                    console.log("Falha ao deletar o Cartão de Crédito");
                }

            } else {
                //DELETE Cartão de Débito
                deleteCartao = await cartaoDebitoController.DeleteCartao(cartaoData);

                if (deleteCartao) {
                    //redenrizar TELA DE CARTAO DE DEBITO
                    console.log("Cartão de Débito deletado com sucesso");
                } else {
                    //redenrizar TELA DE CARTAO DEBITO COM ALERTA DE ERRO
                    console.log("Falha ao deletar o Cartão de Débito");
                }
            }

        } catch (e) {
            console.log(e);
            return false;
        }

    }
}

export const cartaoController = new CartaoController();