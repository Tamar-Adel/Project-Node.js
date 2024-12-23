const categories = require('../models/category.model');

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await categories.find();
        res.status(200).json(categories);
    } catch (error) {
        next({ error: error.message, status: 400 });
    }
};

//קבלת כל המתכונים לכל הקטגוריות
exports.getCategoriesWithRecipes = async (req, res, next) => {
    try {
        const allCategories = await categories.find();
        const results = await Promise.all(
            allCategories.map(async (category) => {
                const recipes = await recipes.find({ category: category._id });
                return { category, recipes };
            })
        );
        res.status(200).json(results);
    } catch (error) {
        next({ error: error.message, status: 400 });
    }
};
//קבלת קטגוריה לפי קוד (או שם) וכל המתכונים בקטגוריה זו
exports.getCategoryByCode = async (req, res, next) => {
    const { code } = req.params; 
    try {
        const category = await categories.findOne({ code });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const recipes = await recipes.find({ category: category._id });
        res.status(200).json({ category, recipes });
    } catch (error) {
        next({ error: error.message, status: 400 });
    }
};



