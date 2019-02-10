class Mensaje {
    constructor(){
        this.mensaje ={}
    }
    getMensaje(nombre){
        let temporal = !!this.mensaje[nombre] && this.mensaje[nombre]
        console.log('mensaje',this.mensaje[nombre]);
        
        this.mensaje[nombre] = ''
        
        return !!temporal && temporal
    }
    setMensaje(nombre,texto){
        console.log(nombre,texto);
        
    return this.mensaje[nombre]= texto
    }
    existe(nombre){                
    return !!this.mensaje[nombre]
    }
}

module.exports = Mensaje