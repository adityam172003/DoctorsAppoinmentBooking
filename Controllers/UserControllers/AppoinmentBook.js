
const Appoinment = require('../../Schema/Appoinments');
const Doctor = require('../../Schema/Doctor');
const { findOneAndUpdate } = require('../../Schema/User');









exports.bookAppoinment = async (req,res)=>{
    const userId  = req.rootuser._id;

    // taking doctor id from queries 
  
    const doctorId = req.query.doctorId;
    let dt   = new Date();

    let date,month,year;
    date = dt.getDate();
    month=dt.getMonth();
    year = dt.getFullYear();
    console.log(date+'/'+month+'/'+year);
    const Symptoms = req.body.Symptoms;
    
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
        
        if(hr == 1)
        {
            hr=2;
        }
        if(hr ==6)
        {
            res.send('Appoinments are booked');
        }
    }




    await Appoinment.findOneAndUpdate({doctorId,created_at},{$push:{Appoinments:{userId,Symptoms,time:{hour,min}}}})
    .then((u)=>{
        res.send("Appoinment is booked")
    })
    .catch((e)=>{
        res.send(e);
        console.log(e)
        })
    // considering Appoinemnts will be started at 9:00 
    



}


exports.gettDoctors = async(req,res)=>{
    res.status(200).send(await Doctor.find());
}