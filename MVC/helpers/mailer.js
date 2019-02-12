const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.API_MAIL);
const enviar_mail = ({mail,subject,text,html}) =>{
 
    let mensaje = {
  to: mail,
  from: process.env.MAIL,
  subject,
  text,
  html
};
sgMail.send(mensaje)
}

module.exports ={
    enviar_mail
}