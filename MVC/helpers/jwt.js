const jwt = require('jsonwebtoken');

class Token{

    constructor(objeto){
        this.objeto = objeto
        this.token = '';
    }
    crearToken(){
        try{
        return Promise.resolve(jwt.sign(this.objeto,process.env.SECRETO,{expiresIn:'1h'}))
        }
        catch(err){
            return Promise.reject(err)
        }
    }
    static desifrarToken(token = this.token){
        console.log();
        
        try{
            return Promise.resolve(jwt.verify(token,process.env.SECRETO))
        }
        catch(err){
            return Promise.reject(err)
        }
    }

}
module.exports = Token;