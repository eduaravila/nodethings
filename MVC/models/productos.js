
class Producto {
    constructor(){
        this.productos = []
    }
    getProductos () {
        return this.productos;
    }
    
    agregarProducto(producto){
        this.productos.push(producto)
    }
}

module.exports = {
    Producto
}