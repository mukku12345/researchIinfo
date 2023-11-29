const express = require('express');
const router = new express.Router();
const Address = require('../controller/address.controller');

module.exports=app=>{
    router.post('/postAddress', Address.postAddress);
    router.get('/countries', Address.getCountry);
    router.get('/states', Address.getStates);
    router.get('/cities', Address.getCities);

    app.use("/api",router)
    
}
