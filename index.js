const dotenv = require('dotenv');

// console.log(process.env.JWT_SECRET); // undefined

// .env-מאפשר גישה לכל המשתנים שמוגדרים ב
// process.env.XXX הגישה תהיה באמצעות
dotenv.config();

// console.log(process.env.JWT_SECRET); // כאן אפשר לגשת


const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const productRouter = require("./routes/products.route");
const usersRouter = require("./routes/users.route");
const printMethod = require("./middlwares/print.middleware");
const notDelete = require("./middlwares/notDelete.middlwares");
const { errorHandling, pageNotFound } = require("./middlwares/errorHandling.middleware");
const { connectToDB } = require('./config/db');


// התחברות למונגו
connectToDB();

// יצירת שרת
const app = express();

app.get("/", (req, res, next) => {
  res.send("welcome to my website"); // הדפסה ללקוח
});

// ============== 2 ===================
// הגדרות
// 1. built-in middlewares - מובנים
app.use(express.json()); // body קבלת נתונים בצורה של גייסון לתוך ה
app.use(express.urlencoded({ extended: false })); // מאפשר לקבל גם קבצים

// 2. third-party middlewares - צד שלישי - דורשים התקנה
// app.use(cors()); // מוסיף הגדרה לשרת שתאפשר גישה מכל לקוח
app.use(cors({ origin: "http://localhost:5173" })); //  מוסיף הגדרה לשרת שתאפשר גישה  רק מהכתובת הזו (ריאקט)
app.use(morgan('dev')); // הדפסה על הבקשה בזמן פיתוח

// 3. custom middlewares - מותאם אישית
// app.use(printMethod);
// app.use(notDelete);

// ============== 3 ===================
// routes - ניתובים בשרת
// http://localhost:5000/products לכאן יגיעו כל הבקשות לכתובת
app.use("/products", printMethod, productRouter);
app.use("/users", usersRouter);

app.use(pageNotFound); // אם לא מצא שום נתיב מתאים

// מקשרים בסוף הדף הראשי
// next-ואז כל מי שישלח פרמטר ל
// ילך למידלוואר עם 4 פרמטרים של השגיאות
app.use(errorHandling);

// ============== 4 ===================
// הרצת השרת
const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log("server running at http://localhost:" + port);
});

// אפשר לבדוק את השרת ע"י
// html/צד לקוח - ריאקט/אנגולר
// postman תוכנת
// thunder client תוסף לויזואל קוד
