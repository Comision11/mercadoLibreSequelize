const {check, body} = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
        min : 2,
        max : 50
    }).withMessage('El nombre tiene que tener como mínimo 2 caracteres').bail()
    .isAlpha().withMessage('El nombre debe contener solo letras'),

    check('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debes ingresar un email válido'),

    body('email')
    .custom(value => {
        console.log(value)
        return db.User.findOne({
            where : {
                email : value
            }
        }).then(user => {
            if(user){
                return Promise.reject('El email ya está registrado')
            }
        })
    }),

    check('pass')
    .isLength({
        min : 6,
        max : 12
    }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

  
]