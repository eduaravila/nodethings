const Producto = require('../models/productos').Producto
const productos = new Producto()

const getAgregarProducto = (req,res,next)=> {
    res.render('agregarProducto',{tituloPagina:"Nuevo producto",activeUrl:"/agregarProducto",agregarProducto:true,producto:false})
}

const postNuevoProducto = (req,res,next)=> {
    let {producto} = req.body
    
    productos.agregarProducto(producto)
    
    // exports.productos=productos; // * volver a exportar el arreglo para ver los cambios al agregar un nuevo producto con el formualario
    res.redirect('/')  
}
const getProductos =(req,res,next)=> {
    res.render('productos',{productos:productos.getProductos(),tituloPagina:"productos",activeUrl:"/productos", agregarProducto:false,producto:true})
}

module.exports ={
    getAgregarProducto,
    postNuevoProducto,
    getProductos
};