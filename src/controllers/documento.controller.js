const Documento           = require('../database/models/Documento');
const Joi                 = require('joi');
const { documentoSchema } = require('./schemas/documentoSchema');

async function crearNuevoDocumento(req, res) {
    const bodyData = {
        nroExpediente : req.body.nroExpediente,
        tipoDocumento : req.body.tipoDocumento,
        fechaIngreso  : req.body.fechaIngreso,
        fechaSalida   : req.body.fechaSalida,
        estadoActual  : "Iniciado",
        descripcion   : req.body.descripcion,
        sedeActual    : "Mesa de entrada",
    }

    try {
        Joi.assert(bodyData, documentoSchema)
        const nuevoDocumento = new Documento({
            nroExpediente : bodyData.nroExpediente,
            tipoDocumento : bodyData.tipoDocumento,
            fechaIngreso  : bodyData.fechaIngreso,
            fechaSalida   : bodyData.fechaSalida,
            estadoActual  : bodyData.estadoActual,
            descripcion   : bodyData.descripcion,
            sedeActual    : bodyData.sedeActual,
        });

        await nuevoDocumento.save();
        return res.status(201).json("Documento creado correctamente");   
    } catch (error) {
        
    }
}

async function editarDocumento(req, res) {
    const { nro } = req.params;
    const bodyData = {
        nroExpediente : req.body.nroExpediente,
        tipoDocumento : req.body.tipoDocumento,
        fechaIngreso  : req.body.fechaIngreso,
        fechaSalida   : req.body.fechaSalida,
        estadoActual  : req.body.estadoActual,
        descripcion   : req.body.descripcion,
        sedeActual    : req.body.sedeActual,
    }
    try {
        Joi.assert(bodyData, documentoSchema);
        const documento = await Documento.findOneAndUpdate({nroExpediente : nro}, 
            {
                nroExpediente : bodyData.nroExpediente,
                tipoDocumento : bodyData.tipoDocumento,
                fechaIngreso  : bodyData.fechaIngreso,
                fechaSalida   : bodyData.fechaSalida,
                estadoActual  : bodyData.estadoActual, 
                descripcion   : bodyData.descripcion,
                sedeActual    : bodyData.sedeActual,
            })

            return res.status(200).json("Datos del documento editados correctamante");

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje : error });
    } 
} 

async function actualizarEstadoDocumento(req, res) {
    const { nro } = req.params;
    const bodyData = {
        nuevoEstado : req.body.nuevoEstado,
        destino     : req.body.destino,
    }
    try {
        Joi.assert(bodyData, documentoSchema);
        const documento = await Documento.findOneAndUpdate({nroExpediente : nro}, 
            {
                estadoActual  : bodyData.nuevoEstado, 
                sedeActual    : bodyData.destino,
            })

            return res.status(200).json("Datos del documento editados correctamante");

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje : error });
    } 
    /**
     * Se cambiaria el destino, estado, fecha de salida (se actualiza solo), 
     */
    
}

async function obtenerDocumentos(req, res) {
    try {
        const documentos = await Documento.find();
        console.log(documentos);
        return res.status(200).json(documentos);
    } catch (error) {
        return res.status(500).json(error);
       }
}

async function obtenerDocumentoPorNumero(req, res) {
    try {
        const documento = await Documento.findOne({nroExpediente : req.params.nro});
        console.log(documento);
        return res.status(200).json(documento);
    } catch (error) {
        
    }
}

module.exports = {
    crearNuevoDocumento,
    actualizarEstadoDocumento,
    obtenerDocumentos,
    obtenerDocumentoPorNumero,
    editarDocumento
}