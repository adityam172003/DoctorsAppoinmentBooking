
const Doctor = require('../../Schema/Doctor');


const bcrypt = require('bcrypt')

const jwt      = require('jsonwebtoken')



exports.DoctorResister= async (req,res) =>{

     const {name,phone,email,password,Specialist} = req.body;
     
   

    if(!name||!phone||!email||!password||!Specialist)    
    {
       return res.status(400).send("enter the data first ");
    }

    const obj = await Doctor.findOne({email});
            
    if(obj)
    {
      
       return res.status(409).send("already resgistrerd"); 

    }

    const newDoctor =  await new Doctor({name,phone,email,password,Specialist});
 
   
   
  
     await newDoctor.save()
     .then(async(use)=>{
   

 

 
       res.status(200).send("Doctor rigistered successfully");
     })
     .catch((err)=>{
        console.log(err);
        res.status(500).send("internal server error");
     })


}





exports.DoctorLogin = async (req,res) =>{

    const {email,password} = req.body;

    console.log(req.body)

    if(!email||!password)
    {
        return res.status(400).json({message:"enter the data first "});
    }
    const us = await Doctor.findOne({email})
    
    if(us)
    {

    
     const isMatch = await bcrypt.compare(password,us.password);
 
        if(!isMatch)
        {
            return res.status(401).send("incorrect password")
        }



     const token= await us.generateAuthToken() 

 

    res.cookie("jwtoken",token,{
      
        expires:new Date(Date.now()+25892000000),
        httpOnly:true   
    }); 

   
     
      
    (token)?res.status(200).send({
   
              message:"login success" 
    }).status(200):res.status(500).json({message:"internal server error"});


    
    }else{
     res.status(404).send({message:"user not found please register first"})
 
    }
  
}




exports.DoctorLogout = async (req,res)=>{
    try{

        res.cookie('jwtoken','', {maxAge: 1});
        res.status(200).json({message:"token deleted"});
    }
    catch(err)
    {
        res.status(500).json({mess:"internal server error"})
    }
}


exports.getDoctor = async(req,res)=>{
    res.status(200).send(req.rootuser);
}
