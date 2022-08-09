const Expediente = require('../models/Expediente');

async function crearNuevoExpediente(req, res) {
    res.json({
        message : "crear nuevo registro de expediente"
    })
}

async function actualizarEstadoExpediente(req, res) {
    res.json({
        message : "actualizar estado del expediente"
    })
}

async function obtenerExpedientes(req, res) {
    res.json({
        message : "obtener listado de expedienmtes"
    })
}

module.exports = {
    crearNuevoExpediente,
    actualizarEstadoExpediente,
    obtenerExpedientes
}