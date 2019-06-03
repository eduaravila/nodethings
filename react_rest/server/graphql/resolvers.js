const postController = require("../controllers/post");

module.exports = {
  hola: () => {
    return {
      text: "Hola mundo",
      edad: 21
    };
  },

  sumar: (args, context, info) => {
    let { valorUno, valorDos } = args;
    return {
      numero: valorDos + valorUno
    };
  },
  nuevoPost: postController.nuevoPost
};
