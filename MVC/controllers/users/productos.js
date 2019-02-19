const producto = require('../../models/productos').productos

const getProductos = async (req,res,next)=> {
    try{
        
    let productos = await producto.find({});
    res.render('productos',{productos,tituloPagina:"productos",activeUrl:"/productos", path:'/productos'})
    }
    catch(err){
        console.log(err);
        
    }
}

module.exports ={
    getProductos
};