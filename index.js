const express = require('express'); 
const recipiesRouter=require('./routes/recipies.route')
const categoriesRouter=require('./routes/categories.route')
const usersRouter = require('./routes/users.route')
const app = express(); 
const { errorHandling}=require('./middlwares/errorHandling.middleware');
const {connectToDB}=require('./config/db')

const env=require('dotenv')
env.config()


connectToDB()

//הגדרות
app.use(express.json()) // body קבלת נתונים בצורה של גייסון לתוך ה
app.use(express.urlencoded({ extended: false })) // מאפשר לקבל גם קבצים
// http://localhost:5000/
  app.get('/',(req,res,next)=>{
    res.send(('welcome to my website'))//הדפסה ללקוח
  });

  // routes - ניתובים בשרת
// http://localhost:5000/recipies לכאן יגיעו כל הבקשות לכתובת 
app.use('/recipies',recipiesRouter);
app.use('/categories',categoriesRouter);
app.use('/users', usersRouter);
// מקשרים בסוף הדף הראשי
// next-ואז כל מי שישלח פרמטר ל
// ילך למידלוואר עם 4 פרמטרים של השגיאות
app.use(errorHandling);

//הרצת השרת
const port=process.env.PORT;
app.listen(port,()=>{
  console.log('server running at http://localhost:' + port);
})
