const fs = require('fs')
const path = require('path')
const rootPath = require('../helpers/rootPath')

const productosArchivo = path.join(rootPath, 'data', 'productos.json')

class Compra {
	constructor() {
		fs.readFile(path.join(rootPath, 'data', 'compras.json'), (err, res) => {
			if (err) {
				console.log(err)
				this.compras = []
				this.total = 0;			
						fs.writeFile(
							path.join(rootPath, 'data', 'compras.json'),
							'[]',
							(e, r) => !!e && console.log('erro', e)
						)
				
			} else {
				let {compras,total} = JSON.parse(res)
				this.compras = compras;
				this.total = total;
			}
		})
		// this.obtenerProducto = this.obtenerProducto.bind(this)
	}
	getCompras() {
		return this.compras
	}

	_obtenerProducto(id, cb) {
		fs.readFile(productosArchivo, (err, res) => {
			if (err) {
				cb(err)
			} else {
				let resultado = JSON.parse(res)
				resultado = resultado.find((i) => i.id == id)

				cb(null, resultado)
			}
		})
	}

	agregarProducto(id, cb) {
		this._obtenerProducto(id, (err, producto) => {
			if (err) {
				return null
			} else {
				let indice = this.compras.findIndex((i) => i.id == id)
				let existente = this.compras[indice]
				if (existente) {
					this.compras[indice] = {
						...this.compras[indice],	
						qty: existente.qty + 1
					}
					let total = +this.compras.total
					this.compras = [...this.compras]

					this.total+= +producto.precio
					
				} else {
					existente = { id: producto.id, qty: 1 }
					this.compras = [...this.compras, existente]

					this.total = this.total + +producto.precio
					
				}
				fs.writeFile(
					path.join(rootPath, 'data', 'compras.json'),
					JSON.stringify({compras:this.compras,total:this.total}),
					(e, r) => {
						if(e){
						console.log('error', e)
						cb({})
						}
						else{
							cb({compras:this.compras,total:this.total})
						}
					}
				)
			}
			
		})
	}
}

module.exports = {
	Compra
}
