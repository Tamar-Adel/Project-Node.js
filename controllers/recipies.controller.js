const recipies = require('../models/recipies.model');
const categories = require('../models/category.model')
const mongoose = require('mongoose');

//קבלת כל המתכונים
exports.getrecipies = async function (req, res, next) {   
  const currentUserId = req.user_id;
  try {

    const arrrecipies = await recipies.find({

      $or: [
        { isPrivate: false }, // מתכונים ציבוריים
        { isPrivate: true, createdBy: currentUserId } // מתכונים פרטיים של המשתמש המחובר
      ]
    });

    res.json(arrrecipies)
  }
  catch (error) {
    next({ error: error.message }) // 

  }

}

//קבלתמתכון לפי id
exports.getparmsID = async function (req, res, next) {
  const Pid = +req.query._id;
  const currentUserId = req.user_id;


  try {
    const recipe = await recipies.find({
      _id:Pid,
      $or: [
        { isPrivate: false }, // מתכונים ציבוריים
        { isPrivate: true, createdBy: currentUserId } // מתכונים פרטיים של המשתמש המחובר
      ]
     });
    res.json(recipe)

  }
  catch (error) {

    next({ error: error.message })
  }
}
//קבלת מתכון לפי זמן הכנה
exports.getparmstime = async function (req, res, next) {
  const maxTime= +req.query.time;
  const currentUserId = req.user_id;


  try {
    const recipe = await recipies.find({
   time: { $lte: maxTime }, // זמן הכנה פחות או שווה למספר הדקות שהתקבל
      $or: [
        { isPrivate: false }, // מתכונים ציבוריים
        { isPrivate: true, createdBy: currentUserId } // מתכונים פרטיים של המשתמש המחובר
      ]
     });
    res.json(recipe)

  }
  catch (error) {

    next({ error: error.message })
  }
}




//קבלת מתכן למשתמש מסוים
exports.getrecipiOnlyUser = async function (req, res, next) {

  const currentUserId = req.user_id;

  try {
    const recipe = await recipies.find({ createdBy: currentUserId });
    res.json(recipe)

  }
  catch (error) {

    next({ error: error.message })
  }
}

// הוספת מתכון
exports.addrecipe = async function (req, res, next) {
  const newmyrecipe = new recipies(req.body);
  const category=await categories.findOne({desc:req.params.desc})
  if(category){
        category.recipeCount++;
        category.save()
        newmyrecipe.category=category._id//recype

  }
  else{
    const newCategory=new categories({desc:req.params.desc,recipeCount:1})
    newCategory.save()
    newmyrecipe.category=category._id//recype

  }

  console.log(newmyrecipe)
  try {
    await newmyrecipe.save(); // שמירה בדטהבייס בודקת תקינות

    //עדכון recipecount
    await categories.findOneAndUpdate(
      { _id: newmyrecipe.category },
      { $inc:{recipecount:1} }

    )
    res.status(201).send(newmyrecipe); // האוביקט שנוסף עם הקוד האוטומט
  }
  catch (error) {
    next({ error: error.message, status: 400 })
  }

}

// עדכון מתכון 
exports.putrecipe = async function (req, res, next) {
  const myputrecipe = req.body;
  try {
    await recipies.findOneAndUpdate({ _id: myputrecipe._id }, myputrecipe);

    }
  
  catch (error) {
    next({ error: error.message })
  }
};


//מחיקת מתכון
exports.deleterecipe = async function (req, res, next) {
  const myID = req.params.id;
  try {
    await recipies.findByIdAndDelete(myID);
    await categories.findOneAndUpdate(
      { _id: myID.category }, // מחפש את הקטגוריה לפי ה-ID שלה
      { $inc: { recipeCount: -1 } } // מקטין את recipeCount ב-1
    );

    res.status(204).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    next({ error: error.message, status: 401 });
  }
}


