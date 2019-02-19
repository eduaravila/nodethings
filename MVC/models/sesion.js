const mongoose = require('mongoose')

const jwt_helper = require('../helpers/jwt')
const Schema = mongoose.Schema

const sesionSchema = new Schema({
    expires:{
        type:Date,
        expires: '30d',
        default:new Date()
    },
    usuario:{
        type:String,        
        unique:true
    }
})

sesionSchema.pre('save',function(next) {
        console.log(this.usuario);
        next()    
})
const sesion = mongoose.model('sesion',sesionSchema)
module.exports= sesion