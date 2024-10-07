const { default: mongoose, Types } = require("mongoose");

const productSchema = new mongoose.Schema({
    // _id
    name: { type: String, required: true, minlength: 2 },
    price: { type: Number, min: 0 },
    company: { type: String, enum: ['tnuva', 'coca cola'] }, // ערך מתוך רשימה
    amount: { type: Number, min: 0 },
    creationDate: { type: Date, default: new Date() },
    user_id: { type: Types.ObjectId }
});

module.exports = mongoose.model('products', productSchema);