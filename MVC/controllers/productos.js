const productos = require('../models/productos').productos

const getAgregarProducto = (req,res,next)=> {
    res.render('agregarProducto',{tituloPagina:"Nuevo producto",activeUrl:"/agregarProducto",agregarProducto:true,producto:false})
}

const postNuevoProducto = (req,res,next)=> {
    let {producto} = req.body
    
    productos.push(producto)
    
    // exports.productos=productos; // * volver a exportar el arreglo para ver los cambios al agregar un nuevo producto con el formualario
    res.redirect('/')  
}
const getProductos =(req,res,next)=> {
    console.log('productos',productos);    
    res.render('productos',{productos,tituloPagina:"productos",activeUrl:"/productos",largo:productos.length, agregarProducto:false,producto:true})
}

module.exports ={
    getAgregarProducto,
    postNuevoProducto,
    getProductos
};