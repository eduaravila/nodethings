const http = require('http')

const PORT = process.env.PORT || 3000;
let usuarios = ["Eduardo","Fernando","Panchita"]


const server =http.createServer((req,res)=>{
    let {url,method} = req;
    
    let datos =[]
    if(url ==='/'){
        res.setHeader('ContentType','text/html')
        res.write('<html><head> <title>TU MATADOR</title></head><body><h1>Hola desde el servidor de inicio</h1>')
        res.write('<form method ="POST" action="/nuevoUsuario"><input type="text" name="usuario"><button type="submit">Enviar</button></form><a href="usuarios">Usuarios</a><body></html>')
        res.end()
    }
    if(url=== "/nuevoUsuario" && method ==='POST'){
        req.on('data',(chunck)=>{   
            datos.push(chunck);
        })
        return req.on('end',()=> {
            let decodificado = Buffer.concat(datos).toString()
            let valor = decodificado.split('=')[1];
            console.log(valor);
            usuarios.push(valor)
            console.log(usuarios);
            res.statusCode = 302
            res.setHeader('Location','/')
            res.end()
        })
    }
    if(url === '/usuarios'){
        console.log(usuarios);
        res.setHeader('ContentType','text/html')
        res.write('<html><head> <title>TU MATADOR</title></head><body><h1>Hola desde el servidor de inicio</h1>')
        res.write('<ul>')
        usuarios.map(i=> res.write(`<li>${i}</li>`))
        res.write('</ul>')
        res.write('<a href="/">Volver</a></body></html>')
        res.end()
    }


})


server.listen(PORT,()=> console.log('Escuchando desde',PORT))

