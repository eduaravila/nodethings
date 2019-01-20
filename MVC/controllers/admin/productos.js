const Producto = require('../../models/productos').Producto
const productos = new Producto()


const getAgregarProducto = (req,res,next)=> {
    res.render('agregarProducto',{tituloPagina:"Nuevo producto",activeUrl:"/agregarProducto",path:'/admin/agregar'})
}

const postNuevoProducto = (req,res,next)=> {
    let {nombre,cantidad,imagen} = req.body
    
    productos.agregarProducto({nombre,cantidad,imagen})
    
    // exports.productos=productos; // * volver a exportar el arreglo para ver los cambios al agregar un nuevo producto con el formualario
    res.redirect('/')  
}

module.exports ={  
    getAgregarProducto, 
    postNuevoProducto,
    productos
};