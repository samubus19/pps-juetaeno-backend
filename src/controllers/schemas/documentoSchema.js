const Joi = require('joi')
    .extend(require('@joi/date'));

const DocumentoSchema = Joi.object({
    nroDocumento      : Joi.string().required(),
    tipoDocumento     : Joi.string().valid("NO", "EXP", "REC", "CES").insensitive().required(),
    descripcion       : Joi.string().required(),
    fechaIngreso      : Joi.date().format('D/MM/YYYY').required(),
    fechaSalida       : Joi.alternatives().try(Joi.string().valid(""), Joi.date().format('D/MM/YYYY')),
    estado            : Joi.string().valid("Iniciado","En pase", "Finalizado").insensitive().required(),
    sede              : Joi.string().valid("LEGALES", "MIEMBROSJUNTA", "MESAENTRADA", "SECRETARIA", "").insensitive().required(),
    idUsuarioFirmante : Joi.string().required()
})

const editarDocumentoSchema = Joi.object({
    nroDocumento      : Joi.string().required(),
    tipoDocumento     : Joi.string().valid("NO", "EXP", "REC", "CES").insensitive().required(),
    descripcion       : Joi.string().required(),
})

const actualizarEstadoDocumentoSchema = Joi.object({
    fechaIngreso      : Joi.date().format('D/MM/YYYY').required(),
    fechaSalida       : Joi.alternatives().try(Joi.string().valid(""), Joi.date().format('D/MM/YYYY')),
    nuevoEstado       : Joi.string().valid("Iniciado","En pase","Finalizado").insensitive().required(),
    destino           : Joi.string().valid("LEGALES", "MIEMBROSJUNTA", "MESAENTRADA", "SECRETARIA", "").insensitive().required(),
})



module.exports = { DocumentoSchema, editarDocumentoSchema, actualizarEstadoDocumentoSchema };