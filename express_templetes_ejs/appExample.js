const express = require('express')
const app = express()
const bodyP = require('body-parser')

const PORT = process.env.PORT || 3000

app.set('view engine','pug')
app.use(bodyP.urlencoded({extended:false}))

app.use('/agregarUsuario',(req,res,next)=>{
    res.send('<h1>Agregar un usuario</h1><form action="/usuario" method="POST"><input type="text" name="nombre"><button type="submit">Enviar!</button></form>')
})
app.post('/usuario', (req, res, next) => {
    console.log(req.body);
    
    res.send(`<h1>${JSON.stringify(req.body)}</h1>`)
    // res.send('<h1>Usuario random</h1>')
})

app.use('/', (req, res, next) => {
	// ? si este middleware se pone anstes de usuario este se ejecutara ya que hara un match al tener un '/' la url '/usuario'
	res.send('<h1>Pagina principal</h1>')
	console.log('Utilizando middleware ')
})

app.listen(PORT, () => console.log('escuchando desde el puerto ', PORT))
