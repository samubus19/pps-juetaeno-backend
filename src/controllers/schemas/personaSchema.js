const Joi = require('joi')
    .extend(require('@joi/date'));

const personaSchema = Joi.object({
    nombre          : Joi.string().regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required(),
    apellido        : Joi.string().regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required(),
    tipoDocumento   : Joi.string().required(),
    nroDocumento    : Joi.string().length(8).required(),
    fechaNacimiento : Joi.date().format('D/MM/YYYY').required(),
    nroTelefono     : Joi.string().required()
})

const editarPersonaSchema = Joi.object({
    nombre          : Joi.string().regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required(),
    apellido        : Joi.string().regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required(),
    fechaNacimiento : Joi.date().format('D/MM/YYYY').required(),
    nroTelefono     : Joi.string().required()
})

module.exports = { personaSchema, editarPersonaSchema };