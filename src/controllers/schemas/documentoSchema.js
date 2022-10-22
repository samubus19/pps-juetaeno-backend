const Joi = require('joi')
    .extend(require('@joi/date'));

const DocumentoSchema = Joi.object({
    nroDocumento      : Joi.string().required(),
    tipoDocumento     : Joi.string().valid("Nota", "Expediente", "Reclamo", "Cese").insensitive().required(),
    descripcion       : Joi.string().required(),
    destino           : Joi.string().valid("Legales", "JuntaPrimario", "MesaEntrada", "JuntaSecundario", "Secretaria").insensitive().required(),
    fechaIngreso      : Joi.date().format('DD/MM/YYYY').required(),
    fechaSalida       : Joi.alternatives().try(Joi.string().valid(""), Joi.date().format('DD/MM/YYYY')),
    estado            : Joi.string().valid("Iniciado","En pase", "Finalizado").insensitive().required(),
    sede              : Joi.string().valid("Legales", "JuntaPrimario", "MesaEntrada", "JuntaSecundario", "Secretaria").insensitive().required(),
    idUsuarioFirmante : Joi.string().required()
})

const editarDocumentoSchema = Joi.object({
    nroDocumento      : Joi.string().required(),
    tipoDocumento     : Joi.string().valid("Nota", "Expediente", "Reclamo", "Cese").insensitive().required(),
    descripcion       : Joi.string().required(),
    destino           : Joi.string().valid("Legales", "JuntaPrimario", "MesaEntrada", "JuntaSecundario", "Secretaria").insensitive().required(),
})

const actualizarEstadoDocumentoSchema = Joi.object({
    fechaIngreso      : Joi.date().format('DD/MM/YYYY').required(),
    fechaSalida       : Joi.alternatives().try(Joi.string().valid(""), Joi.date().format('DD/MM/YYYY')),
    nuevoEstado       : Joi.string().valid("Iniciado","En pase","Finalizado").insensitive().required(),
    destino           : Joi.string().valid("Legales", "JuntaPrimario", "MesaEntrada", "JuntaSecundario", "Secretaria").insensitive().required(),
})



module.exports = { DocumentoSchema, editarDocumentoSchema, actualizarEstadoDocumentoSchema };