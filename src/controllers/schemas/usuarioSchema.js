const Joi = require('joi');

const usuarioSchema = Joi.object({
    usuario     : Joi.string().min(3).required(),
    email       : Joi.string().email().required(),
    contrasenia : Joi.string().min(6).required(),
    area        : Joi.string().valid('Mesa de entrada', 'Legales', 'Junta Primario', 'Junta Secundario').insensitive().required(),
    rol         : Joi.string().valid('usuario', 'admin').insensitive().required(),
    idPersona   : Joi.string().required()
})

module.exports = { usuarioSchema };