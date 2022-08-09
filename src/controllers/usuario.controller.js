const Usuario = require('../models/Usuario');
const jwt     = require('jsonwebtoken');


async function crearNuevoUsuario(req, res) {
    res.json({
        message : "crear nuevo usuario"
    })
}

async function inciarSesionUsuario(req, res) {
    res.json({
        message : "iniciar sesion usuario"
    })
}

async function actualizarContraseniaUsuario(req, res) {
    res.json({
        message : "actualizar contrasenia usuario"
    })
}

module.exports = {
    crearNuevoUsuario,
    inciarSesionUsuario,
    actualizarContraseniaUsuario
}

