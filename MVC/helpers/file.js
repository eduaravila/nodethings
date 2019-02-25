const fs = require('fs')

const eliminar_archivo = async (nombre)=>{
    try{
            await fs.unlinkSync(nombre)
            return Promise.resolve('Exito al eliminar el archivo!')
    }
    catch(err){
        return Promise.reject(err)
    }
}

module.exports= {eliminar_archivo}