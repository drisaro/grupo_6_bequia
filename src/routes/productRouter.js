const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/*** GET ALL PRODUCTS ***/ 
router.get("/", productController.index);

/*** CREATE ONE PRODUCT ***/ 
router.get("/createProduct", productController.createProduct);
router.post("/createProduct", productController.storeProduct);

/*** EDIT ONE PRODUCT ***/ 
router.get("/updateProduct/:id", productController.editProduct);
router.put("/updateProduct/:id", productController.updateProduct);

/*** BUY CHART ***/ 
router.post("/carrito",productController.carrito);

/*** GET ONE PRODUCT ***/ 
router.get("/:id", productController.product); //Dejar :id siempre al final

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productController.destroy); 

module.exports = router;