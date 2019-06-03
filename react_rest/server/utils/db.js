const mongoose = require("mongoose");

const conectar = async () => {
  try {
      console.log(process.env.USUARIODB);
      
    let conexion = await mongoose.connect(
      `mongodb+srv://${process.env.USUARIODB}:${
        process.env.PASSWORDDB
      }@cluster0-tpuel.mongodb.net/test`,
      { useNewUrlParser: true }
    );
    return Promise.resolve(conexion);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = { conectar };
