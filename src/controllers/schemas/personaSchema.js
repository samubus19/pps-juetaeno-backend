const Joi = require('joi');

const personaSchema = Joi.object({
    nombre          : Joi.string().regex(/^[a-zA-Z]+$/).required(),
    apellido        : Joi.string().regex(/^[a-zA-Z]+$/).required(),
    tipoDocumento   : Joi.string().required(),
    nroDocumento    : Joi.string().length(8).required(),
    fechaNacimiento : Joi.string().isoDate().required(),
    nroTelefono     : Joi.string().required()
})

module.exports = { personaSchema };