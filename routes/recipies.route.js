const express = require('express');
const {getrecipies,getparmsName,addrecipe,putrecipe,deleterecipe,getparmsID,getparmstime,getrecipiOnlyUser}=require('../controllers/recipies.controller')


const router = express.Router();

router.get('/', getrecipies);
 

// http://localhost:5000/recipies?id=111 - פרמטר שאינו חובה
// http://localhost:5000/recipies/111 - פרמטר חובה
router.get('/:id',getparmsID);

router.get('/:userid',getrecipiOnlyUser);
router.get('/:time',getparmstime);



// הוספת מתכון
router.post('/', addrecipe)
// עדכון מתכון לבדוק איך עושים
router.put('/',putrecipe);
//מחיקת מתכון
router.delete('/:id', deleterecipe);
module.exports = router;
