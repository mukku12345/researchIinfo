const { isObjectIdOrHexString } = require("mongoose");

const mongoose = require("mongoose")
module.exports = mongoose=>{
    const address = mongoose.Schema({
        country: String ,
        state: [{
            name :String,
            cities:[String]
        }] ,
       
});
    

    const Address = mongoose.model("Address",address);
   
    return {Address}
    
}