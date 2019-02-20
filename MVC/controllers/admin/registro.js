const validator = require('validator')
const {validationResult} = require('express-validator/check');

const real = require('../../helpers/string')
const usuario_model = require('../../models/usuarios').usuarios
const mensaje_helper = require('../../helpers/mensajes')
let error = new mensaje_helper()

const postRegistro =async (req,res,next)=> {    
    try{
        const errors = validationResult(req);
        console.log('errores',errors.isEmpty());
        
    if (!errors.isEmpty()) {        
        res.status(422).redirect('/registro')
        error.setMensaje('error', errors.array())

    }
            let {correo,usuario,contraseña,contraseñaR} = req.body;                
            let nuevoUsuario= new usuario_model({correo,usuario,contraseña,resetToken:''})
            await nuevoUsuario.save();
            // mail_helper.enviar_mail(correo);
            res.redirect('/')        
        
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
    res.render('registro',{bienvenida:"Registrarse a la mejor plataforma de compras",tituloPagina:"Registro",activeUrl:"/registro",path:'/registro',error: mensaje,validator})    
}



module.exports ={
    postRegistro,
    getRegistro
};