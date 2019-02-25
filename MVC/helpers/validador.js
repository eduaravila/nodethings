const { body } = require('express-validator/check')
const usuarios_model = require('../models/usuarios')

const validar_registro = [
	body(
		'contraseña',
		'Password invalido agrega por los menos 8 caracteres, ademas de ser alfanumerico'
	)
		.isLength({ min: 8 })
		.exists(),
	body('correo','Correo invalido!')
		.isEmail()
		.custom((value,{req}) =>{
			console.log('correo',value);
			
			return usuarios_model.usuarios
				.findOne({ correo: value+'' })
				.then((res) => res ? Promise.reject('correo ya registrado'):true)
			}
		),
	body('contraseñaR', 'contraseñas distintas!').custom((v, { req }) => {
		console.log(req.body, v !== req.body.contraseñaR)
		if (v+"" !== req.body['contraseña']+"") {
			console.log('distintas')

			return Promise.reject()
		}else{
		return true
		}
	})
]
const validar_producto = [
	body('nombre','Nombre no valido!')
	.exists()
	.isString()	,
	body('disponibles','El minimo debe der 1')
	.exists()
	.isInt()
	.isLength({min:1}),
	body('descripcion')
	.exists()
	.isString()
	,
	body('precio','Precio solo con numeros').isFloat()
	.exists()
	.custom(v => +v >0 ? true: Promise.reject('Precio invalido!',v))
]
module.exports = {
	validar_registro,
	validar_producto
}
