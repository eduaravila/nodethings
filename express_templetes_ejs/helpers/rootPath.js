const path = require('path')
module.exports = path.dirname(process.mainModule.filename);
// ? retorna el nombre la carpeta del archivo que se ejecuta al dar node "nombreArchivo.js" lo que se conoce como modulo principal o el archivo que se encarga de importar los archivos que se ejecutan a lo largo del programa