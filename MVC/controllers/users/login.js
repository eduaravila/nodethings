const real = require('../../helpers/string')
const jwt_helper = require('../../helpers/jwt')
const usuario_model = require('../../models/usuarios').usuarios
const sesion_model = require('../../models/sesion')
const getLogin =(req,res,next)=> {    
    res.render('login',{bienvenida:"Ingresar a la tienda de TUMATADOR",tituloPagina:"Login",activeUrl:"/login",path:'/login'})
}


const postLogin =async (req,res,next)=> {
    try{
    let {usuario, contraseña} = req.body;
    if(real.stringReal(usuario) && real.stringReal(contraseña)){
    let user = await usuario_model.findOne({$or:[{correo:usuario,contraseña:contraseña},{usuario:usuario,contraseña:contraseña}]})
    console.log('usuario --->',user);
    let sesion = await new jwt_helper({user}).crearToken()
    res.cookie('sesion',sesion)
    await new sesion_model({usuario:user._id}).save()
    if(user){
    res.redirect('/tienda')
    }
    else{
        res.redirect('/login')
    }
    }
    else{
        console.log('entradas invalidad');
        res.redirect('/login')
    }
}
catch(err){
    console.log(err);
    res.redirect('/login')
}
}

module.exports ={
    getLogin,
    postLogin
};