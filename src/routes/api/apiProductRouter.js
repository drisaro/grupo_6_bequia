const express = require("express");
const router = express.Router();
const apiProductController = require("../../controllers/api/apiProductController");
const path=require('path');
const multer =require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../../public/images/Productos"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })


const validations = require("../../../middlewares/expressValidator_newProduct");


/*** GET ALL THE PRODUCTS  ***/ 
router.get("/api/productos", apiProductController.list);


router.get("/api/productos/ultimo", apiProductController.lastProduct);
/*** CREATE ONE PRODUCT 

router.post("/createProduct", upload.single("imagen_producto"), validations, productController.storeProduct);
***/ 
/*** EDIT ONE PRODUCT 
router.get("/edit/:id", productController.editProduct);
router.put("/edit/:id",upload.single("imagen_producto"), productController.updateProduct);
***/ 
/*** BUY CHART 
router.get("/carrito",productController.carrito);
***/ 
/*** GET ONE PRODUCT ***/ 
router.get("/api/productos/:id", apiProductController.product); //Dejar :id siempre al final

/*** DELETE ONE PRODUCT 
router.delete('/:id', productController.destroy); 
***/ 
module.exports = router;