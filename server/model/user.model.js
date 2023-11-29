const { isObjectIdOrHexString } = require("mongoose");

const mongoose = require("mongoose")
module.exports = mongoose=>{
    const user = mongoose.Schema({
        firstName: {
            type:String,
            required:true,
        } ,
        lastName: {
            type:String,
            required:true,
        } ,
        email: {
            type:String,
            required:true
        } ,
        country :  {
            type:String,
            required:true
        }  ,
        state :  {
            type:String,
            required:true
        }  ,
        city : {
            type:String,
            required:true
        } ,
        gender:{
            type : String,
            required : true,
        },
        dob:{
        type: Date,
        required: true,
    },
        age:Number
});
    

    const User = mongoose.model("User",user);
   
    return {User}
    
}