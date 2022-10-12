const Documento                                  = require('../database/models/Documento');
const Joi                                        = require('joi');
const { DocumentoSchema, 
        editarDocumentoSchema, 
        actualizarEstadoDocumentoSchema }        = require('./schemas/documentoSchema');

async function crearNuevoDocumento(req, res) {
    const bodyData = {
        nroDocumento      : req.body.nroDocumento,
        tipoDocumento     : req.body.tipoDocumento,
        descripcion       : req.body.descripcion,
        fechaIngreso      : new Date().toLocaleDateString('es-ES',{timeZone : 'GMT'}),
        fechaSalida       : "",
        estado            : "Iniciado",
        sede              : "MesaEntrada",
        destino           : req.body.destino,
        idUsuarioFirmante : req.body.idUsuarioFirmante
    }
    
    console.log(bodyData.fechaIngreso);
    try {
        Joi.assert(bodyData, DocumentoSchema)

        const documento = await Documento.findOne({nroDocumento : bodyData.nroDocumento});
        if(documento) {
            return res.status(400).json({
                statusCode : 400,
                mensaje    : `Ya existe un documento con el número ${bodyData.nroDocumento}`
            });
        }

        const nuevoDocumento = new Documento({
            nroDocumento  : bodyData.nroDocumento,
            tipoDocumento : bodyData.tipoDocumento,
            descripcion   : bodyData.descripcion,
            historial     : [{
                fechaIngreso      : bodyData.fechaIngreso,
                fechaSalida       : bodyData.fechaSalida,
                estado            : bodyData.estado,
                sede              : bodyData.sede,
                destino           : bodyData.destino,
                idUsuarioFirmante : bodyData.idUsuarioFirmante
            }]
        });

        await nuevoDocumento.save();
        return res.status(201).json({
            mensaje : "Documento creado correctamente"
        });   
    } catch (error) {
        return res.status(500).json({
            mensaje : error
        })
    }
}

async function editarDocumento(req, res) {
    const nroDocumento = req.params.nro;
    const bodyData = {
        nroDocumento  : req.body.nroDocumento,
        tipoDocumento : req.body.tipoDocumento,
        descripcion   : req.body.descripcion,
        destino       : req.body.destino,
    }
        
    try {
        Joi.assert(bodyData, editarDocumentoSchema);
        const documento = await Documento.findOne({nroDocumento : nroDocumento});

        if(documento) {
            documento.nroDocumento         = bodyData.nroDocumento;
            documento.tipoDocumento        = bodyData.tipoDocumento;
            documento.descripcion          = bodyData.descripcion;
            documento.historial[0].destino = bodyData.destino;
        }
        await documento.save();
        return res.status(200).json({
            mensaje : "Documento editado correctamente"
        });

    } catch (error) {
        return res.status(500).json({ 
            mensaje : error
        });
    } 
} 

async function actualizarEstadoDocumento(req, res) {
    const nroDocumento  = req.params.nro;
    const bodyData = {
        nuevoEstado  : req.body.nuevoEstado,
        destino      : req.body.destino,
        fechaIngreso : new Date().toLocaleDateString('es-ES',{timeZone : 'GMT'}),
        fechaSalida  : ""
    }
    try {
        Joi.assert(bodyData, actualizarEstadoDocumentoSchema);
        const documento = await Documento.findOne({nroDocumento : nroDocumento})
        if(documento) {
            documento.historial.push({
                    fechaIngreso  : bodyData.fechaIngreso,
                    fechaSalida   : bodyData.fechaSalida,
                    estado        : bodyData.nuevoEstado,
                    destino       : bodyData.destino
                })
            
            documento.historial[documento.historial.length-2].fechaSalida = documento.historial[documento.historial.length-1].fechaIngreso
            documento.historial[documento.historial.length-1].sede        = documento.historial[documento.historial.length-2].destino
            if(documento.historial[documento.historial.length-1].estado === "Finalizado") {
                documento.historial[documento.historial.length-1].sede        = ""
                documento.historial[documento.historial.length-1].destino     = ""
                documento.historial[documento.historial.length-1].fechaSalida = new Date().toLocaleDateString('es-ES',{timeZone : 'GMT'})
            }
            }

        await documento.save()

        return res.status(200).json({
            mensaje : "Estado del documento editado correctamante"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            mensaje : error 
        });
    } 
    /**
     * Se cambiaria el destino, estado, fecha de salida (se actualiza solo), 
     */
    
}

async function obtenerDocumentos(req, res) {

    try {
        const documentos = await Documento.find();
        return res.status(200).json(documentos);
    } catch (error) {
        return res.status(500).json(error);
       }
}

async function obtenerDocumentoPorNumero(req, res) {
    try {
        const documento = await Documento.findOne({nroDocumento : req.params.nro});
        if(!documento) {
            return res.status(400).json({
                statusCode : 400,
                mensaje    : `No se ha encontrado un documento con el número ${req.params.nro}. Revisa tus parámetros.`
            })
        }
        return res.status(200).json(documento);
    } catch (error) {
        return res.status(500).json({
            mensaje : error
        })
    }
}

module.exports = {
    crearNuevoDocumento,
    actualizarEstadoDocumento,
    obtenerDocumentos,
    obtenerDocumentoPorNumero,
    editarDocumento
}