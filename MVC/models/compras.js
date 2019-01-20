const fs = require('fs')
const path = require('path')

const rootPath = require('../helpers/rootPath')

class Compra {
	constructor() {
	this.compras = []
	}
	getCompras() {
		return this.productos
	}

	agregarProducto(producto) {
		this.productos.push(producto)
    }
    
	
}

module.exports = {
	Compra
}
