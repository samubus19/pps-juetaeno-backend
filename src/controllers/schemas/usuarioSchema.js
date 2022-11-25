const Joi = require('joi');

const usuarioSchema = Joi.object({
    usuario     : Joi.string().min(3).required(),
    email       : Joi.string().email().required(),
    contrasenia : Joi.string().min(6).required(),
    area        : Joi.string().valid('MesaEntrada', 'Legales','Miembros', "Secretaria", 'admin').insensitive().required(),
    rol         : Joi.string().valid('usuario', 'admin').insensitive().required(),
    idPersona   : Joi.string().required()
})

const editarUsuarioSchema = Joi.object({
    usuario     : Joi.string().min(3).required(),
    email       : Joi.string().email().required(),
    area        : Joi.string().valid('MesaEntrada', 'Legales','Miembros', "Secretaria", 'admin').insensitive().required(),
    rol         : Joi.string().valid('usuario', 'admin').insensitive().required(),
    rolEditado  : Joi.string().valid('usuario', 'admin').insensitive().required(),
})

module.exports = { usuarioSchema, editarUsuarioSchema };