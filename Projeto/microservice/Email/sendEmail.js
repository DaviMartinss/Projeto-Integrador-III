import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");
import smtp from "./smtp.js";
import SMTP_CONFIG from "./smtp.js";

const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: true,
    auth: {
        user:SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass,
    },
    tls: {
        rejectUnauthorized: false,
      },
});
class SendMailBemVindo {
    async run(user, email){

        //console.log("Em msg", msg, "em email", email);
        const mailSent = await transporter.sendMail({
            text: "Olá, " +user+". Seja bem-vindo ao nosso Sistema de controle financeiro.",
            subject: "Seja Bem-Vindo ao pedemeia",
            from: "Pedemeia <testeufcweb@gmail.com>",
            to: [email],
        });
        console.log(mailSent);
        
    }
}

class SendMail {
    async run(msg, email){ 

        const mailSent = await transporter.sendMail({
            text: "Olá,\nParece que você esqueceu a sua senha do pedemeia. Caso tenha sido você, segue a sua senha: \n\n\t\tSENHA: " + msg +"\n\nDo contrário, recomendamos urgentemente que altere sua senha para uma nova e mais segura, de preferência, alguma que possua maiúsculas, minúsculas, dígitos e caracteres especiais como: '#', '$', '%' por exemplo.",
            subject: "ATENÇÃO - Recuperação de Senha",
            from: "Pedemeia <testeufcweb@gmail.com>",
            to: [email],
        });
        console.log(mailSent);
    }
}

export const sendMail = new SendMail();
export const sendMailBemVindo = new SendMailBemVindo();