const bcrypt = require('bcryptjs');
const { User, generateToken } = require('../models/user.model');

const users = [];

module.exports = {
    // שליפת כל המשתמשים
    getAllUsers: async (req, res, next) => {
        // Read
        try {
            const arrUsers = await User.find(); // מחזיר את כל המשתמשים מתוך האוסף
            // console.log("arrUsers");
            // console.log(arrUsers);
            res.json(arrUsers);
        } catch (error) {
            // console.log(error.message);
            next({ error: error.message })
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body; // הנתונים מהלקוח

        const user = await User.findOne({ email: email }); // חיפוש משתמש לפי אימייל בדטהבייס

        if (!user) {
            return next({ error: 'login failed', status: 401 })
        }

        // בדיקת הסיסמא המוצפנת
        const result = await bcrypt.compare(password, user.password);// מקורית, מוצפנת

        // הסיסמא נכונה
        if (result) {
            const token = generateToken(user); // נוצר טוקן עם ההרשאות של הלקוח
            user.password = '****';
            // return res.json({ user: user, token: token });
            return res.json({ user, token }); // השורה הנל בקיצור
            // return res.json({ user_name: user.name, token }); // אם מחזירים טוקן לא חייבים להחזיר את כל הפרטים של היוזר
        }
        // הסיסמא שגויה
        else {
            return next({ error: 'login failed', status: 401 })
        }
    },
    addUser: async (req, res, next) => { // register - הרשמה
        try {
            const newUser = new User(req.body);
            // const newUser = new User({ name: req.body.name, password: req.body.password })

            console.log(newUser);

            await newUser.save(); // שמירה במונגו
            console.log(newUser);

            const token = generateToken(newUser);
            return res.status(201).json({ user: newUser, token });
        } catch (error) {
            return next({ error: error.message, status: 400 })
        }
    }
}