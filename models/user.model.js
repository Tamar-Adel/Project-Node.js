const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const env=require('dotenv')
env.config()
const usersSchema =  mongoose.Schema({

    name:String,
    password:{ type: String, required: true },
    email:{type:String,lowercase:true,unique:true,required: true},
    address:{
        city: String,
        street: String,
        num: Number
    },
    comments: [String],
    role:{ type: String, enum: ['admin', 'user','guest'], default: 'user' }

});

//הצפנת הסיסמא
//לפני פעולת השמירה תעשה הצפנה 
usersSchema.pre('save',async function (){
const newPass=await bcrypt.hash(this.password, 10);
console.log(newPass);//לבדוק עם המתרגלת שעובד
this.password=newPass;

})


module.exports= mongoose.model('User',usersSchema);


