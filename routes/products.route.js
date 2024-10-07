const express = require("express");
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, getAllProductsByName } = require('../controllers/products.controller');
const { auth } = require("../middlwares/auth.middleware");

const router = express.Router();

// http://localhost:5000/products
router.get("/", getAllProducts);

// http://localhost:5000/products/byname/cheese
router.get("/byname/:name", getAllProductsByName);

// http://localhost:5000/products/66a7b8c9185ba5d2b38023ff
router.get("/:id", getProductById);

// הוספת מוצר
router.post("/", auth, addProduct);

// עדכון מוצר
router.put("/:id", updateProduct);

router.delete("/:pid", deleteProduct);

module.exports = router;
