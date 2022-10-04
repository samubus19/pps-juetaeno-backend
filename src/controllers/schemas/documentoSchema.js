const Joi = require('joi');

const documentoSchema = Joi.object({
    nroExpediente : Joi.string().required(),
    tipoDocumento : Joi.string().valid("Nota", "Expediente", "Reclamos", "Cese").insensitive().required(),
    fechaIngreso  : Joi.string().required(),
    fechaSalida   : Joi.string().required(),
    estadoActual  : Joi.string().valid("Iniciado","En pase", "Tramitacion", "Finalizado").insensitive().required(),
    descripcion   : Joi.string().required(),
    sedeActual    : Joi.string().valid("Legales", "Junta primario", "Mesa de entrada", "Junta secundario", "Secretaria").insensitive().required(),
})

module.exports = { documentoSchema };