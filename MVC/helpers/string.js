let _ = require('lodash');
let stringReal = (n)=>{
    return _.isString(n) && n.trim().length > 0;
}
module.exports= {
    stringReal
}