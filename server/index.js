const express = require('express')
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const db = require('./model');
const cors = require('cors');


app.use(cors());

const port = process.env.PORT || 8085 ;
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
db.mongoose.connect(db.url).then(()=>{
  console.log("connected to mongodb Atlas server")
}).catch(err=>{
  console.log("Not connected ",err)
})

require("./routes/user.routes")(app);
require("./routes/address.routes")(app);
app.listen(port,()=>{
  
 console.log("server is running")

})
