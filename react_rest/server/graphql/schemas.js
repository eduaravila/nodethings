let { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type testHola {
        text: String!
        edad: Int!
    }
    type holaQuery {
        hola: testHola!
    }
    type resultado {
        numero: Int
    }
    type usuarioCreado {
        _id:ID
    }
    type Mutation {
       sumar(valorUno: Int,valorDos: Int): resultado
       nuevoPost(titulo:String,contenido:String,imagen:String):usuarioCreado
    }
    schema{
        query: holaQuery
        mutation:Mutation
    }
`);
