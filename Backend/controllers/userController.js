const Us =require('../models/userModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const nodemailer = require('nodemailer');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    // Create a new user with the provided data
    const user = await Us.create({
        name, email, password
        
    });

    // Send JWT token for authentication
    console.log('User Registered Successfully!');
    console.log(user);
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            name,
            email,
        },
    });
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
   

    if (!email || !password) {
        return next(new errorHandler('Please enter both Email and Password!', 400));
    }
   

    try {
        const user = await Users.findOne({ email }).select('+password');
        
        if (!user) {
            return next(new errorHandler('Invalid Email or Password!', 401));
        }
        console.log(password);
        const isPasswordMatched = await user.comparePassword(password);
        console.log("Now we are at");
        if (!isPasswordMatched) {
            return next(new errorHandler('Invalid Email or Password!', 401));
        }

        console.log("User Logged In Successfully!");
    } catch (error) {
        // Handle any database or other asynchronous errors here
        return next(new errorHandler('Internal Server Error', 500));
    }
});

exports.logOut = catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:'Logged Out!'
    })
});

exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
     const user = await Users.findOne({email: req.body.email});
     if(!user){
        return next(new errorHandler('User not found',404));
     }

     const resetToken = await user.getResetPasswordToken();
     
     const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
     console.log(`The reset token after hashed is ${resetPasswordToken}`);

     await user.save({validateBeforeSave:false});

     const resetPasswordURL = `${process.env.FRONTEND_URL}password/reset/${resetToken}`;
     const message = `Your password reset token is:- \n\n${resetPasswordURL}\n\n If you have not requested this email then please ignore it!`;
     console.log(resetPasswordURL);
     console.log(message);
     try {
        await sendEmail({
            email:user.email,
            subject :'Password Reset',
            message: message
        });
        res.status(200).json({
            success:true,
            message :`Email sent to ${user.email} Successfully!`
        });

     } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save({validateBeforeSave:false});

        return next(new errorHandler(error.message,500));
     }

})
exports.resetPassword = catchAsyncError(async(req,res,next)=>{
   
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    console.log(`Here is the hashed token   ${resetPasswordToken}`);
    
    const user = await Users.findOne({
        resetPasswordToken :resetPasswordToken
        // resetPasswordExpiry :{ $gt : Date.now()  }
    });
   
  
   
  
    if(!user){
        return next(new errorHandler('Reset Password Token is Invalid or Expired!', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new errorHandler('Password does not Match!', 400));
    }

    user.password = req.body.password;
    user.resetPasswordExpiry = undefined;
    user.resetPasswordToken = undefined;
    await user.save();



})


