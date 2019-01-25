const Compra= require('../../models/compras').Compra
const compras = new Compra()

const getCarrito = (req,res,next)=> {
    res.render('carrito',{tituloPagina:'carrito',path:'/carrito',productos:['uno','dos','tres']})
}

const postCarrito = (req,res,next)=> {
    let {id} = req.body
    compras.agregarProducto(id,(resultado) => {
        console.log(resultado);
        res.redirect('/')
    })
    
}

module.exports = {
    compras,
    getCarrito,
    postCarrito
}
