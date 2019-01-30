const mongoose = require('mongoose');

const conexion = () => mongoose.connect('mongodb+srv://TUMATADOR:mansanita321@cluster0-e8ofm.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })



module.exports = {
    conexion
}