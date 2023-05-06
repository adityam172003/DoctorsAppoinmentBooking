const express = require("express");
const Authentication = require('../Controllers/UserControllers/Authenticate');
const { DoctorResister, DoctorLogin } = require("../Controllers/AdminControllers/AdminLoginRegister");
const AuthenticationD = require("../Controllers/AdminControllers/AdminAuthentication");
const { getAllAppoinments } = require("../Controllers/AdminControllers/GetAppoinments");

const adminRoutes=express();


adminRoutes.post('/register',DoctorResister);
adminRoutes.post('/login',DoctorLogin);
adminRoutes.get('/appoinments',AuthenticationD,getAllAppoinments);

module.exports = adminRoutes;