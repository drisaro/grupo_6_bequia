const { body } = require("express-validator");
const path=require('path');

    const validator=[
      body('nombre_producto')
      .notEmpty().withMessage('Tienes que escribir un nombre de producto').bail()
      .isLength({ min: 5}).withMessage('El nombre de producto debe tener al menos 5 caracteres'),
      body('descripcion_producto')
      .notEmpty().withMessage('Tienes que escribir una descripcion').bail()
      .isLength({ min: 20}).withMessage('El descripcion de producto debe tener al menos 20 caracteres'),
      body('precio_producto')
      .notEmpty().withMessage('Tienes que escribir un precio').bail()
      .isInt().withMessage('el precio debe ser un numero'),
      body('id_color').notEmpty().withMessage('Tienes que elegir un color'),
      body('id_categoria').notEmpty().withMessage('Tienes que elegir una categoria'),
      body('imagen_producto').custom((value,{req})=>{
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