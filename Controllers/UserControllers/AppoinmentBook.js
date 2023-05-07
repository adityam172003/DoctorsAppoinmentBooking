
const Appoinment = require('../../Schema/Appoinments');
const Doctor = require('../../Schema/Doctor');
const { findOneAndUpdate } = require('../../Schema/User');









exports.bookAppoinment = async (req,res)=>{
    const userId  = req.rootuser._id;

    // taking doctor id from queries 
    

    // get date from body 



    const doctorId = req.query.doctorId;
    let dt   = new Date();

    let date,month,year;
    date = dt.getDate();  // parseInt(req.body.date);
    month=dt.getMonth();
    year = dt.getFullYear();
    console.log(date+'/'+month+'/'+year);
    
    
    if(!Symptoms)res.status(401).send("no symptom");
    // getting expected time 
    const created_at={date,month,year};
    const obj = await Appoinment.findOne({doctorId,created_at:{date,month,year}});
    console.log(obj);
    let time={};
    let hour ,min;   
    if(!obj)
    {
       const n = new Appoinment({doctorId,created_at,Appoinments:[]})
      
      
      
      await n.save()
       .then((o)=>{
           
            hour = 9;
            min  = 0;
            
       })
       .catch((err)=>{
        res.send("err");
        console.log(err); 
       })
    }
    else
    {
        let n  = obj.Appoinments.length;
        

        min =  obj.Appoinments[n-1].time.min;
        hour = obj.Appoinments[n-1].time.hour;
        if(min==0)
        {
            min+=30;
        }
        else
        {
            min=0;
            hour++;
        }
        
        if(hour == 1)
        {
            hr=2;
        }
        if(hour ==6)
        {
           return res.send('Appoinments are booked');
        }
    }

    res.send({hour,min});

    // considering Appoinemnts will be started at 9:00 
    



}


exports.confirmAppoinment = async (req,res)=>{
        const userId = req.rootuser._id;
        // data is going to come from frontend 
        const result = req.body.result;

        let date,month,year;
        let dt   = new Date();

        date = dt.getDate();  // date = parseInt(req.body.date);
        month=dt.getMonth();
        year = dt.getFullYear();

        const doctorId = req.query.doctorId;
        const Symptoms = req.body.Symptoms;
        let hour,min;
        hour = req.body.hour;
        min  = req.body.min;
        const created_at={date,month,year};
     //----------------------------------------------------------------------
        
        if(result == "200")
        {
            await Appoinment.findOneAndUpdate({doctorId,created_at},{$push:{Appoinments:{userId,Symptoms,time:{hour,min}}}})
            .then((u)=>{
            return res.send("Appoinment is booked")
            })
            .catch((e)=>{
                res.send(e);
                console.log(e)
                })
        
        
        }else
        {
            res.send("Not confirmed by user ")
        }
            
     }

   


exports.gettDoctors = async(req,res)=>{
    res.status(200).send(await Doctor.find());
}