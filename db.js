const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI) //define db name and connected on mongodb
.then(()=>{
console.log('connected to db');
})
.catch((err)=>{
    console.log(err);
})