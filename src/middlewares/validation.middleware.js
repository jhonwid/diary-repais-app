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

//* Validacion de usuarios creados
exports.CreateUserValidation = [
    body('name').notEmpty().withMessage('Name is required'), //Nombre no puede estar vacio y si esta vacio se envia un mesaje 'el nombre es requerido'
    body('email').notEmpty().withMessage('email is required'),
    body('email').notEmpty().withMessage('email is invalid'),
    body('password').custom(value => {
        // Validaciones personalizados para contraseña
        if (value.length < 8) { // Option #2 (!/^.{8,}$/.test(value))
            throw new Error('Password must be at least 8 charactres');
        }

        if (!/[A-Z]/.test(value)) { // La contraseña deba contener al menos una letra mayuscula
            throw new Error('Password must contain at least one uppercase letter');
        }

        if (!/[a-z]/.test(value)) { // La contraseña deba contener al menos una letra minuscula
            throw new Error('Password must contain at least one lowercase letter');
        }

        if (!/[0-9]/.test(value)) { // La contraseña deba contener al menos un numero
            throw new Error('Password must contain at least one number');
        }

        if (!/[!@#$^&*()\-_=+{}[\]:;"'<>,.?/~]/.test(value)) { // La contraseña deba contener al menos un caracter especial
            throw new Error('Password must contain at least one special character');
        }

        return true;
    }),
    validateFields,
];

//* Validacion para las reparaciones
exports.createRepairValidation = [
    body('date').notEmpty().withMessage('is required'),
    body('userId').notEmpty().withMessage('is required'),
    validateFields,
];

// Falta validacion para actualizar usuario y reparacion en validationMiddelware.js