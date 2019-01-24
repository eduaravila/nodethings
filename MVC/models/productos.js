const fs = require('fs')
const path = require('path')

const rootPath = require('../helpers/rootPath')

class Producto {
	constructor() {
		this.imagenDefecto ="https://upload.wikimedia.org/wikipedia/commons/f/f0/GHS-pictogram-unknown.svg"
		fs.readFile(path.join(rootPath, 'data', 'productos.json'), (err, res) => {
			if (err) {
				this.productos = []
				fs.mkdir(
					path.join(rootPath, 'data'),
					(error) =>
						!error &&
						fs.writeFile(
							path.join(rootPath, 'data', 'productos.json'),
							[],
							(e, r) => !!e && console.log('erro', e)
						)
				)
			} else {
				this.productos = JSON.parse(res)
			}
		})
	}
	getProductos() {
		return this.productos
	}

	agregarProducto({nombre,precio,cantidad,imagen}) {
		imagen = !!imagen ? imagen : this.imagenDefecto;
		this.productos.push({nombre,precio,cantidad,imagen,id:Math.random()})
		fs.writeFile(
			path.join(rootPath, 'data', 'productos.json'),
			JSON.stringify(this.productos),
			(e, r) => {
				console.log('error', e)
			}
		)
	}
	obtenerProducto(id,cb){
		
		
		 cb(this.productos.find(i=> i.id == id))
	}
}

module.exports = {
	Producto
}
