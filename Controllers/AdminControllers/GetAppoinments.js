const Appoinment  = require('../../Schema/Appoinments')



exports.getAllAppoinments = async  (req,res )=>{
    const doctorId = req.rootDoctor._id;
    let {date,month,year} = req.body;
  
   // const created_at={date,month,year};
    const obj = await Appoinment.findOne({doctorId});

    res.send(obj.Appoinments)


}