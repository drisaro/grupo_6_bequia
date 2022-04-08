const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/createProduct", productController.createProduct);
router.post("/createProduct", productController.storeProduct);

router.post("/updateProduct", productController.updateProduct);
router.post("/carrito",productController.carrito);
//Dejar :id siempre al final
router.get("/:id", productController.product);


module.exports = router;