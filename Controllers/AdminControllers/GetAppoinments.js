const { parse } = require('dotenv');
const Appoinment  = require('../../Schema/Appoinments')



exports.getAllAppoinments = async  (req,res )=>{
    const doctorId = req.rootDoctor._id;
    let {date,month,year} = req.body;

    date = parseInt(date);
    month = parseInt(month);
    year = parseInt(year);

   // const created_at={date,month,year};
    const obj = await Appoinment.findOne({doctorId ,created_at:{date,month,year}});
 
    res.send(obj.Appoinments)


}