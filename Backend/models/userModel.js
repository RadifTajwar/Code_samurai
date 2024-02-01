const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please Enter your name'],
        maxLength:[30,'Name can not exceed 30 letters!'],
        minLength:[4,'name Must have minimum 4 characters!']
    },
    email:{
        type:String,
        require:[true,'Please enter your email'],
        unique:true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Please enter a valid Email!',
          }
    },
    password:{
        type:String,
        required:[true,'Please Enter Your Password'],
        minLength:[8,'Password ust have minimum 8 characters']
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    resetPasswordToken :String,
    resetPasswordExpiry: Date

})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})


userSchema.methods.getJWTToken = function(){
    return JWT.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
}

userSchema.methods.comparePassword = async function (enteredPassword){
    
    
     return await bcrypt.compare(enteredPassword,this.password);

}


userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');

    
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log(this.resetPasswordToken);
    this.resetPasswordExpiry = Date.now() + 15*60*1000;
     
    return resetToken;
}


module.exports = mongoose.model('Users',userSchema);