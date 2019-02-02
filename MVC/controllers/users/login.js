

const getLogin =(req,res,next)=> {    
    res.render('login',{bienvenida:"Ingresar a la tienda de TUMATADOR",tituloPagina:"Login",activeUrl:"/login",path:'/login'})
}


const postLogin =(req,res,next)=> {
    res.cookie('usuario',{logeado:true});
    res.redirect('/tienda')
}

module.exports ={
    getLogin,
    postLogin
};