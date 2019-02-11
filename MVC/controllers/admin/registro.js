const real = require('../../helpers/string')
const jwt_helper = require('../../helpers/jwt')
const usuario_model = require('../../models/usuarios').usuarios
const mensaje_helper = require('../../helpers/mensajes')
const mail_helper = require('../../helpers/mailer')
let error = new mensaje_helper()

const postRegistro =async (req,res,next)=> {    
    try{
    let {correo,usuario,contraseña,contraseñaR} = req.body;        
        if(real.stringRealArreglo([correo,usuario,contraseña,contraseñaR])){    
            let nuevoUsuario= new usuario_model({correo,usuario,contraseña})
            await nuevoUsuario.save();
            mail_helper.enviar_mail(correo);
            res.redirect('/')
        }
        else{
            error.setMensaje('error', 'Entradas invalidas!')
            res.redirect('/registro')
        }
    }
    catch(err){
        console.log(err);
        let mensaje = !!err.message && err.message + (!!err.errmsg && err.errmsg);
        error.setMensaje('error', mensaje)
        res.redirect('/registro');
    }
}
const getRegistro =(req,res,next)=> {     
    let mensaje = null

		if (error.existe('error')) {
			mensaje = error.getMensaje('error')
		}
    res.render('registro',{bienvenida:"Registrarse a la mejor plataforma de compras",tituloPagina:"Registro",activeUrl:"/registro",path:'/registro',error: mensaje})    
}



module.exports ={
    postRegistro,
    getRegistro
};