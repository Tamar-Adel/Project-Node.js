const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// 1.
// סכמה = אוביקט במבנה של מסמך באוסף
const userSchema = new mongoose.Schema({
    // _id
    name: String,
    password: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, required: true },
    // lowercase - הופך את המחרוזת שנקלטה לאותיות קטנות
    // unique - ייחודי
    address: {
        city: String,
        street: String,
        num: Number
    },
    comments: [String], // הערות - מערך מחרוזות
    role: { type: String, enum: ['admin', 'user'], default: 'user' } // תפקיד - admin/user
});

userSchema.pre('save', async function () {
    // this - כל האוביקט שנשמר בדטהבייס לפני השמירה

    // הצפנת סיסמא
    const newPass = await bcrypt.hash(this.password, 10);
    // newPass - סיסמא מוצפנת
    console.log(newPass);
    this.password = newPass; // שמירה במסד נתונים
})

// 2.
// SQL-מודל מקביל לטבלה ב
// collection - אוסף
const UsersModel = mongoose.model('users', userSchema);

module.exports.User = UsersModel; // ייצוא המודל של המונגו

// פונקציה ליצירת טוקן עם הרשאות
module.exports.generateToken = function (user) {
    const secretKey = process.env.JWT_SECRET || 'secret'; // מחרוזת סודית פרטית לשרת שמאפשרת הצפנה של המידע
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey);
    return token;
}