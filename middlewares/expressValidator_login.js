const { body } = require("express-validator");

const validator = [
    body('email_usuario')
    .notEmpty().withMessage('Tienes que ingresar tu correo').bail()
    .isEmail().withMessage('Debe ser un correo válido'),
    body('password_usuario').notEmpty().withMessage('Tienes que ingresar tu contraseña'),
];

module.exports = validator;