const sesion_model = require('../models/sesion')
const jwt_helper = require('./jwt')

const volver_index = async (req, res, next) => {
	try {
		let token = req.cookies.sesion
		

		let usuario = await jwt_helper.desifrarToken(token)
		
		let sesion = await sesion_model.findOne({ usuario: usuario.user._id })

		console.log('sesion', sesion)

		if (sesion) {
			
            req.ingreso = true
		

			
		} else {
            req.ingreso = false
	

            
		}
	} catch (err) {
        req.ingreso = false
	  

    }
    next()
}
module.exports = volver_index;
