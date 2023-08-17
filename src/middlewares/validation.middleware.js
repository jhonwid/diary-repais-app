const { validationResult, body } = require('express-validator');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.mapped(),
        });
    }

    next();
};

//* Validacion de Login
exports.createLoginValidation = [
    body('email') //* Validacion de Email
        .notEmpty()
        .withMessage('Email cannot be null')
        .isEmail()
        .withMessage('Email must be a correct format'),
    body('password') //* Validacion de contraseña
        .notEmpty()
        .withMessage('Password cannot be null')
        .isLength({ min: 6 })
        .withMessage('Password must have at least six characters')
        .matches(/\d/)
        .withMessage('Password must have at least one number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one capital letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least on special character (!@#$%^&*(),.?":{}|<>)'),
    validateFields,
];

//* Validacion de usuarios creados
exports.CreateUserValidation = [
    body('name') //* Validacion de name
        .notEmpty()
        .withMessage('Name cannot be null'),
    body('email') //* Validacion de Email
        .notEmpty()
        .withMessage('Email cannot be null')
        .isEmail()
        .withMessage('Email must be a correct format'),
    body('password') //* Validacion de contraseña
        .notEmpty()
        .withMessage('Password cannot be null')
        .isLength({ min: 6 })
        .withMessage('Password must have at least six characters')
        .matches(/\d/)
        .withMessage('Password must have at least one number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one capital letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least on special character (!@#$%^&*(),.?":{}|<>)'),
    validateFields,
];
// Opcion 2: exports.CreateUserValidation = [
//     body('name').notEmpty().withMessage('Name is required'), //Nombre no puede estar vacio y si esta vacio se envia un mesaje 'el nombre es requerido'
//     body('email').notEmpty().withMessage('Email is required'),
//     body('email').notEmpty().withMessage('Email is invalid'),
//     body('password').custom(value => {
//         // Validaciones personalizados para contraseña
//         if (value.length < 8) { // Option #2 (!/^.{8,}$/.test(value)) // La contraseña debe contener 8 caracteres
//             throw new Error('Password must be at least 8 charactres');
//         }

//         if (!/[A-Z]/.test(value)) { // La contraseña debe contener al menos una letra mayuscula
//             throw new Error('Password must contain at least one uppercase letter');
//         }

//         if (!/[a-z]/.test(value)) { // La contraseña debe contener al menos una letra minuscula
//             throw new Error('Password must contain at least one lowercase letter');
//         }

//         if (!/[0-9]/.test(value)) { // La contraseña debe contener al menos un numero
//             throw new Error('Password must contain at least one number');
//         }

//         if (!/[!@#$^&*()\-_=+{}[\]:;"'<>,.?/~]/.test(value)) { // La contraseña debe contener al menos un caracter especial
//             throw new Error('Password must contain at least one special character');
//         }

//         return true;
//     }),
//     validateFields,
// ];

//* Validacion de usuarios actualizados
exports.updateUserValidation = [
    body('name')
        .notEmpty()
        .withMessage('name cannot be null'),
    body('email')
        .notEmpty()
        .withMessage('Email cannot be null'),
    validateFields,
];

//* Validacion de usuarios eliminados
exports.deleteUserValidation = [
    body('id')
        .notEmpty()
        .withMessage('Id cannot be null'),
    body('status')
        .notEmpty()
        .withMessage('Status cannot be null'),
    validateFields,
];


//* Validacion de reparaciones creadas
exports.createRepairValidation = [
    body('date')
        .notEmpty()
        .withMessage('Date cannot be null'),
    body('userId')
        .notEmpty()
        .withMessage('UserId cannot be null'),
    body('motorsNumber')
        .notEmpty()
        .withMessage('motorsNumber cannot be null'),
    body('description')
        .notEmpty()
        .withMessage('Description cannot be null'),
    validateFields,
];

//* Validacion de reparaciones actualizar
exports.updateRepairValidation = [
    body('id')
        .notEmpty()
        .withMessage('Id cannot be null'),
    body('status')
        .notEmpty()
        .withMessage('Status cannot be null'),
    validateFields,
];

//* Validacion de reparaciones Eliminar
exports.deleteRepairValidation = [
    body('id')
        .notEmpty()
        .withMessage('Id cannot be null'),
    body('status')
        .notEmpty()
        .withMessage('Status cannot be null'),
    validateFields,
];