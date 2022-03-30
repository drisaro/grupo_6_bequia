const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


router.get("/", productController.index);
router.get("/createProduct", productController.createProduct);
router.get("/updateProduct", productController.updateProduct);
router.get("/:id", productController.product);

module.exports = router;