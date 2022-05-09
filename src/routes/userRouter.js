const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const path=require('path');
const multer =require('multer');
const {body}=require('express-validator')

const validations_login = require("../../middlewares/expressValidator_login");

const validations=[
    body('nombre_usuario').notEmpty().withMessage('Tienes que escribir un nombre de usuario'),
    body('apellidos_usuario').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('email_usuario')
    .notEmpty().withMessage('Tienes que escribir un correo').bail()
    .isEmail().withMessage('debe ser un correo válido'),
    body('password_usuario').notEmpty().withMessage('Tienes que crear una contraseña'),
    body('categoria_usuario').notEmpty().withMessage('Tienes que elegir una categoria'),
    body('imagen_usuario').custom((value,{req})=>{
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
      cb(null, path.resolve(__dirname, "../../public/images/Users"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  })
  
const upload = multer({ storage: storage })



/*** GET ALL THE USERS ***/ 
router.get("/",userController.index);

/*** CREATE ONE USER ***/ 
router.get("/createUser", userController.createUser);
router.post("/createUser", upload.single("imagen_usuario"), validations, userController.storeUser);

/*** USER LOGIN***/ 
router.get("/login",userController.login);
router.post("/login", validations_login, userController.processLogin);

/*** USER LOGOUT***/ 
router.get("/logout", userController.logout)

/*** EDIT ONE USER ***/ 
router.get("/edit/:id", userController.editUser);
router.put("/edit/:id",upload.single("imagen_usuario"), userController.updateUser);

/*** SHOW ONE USER ***/ 
router.get("/:id",userController.user);

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', userController.destroy); 


module.exports = router;