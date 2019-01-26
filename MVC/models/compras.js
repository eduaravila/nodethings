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
				this.total = 0
				fs.writeFile(
					path.join(rootPath, 'data', 'compras.json'),
					'[]',
					(e, r) => !!e && console.log('erro', e)
				)
			} else {
				let { compras, total } = JSON.parse(res)
				this.compras = !!compras ? compras : []
				this.total = !!total ? total : 0;
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
					
					this.compras = [...this.compras]

					this.total = +this.total + +producto.precio
				} else {
					existente = { id: producto.id, qty: 1 }
					this.compras = [...this.compras, existente]

					this.total = +this.total + +producto.precio
					this.total = (this.total).toFixed(2)
				}
				fs.writeFile(
					path.join(rootPath, 'data', 'compras.json'),
					JSON.stringify({ compras: this.compras, total: this.total }),
					(e, r) => {
						if (e) {
							console.log('error', e)
							cb({})
						} else {
							cb({ compras: this.compras, total: this.total })
						}
					}
				)
			}
		})
	}
	obtenerCompras() {
		return this.compras
	}

	traducirCompras(cb) {
		fs.readFile(
			path.join(rootPath, 'data', 'productos.json'),
			(err, res) => {
				if (err) {
					cb({ mensaje: 'Error al leer el archivo de productos' },[])
				}
				res = JSON.parse(res)
				console.log('this compras',this.compras,res);
				
				if(res.length >0 && this.compras.length>0){
				cb(null,
					[...this.compras.map((i) =>{ 
						
						let{nombre,precio}= res.find(e => e.id == i.id)
						return {nombre,precio,qty:i.qty,id:i.id}
					} )]
					)
				}
				else{
					cb({ mensaje: 'Error al leer el archivo de productos' },[])
				}
			}
		)
	}

	eliminarProducto(id,cb){
		this.traducirCompras((error,resultado )=> {
			console.log('resultado',resultado);
			
			let totalProducto = resultado.reduce((suma,i) => i.id == id ? suma+ (+i.precio * +i.qty) : 0,0)
			console.log('eliminar',totalProducto);

			this.compras = this.compras.filter(i=> i.id != id)

		this.total -= +totalProducto;
	this.total = (+this.total).toFixed(2)
		fs.writeFile(
			path.join(rootPath, 'data', 'compras.json'),
			JSON.stringify({ compras: this.compras, total: this.total }),
			(e, r) => {
				if (e) {
					console.log('error', e)
					cb({})
				} else {
					cb({ compras: this.compras, total: this.total })
				}
			}
		)
		})
		
	}
	obtenerTotal() {
		return (+this.total).toFixed(2)
	}
}

module.exports = {
	Compra
}
