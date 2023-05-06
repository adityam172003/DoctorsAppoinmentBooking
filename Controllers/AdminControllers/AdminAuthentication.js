
const jwt=require('jsonwebtoken');
const Doctor =require('../../Schema/Doctor');




const AuthenticationD= async (req,res,next)=>{
try{
    console.log("Doctor authentication calles")
    const token=req.cookies.jwtoken;
   
    
    
    const verifyToken = jwt.verify(token,process.env.JWT_PASS) ;
    
    const rootDoctor = await Doctor.findOne({_id:verifyToken._id,"tokens.token":token});

    if(!rootDoctor){
        throw new Error("user not found")

    }
    req.token=token;
    req.rootDoctor=rootDoctor;

    req.rootDoctorId=rootDoctor._id;


    next();
     
}catch(err){
    console.log("in the backend catch")
    res.status(401).send('Unauthorized : Not Token provided')

    console.log(err);

}


}



module.exports= AuthenticationD;