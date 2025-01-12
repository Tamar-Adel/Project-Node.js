const mongoose = require('mongoose');
const recipies=require('../models/recipies.model')

const categorySchema=new mongoose.Schema({
    desc:{
    type: String,  
    required:true,
},
recipeCount: { type: Number, default: 0 }, // מספר מתכונים בקטגוריה זו
})


module.exports=mongoose.model('Categories',categorySchema);