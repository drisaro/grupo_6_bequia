const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const path=require('path');
const multer =require('multer');
const {body}=require('express-validator')

const validations=[
  body('nombre_producto').notEmpty().withMessage('Tienes que escribir un nombre de producto'),
  body('descripcion_producto').notEmpty().withMessage('Tienes que escribir una descripcion'),
  body('precio_producto')
  .notEmpty().withMessage('Tienes que escribir un precio').bail()
  .isInt().withMessage('el precio debe ser un numero'),
  body('color_producto').notEmpty().withMessage('Tienes que elegir un color'),
  body('categoria_producto').notEmpty().withMessage('Tienes que elegir una categoria'),
  body('imagen_producto').custom((value,{req})=>{
      let file=req.file;
      let acceptedExtensions=['.jpg','.png']
      if(!file){
        throw new Error('Tiene que subir una imagen')
      }
      else {
        let fileExtension=path.extname(file.originalname);
        if(!acceptedExtensions.includes(fileExtension)){
          throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
        }
      }
      return true
  })
  ]

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

/*** GET ALL PRODUCTS ***/ 
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