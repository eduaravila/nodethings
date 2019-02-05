const real = require('../../helpers/string')
const jwt_helper = require('../../helpers/jwt')
const usuario_model = require('../../models/usuarios').usuarios
const postRegistro =async (req,res,next)=> {    
    try{
    let {correo,usuario,contraseña,contraseñaR} = req.body;        
        if(real.stringRealArreglo([correo,usuario,contraseña,contraseñaR])){    
            let nuevoUsuario= new usuario_model({correo,usuario,contraseña})
            await nuevoUsuario.save();
            res.redirect('/')
        }
        else{
            res.redirect('/registro')
        }
    }
    catch(err){
        console.log(err);
        
        res.redirect('404');
    }
}
const getRegistro =(req,res,next)=> {     
    res.render('registro',{bienvenida:"Registrarse a la mejor plataforma de compras",tituloPagina:"Registro",activeUrl:"/registro",path:'/registro'})    
}



module.exports ={
    postRegistro,
    getRegistro
};