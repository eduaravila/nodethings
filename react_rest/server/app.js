const express = require("express");
const app = express();
const expressQL = require("express-graphql");
const bp = require("body-parser");

const db = require("./utils/db");
const schemaQL = require("./graphql/schemas");
const resolverQL = require("./graphql/resolvers");

const PORT = process.env.PORT || 3000;
app.use(bp.json({ extended: true }));
app.use(bp.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //* dominios por donde se permite el acceso
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,DELETE,UPDATE,PUT"); //* metodos permitidos por el cliente
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization"); //* dominios por donde se permite el acceso
  next()
});
app.use(
  "/graphql",
  expressQL({
    schema: schemaQL,
    rootValue: resolverQL,
    graphiql: true,
    customFormatErrorFn(err) {
      return {
        code: err.code,
        msg: err.msg,
        path: err.path
      };
    }
  })
);

db.conectar()
  .then(result => {
    app.listen(PORT, () =>
      console.log(`Aplicacion escuchando por el puerto ${PORT}`)
    );
  })
  .catch(err => {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
  });
