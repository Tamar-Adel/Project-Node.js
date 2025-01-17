const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String },
    level: { type: Number, enum: [1, 2, 3, 4, 5] },
    time: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    instructions: { type: String },
    layers: [
        {
            description: { type: String, required: true }, // תיאור השכבה
            ingredients: { type: [String], required: true }, // מרכיבים של השכבה
        },
    ],
    img: { type: String },
    // קשרי גומלין
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // קוד של מספור אוטומטי
        ref: 'User' // לאיזה אוסף הקוד קשור - קוד מתוך טבלת משתמשים
    },

    addDate: {
        type: Date,
        default: Date.now 
    },
    
    isPrivate: { type: Boolean, default: false },
});
module.exports = mongoose.model('recipies', recipeSchema);




