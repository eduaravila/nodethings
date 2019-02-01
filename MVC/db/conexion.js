const mongoose = require('mongoose');

const conexion = () => mongoose.connect(`mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0-e8ofm.gcp.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })



module.exports = {
    conexion
}