const Joi = require('joi');

const DocumentoSchema = Joi.object({
    nroDocumento  : Joi.string().required(),
    tipoDocumento : Joi.string().valid("Nota", "Expediente", "Reclamos", "Cese").insensitive().required(),
    descripcion   : Joi.string().required(),
    destino       : Joi.string().required(),
})

module.exports = { DocumentoSchema };