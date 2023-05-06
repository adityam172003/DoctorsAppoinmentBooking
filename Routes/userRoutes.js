const express = require("express");
const Authentication = require('../Controllers/UserControllers/Authenticate')

const userRoutes =express();
const {bookAppoinment, gettDoctors}=  require('../Controllers/UserControllers/AppoinmentBook')
const {
    userLogin,
    userResister,
    userLogout,
    getUser 

} = require('../Controllers/UserControllers/UserLoginRegister')


userRoutes.post('/register',userResister);


userRoutes.post('/login',userLogin);


// userRouter.put('/updateprofile',Authentication,userProfileUpdate)


userRoutes.get('/logout',Authentication,userLogout);

userRoutes.get('/getuser',Authentication,getUser);


userRoutes.get('/bookapp',Authentication,bookAppoinment)



userRoutes.get('/doctors',gettDoctors);








module.exports = userRoutes;