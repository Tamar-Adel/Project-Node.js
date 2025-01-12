const express = require('express');
const {getAllCategories,getCategoriesWithRecipes,getCategoryByCode}=require('../controllers/categories.controller')


const router = express.Router();

router.get('/', getAllCategories);
 
router.get('/with-recipes',getCategoriesWithRecipes);

router.get('/:id',getCategoryByCode);

module.exports = router;



