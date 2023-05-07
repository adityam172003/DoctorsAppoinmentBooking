const mongoose = require("mongoose")
const bcrypt   = require('bcrypt')
const jwt      = require('jsonwebtoken')


const dotenv=require("dotenv");
dotenv.config();
  

const AppoinmentSchema=new mongoose.Schema({
   
    doctorId:{
        type:String,
        required:true
    },
    created_at    : { date:{type:Number},month:{type:Number},year:{type:Number} },

   
    Appoinments:[
        {
            status:{
                type:String,
                required:true 
                ,
                default:"Booked" 
            },
           
            userId:{
                type:String,
                required:true
            },
            Symptoms:{
                type:String,
                
            }

            ,
            time:{

                hour:
                {
                    type:Number,
                    requireed :true
                },
                min : {
                    type:Number
                    ,
                    required:true
                }

                
            }

        }
    ]
  
    

})


 const Appoinment=mongoose.model('APPOINMENTS',AppoinmentSchema);
 module.exports=Appoinment;