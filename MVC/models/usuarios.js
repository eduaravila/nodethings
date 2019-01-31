const mongoose = require('mongoose')
const productos = require('./productos').productos
const Schema = mongoose.Schema
const usuariosSchema = new mongoose.Schema({
	alias: {
		type: String,
		required: true
	},
	mail: {
		type: String,
		required: true
	},
	carrito: {
		items: {
			type: [
				{
					id: { type: Schema.Types.ObjectId, required: true, ref: 'Producto' },
					qty: { type: Number, required: true }
				}
			]
		},
		caduca: {
			type: Date,
			required: true
		},
		total: {
			type: Number,
			required: true
		}
	}
})

const buscarProducto = async (id) => {
	return await productos.findById(id)
}
usuariosSchema.virtual('traducirCarro').get(async function() {
	let res = await productos.find()
	console.log(res,this.carrito);
	
	if (res.length > 0 && this.carrito.items.length > 0) {
		return [
			...this.carrito.items.map((i) => {												
				let { nombre, precio } = res.find((e) => e._id.toString() == i.id.toString())
				return { nombre, precio, qty: i.qty, id: i.id }
			})
		]
	}
	else{
		return []
	}
})
usuariosSchema.methods.eliminarProducto =function(id,resultado){	
		console.log('resultado',resultado,'id',id);
		
		let totalProducto = resultado.reduce((suma,i) => i.id.toString() == id.toString() ? suma+ (+i.precio * +i.qty) : 0,0)		
		this.carrito.items = this.carrito.items.filter(i=> i.id.toString() != id.toString())
		this.carrito.total =  +this.carrito.total - +totalProducto;
		this.carrito.total = (+this.carrito.total).toFixed(2)
		console.log('this.carrito',this.carrito,);
		
		return this.save() 
}
usuariosSchema.methods.agregarCarro = async function(id) {
	let producto = await buscarProducto(id)
	console.log(producto)
	let indice = this.carrito.items.findIndex((i) => i.id == id)

	let existente = this.carrito.items[indice]
	if (existente) {
		this.carrito.items[indice].qty = existente.qty + 1

		this.carrito.items = [...this.carrito.items]

		this.carrito.total = +this.carrito.total + +producto.precio
	} else {
		existente = { id: producto.id, qty: 1 }
		this.carrito.items = [...this.carrito.items, existente]

		this.carrito.total = +this.carrito.total + +producto.precio
		this.carrito.total = this.carrito.total.toFixed(2)
	}
	return this.save()
}
const usuarios = mongoose.model('Usuario', usuariosSchema)

module.exports = {
	usuarios
}
