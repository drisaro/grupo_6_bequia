const { body } = require("express-validator");
const path=require('path');

const validator=[
    body('nombre_usuario').notEmpty().withMessage('Tienes que escribir un nombre de usuario'),
    body('apellidos_usuario').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('email_usuario')
    .notEmpty().withMessage('Tienes que escribir un correo').bail()
    .isEmail().withMessage('Debe ser un correo válido'),
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

module.exports = validator;