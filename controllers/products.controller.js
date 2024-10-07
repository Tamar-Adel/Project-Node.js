const Product = require('../models/product.model');
// כאן יש את כל הנתונים/הפעולות שאפשר לעשות על האוסף של מוצרים בדטהבייס

exports.getAllProducts = async function (req, res, next) {
    try {
        const products = await Product.find(); // מערך של מוצרים ששמורים בדטהבייס
        res.json(products);
    } catch (error) {
        next({ error: error.message })
    }
}

exports.getAllProductsByName = async function (req, res, next) {
    const pName = req.params.name; // abc
    try {
        const products = await Product.find({ name: pName }); // מוצרים ששמם זהה לפרמטר
        res.json(products);
    } catch (error) {
        next({ error: error.message })
    }
}

exports.getProductById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id); // פריט עם קוד מתאים
        // const product = await Product.findOne({ _id: id }); // פריט עם קוד מתאים
        // null אם לא מצא מחזיר
        if (product) {
            res.json(product);
        }
        else {
            next({ status: 404, error: "product not found" });
        }
    } catch (error) {
        next({ error: error.message })
    }
};

exports.addProduct = async (req, res, next) => {
    // כאן ניתן לגשת למשתנים שהוספנו במידלוואר
    if (req.user_role !== 'user')
        return next({ status: 403, error: 'only user can add product' }); // 403 - forbidden, לא מורשה
        
        try {
            const newProduct = new Product(req.body);
            newProduct.user_id = req.user_id;
            
            await newProduct.save(); // שמירה בדטהבייס בודקת תקינות
            
            console.log(`product ${newProduct.name} added by ${req.user_id}`);
        res.status(201).send(newProduct); // האוביקט שנוסף עם הקוד האוטומטי
    } catch (error) {
        next({ error: error.message, status: 400 })
    }
};

// -------------------- check
exports.updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const p = await Product.findByIdAndUpdate(
            id, // קוד מוצר שאותו נעדכן
            { $set: req.body }, // השדות לעדכון
            { new: true } // החזרת האוביקט החדש
        );
        res.json(p);
    } catch (error) {
        next({ error: error.message })
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.pid;
        // ניתן לבדוק אם הקוד קיים ורק אז להחזיר הצלחה
        await Product.findByIdAndDelete(id);
        res.status(204).json();
    } catch (error) {
        next({ error: error.message })
    }
}