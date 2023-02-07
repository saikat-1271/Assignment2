const express=require("express");
const app=express();
app.use(express.json());
const route=require('./controller/api/route'); // connection with route

app.use('/',route);// if find this endpoiint , redirect to controller / api/route
module.exports=app;