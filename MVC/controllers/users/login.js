const real = require('../../helpers/string')
const jwt_helper = require('../../helpers/jwt')
const getLogin =(req,res,next)=> {    
    res.render('login',{bienvenida:"Ingresar a la tienda de TUMATADOR",tituloPagina:"Login",activeUrl:"/login",path:'/login'})
}


const postLogin =(req,res,next)=> {
    let {usuario, contraseña} = req.body;
    if(real.stringReal(usuario) && real.stringReal(contraseña)){
    new jwt_helper({usuario,contraseña,logeado:true}).crearToken()
    .then((resultado) => {
        res.cookie('usuario',resultado)
        res.redirect('/tienda')
    })
    .catch(err => {
        console.log(err);        
    })
    
    }
    else{
        console.log('entradas invalidad');
        
    }
}

module.exports ={
    getLogin,
    postLogin
};