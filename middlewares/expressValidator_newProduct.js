const { body } = require("express-validator");

    const validator=[
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

module.exports = validator;