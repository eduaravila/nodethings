const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
	console.log(req.method, req.url)

	if (req.url === '/') {
		res.setHeader('contentType', 'text/html')
		res.write(
			'<html><head><body><form action="/mensaje" method="POST"><input type="text" name="saludo"> <button type="submit">Enviar</button></form></body></head></html>'
		)
		return res.end('terminar') // ? si la url es / retorna end para no ejecutar el codigo continua despues de la condicion
	}
	if (req.url === '/mensaje') {
		const informacion = []
		req.on('data', (chunck) => {
			informacion.push(chunck)
		})

		req.on('end', (chunck) => {
            let mensaje = Buffer.concat(informacion).toString()
            fs.writeFileSync('Saludos.txt',mensaje)
		})

		res.statusCode = 302
		res.setHeader('Location', '/')
		return res.end()
	}
	res.setHeader('contentType', 'text/html')
	res.write(
		'<html><head><body><h1>Hola desde el servidor http</h1></body></head></html>'
	)
	res.end('terminar')
})

server.listen(3000, () => console.log('escuchando desde 3000'))
