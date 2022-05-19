const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const path=require('path');
const multer =require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/images/Productos"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })


const validations = require("../../middlewares/expressValidator_newProduct");


/*** GET ALL THE PRODUCTS ***/ 
router.get("/", productController.index);

/*** CREATE ONE PRODUCT ***/ 
router.get("/createProduct", productController.createProduct);
router.post("/createProduct", upload.single("imagen_producto"), validations, productController.storeProduct);

/*** EDIT ONE PRODUCT ***/ 
router.get("/edit/:id", productController.editProduct);
router.put("/edit/:id",upload.single("imagen_producto"), productController.updateProduct);

/*** BUY CHART ***/ 
router.get("/carrito",productController.carrito);

/*** GET ONE PRODUCT ***/ 
router.get("/:id", productController.product); //Dejar :id siempre al final

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productController.destroy); 

module.exports = router;