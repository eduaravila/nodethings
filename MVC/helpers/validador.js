const { check } = require('express-validator/check')

const validar_registro = (req, res, next) => {
	console.log('validar')
	check(
		'contraseña',
		'Password invalido agrega por los menos 8 caracteres, ademas de ser alfanumerico'
	)
		.isLength({ min: 8 })
		.exists()
		.custom((v) => {
			if (v !== req.body.contraseñaR) {
				throw new Error('Las contraseñas no coinciden')
			}
		})
		.isAlphanumeric([
			'ar',
			'ar-AE',
			'ar-BH',
			'ar-DZ',
			'ar-EG',
			'ar-IQ',
			'ar-JO',
			'ar-KW',
			'ar-LB',
			'ar-LY',
			'ar-MA',
			'ar-QA',
			'ar-QM',
			'ar-SA',
			'ar-SD',
			'ar-SY',
			'ar-TN',
			'ar-YE',
			'bg-BG',
			'cs-CZ',
			'da-DK',
			'de-DE',
			'el-GR',
			'en-AU',
			'en-GB',
			'en-HK',
			'en-IN',
			'en-NZ',
			'en-US',
			'en-ZA',
			'en-ZM',
			'es-ES',
			'fr-FR',
			'hu-HU',
			'it-IT',
			'ku-IQ',
			'nb-NO',
			'nl-NL',
			'nn-NO',
			'pl-PL',
			'pt-BR',
			'pt-PT',
			'ru-RU',
			'sl-SI',
			'sk-SK',
			'sr-RS',
			'sr-RS@latin',
			'sv-SE',
			'tr-TR',
			'uk-UA'
		])

	check('correo')
		.isEmail()
		.exists()
	next()
}
module.exports = {
	validar_registro
}
