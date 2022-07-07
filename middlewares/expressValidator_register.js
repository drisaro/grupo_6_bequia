const { body } = require("express-validator");
const path=require('path');

const validator=[
    body('nombre_usuario')
    .notEmpty().withMessage('Tienes que escribir un nombre de usuario').bail()
    .isLength({ min: 2}).withMessage('El nombre de usuario debe tener al menos 2 caracteres'),
    body('apellidos_usuario').notEmpty().withMessage('Tienes que escribir un apellido').bail()
    .isLength({ min: 2}).withMessage('El apellido de usuario debe tener al menos 2 caracteres'),
    body('email_usuario')
    .notEmpty().withMessage('Tienes que escribir un correo').bail()
    .isEmail().withMessage('Debe ser un correo válido'),
    body('password_usuario').notEmpty().withMessage('Tienes que crear una contraseña').bail()
    .isLength({ min: 8}).withMessage('El password debe tener al menos 8 caracteres'),
    body('categoria_usuario').notEmpty().withMessage('Tienes que elegir una categoria'),
    body('imagen_usuario').custom((value,{req})=>{
        let file=req.file;
        let acceptedExtensions=['.jpg','.png','.jpeg','.gif']
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

module.exports = validator;