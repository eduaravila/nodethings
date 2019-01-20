const productos = require('../admin/productos').productos

const getProductos =(req,res,next)=> {
    res.render('productos',{productos:productos.getProductos(),tituloPagina:"productos",activeUrl:"/productos", path:'/productos'})
}

module.exports ={
    getProductos
};