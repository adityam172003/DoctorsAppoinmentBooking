require('./DB/Connect')
const express = require("express");
const cookieparser = require('cookie-parser')
const app     = express();

app.use(express.json())
app.use(cookieparser())

const dotenv=require("dotenv");
dotenv.config();
const Port = process.env.PORT;
const userRoutes= require('./Routes/userRoutes');
const adminRoutes =require('./Routes/AdmimRoutes');


app.use('/user',userRoutes);
app.use('/admin',adminRoutes);

app.get("/",(req,res)=>{
    res.send("from express server ")

})


app.listen( Port , ()=>{
    console.log("server is running on port number ",Port)
})



