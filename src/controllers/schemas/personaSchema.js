const Joi = require('joi')
    .extend(require('@joi/date'));

const personaSchema = Joi.object({
    nombre          : Joi.string().regex(/^[a-zA-Z\s]+$/).required(),
    apellido        : Joi.string().regex(/^[a-zA-Z\s]+$/).required(),
    tipoDocumento   : Joi.string().required(),
    nroDocumento    : Joi.string().length(8).required(),
    fechaNacimiento : Joi.date().format('D/MM/YYYY').required(),
    nroTelefono     : Joi.string().required()
})

module.exports = { personaSchema };