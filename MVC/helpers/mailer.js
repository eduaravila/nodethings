const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.API_MAIL);
const enviar_mail = (mail) =>{
 
    let mensaje = {
  to: mail,
  from: process.env.MAIL,
  subject: 'BIENVENIDO',
  text: 'Gracias por registrarte a la plataforma',
  html: '<strong>Ir a la plataforma http://localhost:3000 </strong>',
};
sgMail.send(mensaje)
}

module.exports ={
    enviar_mail
}