const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const productosSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        unique:true
    },
    precio:{
        type: Number,
        required:true
    },
    imagen:{
        type: String,
        required:true
    },
    disponibles:{
        type:Number,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    autor:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Usuario"
    }
})

const productos = mongoose.model('Producto',productosSchema)

module.exports = {productos}
