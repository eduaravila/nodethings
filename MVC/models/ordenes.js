const mongoose = require('mongoose')
const schema = mongoose.Schema

const ordenesSchema = new schema({
	usuario: {
		type: String,
		required: true,
		ref: 'Usuario'
	},
	productos: {
		type: [
			{
				nombre: {
					type: String,
					required: true
				},
				qty: {
					type: Number,
					required: true
				},
				precio: {
					type: Number,
					required: true
				}
			}
		],
		required: true
	},
	inicio: {
		type: Date,
		required: true
	},
	fin: {
		type: Date,
		required: true
	}
})

const pedidos = mongoose.model('Orden',ordenesSchema)

module.exports = {
    pedidos
}