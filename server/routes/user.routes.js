const express = require('express');
const router = new express.Router();
const User = require('../controller/user.controller');

module.exports=app=>{
    router.post('/registraion', User.registration);   
    router.get('/userlist', User.getuserList);   
    app.use("/api",router)
    
}
