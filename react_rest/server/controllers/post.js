const postModel = require("../models/post");

const nuevoPost = async (args, context, info) => {
  try {
    console.log("nuevo");

    let { titulo, contenido } = args;
    let nuevoPost = await postModel({
      titulo,
      contenido
    }).save();
    console.log(nuevoPost);
    return { _id: nuevoPost._id.toString() };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  nuevoPost
};
