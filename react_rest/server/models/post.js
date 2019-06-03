const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
  titulo: {
    type: String,
    required: true
  },
  imagen: {
    type: String
  },
  contenido: {
    type: String,
    required: true
  }
});

const post = mongoose.model("Post", postSchema);

module.exports = post;
