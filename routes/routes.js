const express=require('express');
const router=express.Router();
const generateOtpController=require('../controller/generateOtpController');
router.post('/generateOtp',generateOtpController.generateOtp);
module.exports=router;