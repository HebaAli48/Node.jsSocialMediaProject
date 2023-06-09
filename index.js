const express = require('express');
const path=require('path');
const app = express();
const morgan = require('morgan');
const userRoutes=require('./routes/userRoutes');
const postRoutes=require('./routes/postRoutes');
const commentRoutes=require('./routes/commentRoutes');
const reviewRoutes=require('./routes/reviewRoutes');
require('dotenv').config()

const mongoose = require('mongoose');
require('./db.js'); //run the file db.js and connect with mongodb
require('express-async-errors');

const port = 3000;
 //parsing the return body
 app.use(express.json());
 app.use(express.urlencoded());

 // // morgan
// app.use(morgan('combined'))
// app.use(morgan('dev'))
// app.use(morgan('tiny'))

// C:\Users\LENOVO\Postman\files
//use routes 
app.use('/users',userRoutes)
app.use('/posts',postRoutes)
app.use('/comments',commentRoutes)
app.use('/reviews',reviewRoutes)


//global error handeling


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    res.status(statusCode).send({
        status:statusCode,
        message:err?.message||'internal server error',
        errors:err?.errors||[]
    })
})
//mongoose connect

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})