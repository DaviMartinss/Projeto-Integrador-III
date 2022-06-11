import { sendEmailRepository} from "../repository/SendEmailRepository.js";
import aes256 from "aes256";

//Encriptografia
var key = 'bf3c199c2470cb477d907b1e0917c17b';
var cipher = aes256.createCipher(key);

class SendEmailController {

    constructor() {

     }
    
    //Salva a senha enviada para o usuário
    async SavePassword(dados) {

        try {

            dados.newPassword =  cipher.encrypt(dados.newPassword + ''); 

            return await sendEmailRepository.SaveSendEmail(dados);

        } catch (e) {
            
            console.log(e);
            return false;
        }
    }

    //pega a senha enviada para o usuário
    async GetPassawordByUserId(userId) {

        try {

            return await sendEmailRepository.getSendEmailByUserId(userId);

        } catch (e) {

            console.log(e);
            return false;
        }
    }
    
}

export const sendEmailController = new SendEmailController();
