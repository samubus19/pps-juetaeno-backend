const Usuario           = require('../database/models/Usuario');
const jwt               = require('jsonwebtoken');
const config            = require('config');
const { secret_key }    = config.get('services.token');
const Joi               = require('joi');
const { usuarioSchema } = require('./schemas/usuarioSchema');


async function crearNuevoUsuario(req, res) {
    const bodyData = {
        usuario     : req.body.usuario,
        contrasenia : req.body.contrasenia,
        email       : req.body.email,
        area        : req.body.area,
        rol         : req.body.rol,
        fkPersona   : req.body.fkPersona
    }
    try {
        Joi.assert(bodyData, usuarioSchema);

        const nuevoUsuario = new Usuario({
            usuario     : bodyData.usuario,
            contrasenia : bodyData.contrasenia,
            email       : bodyData.email,
            rol         : bodyData.rol,
            area        : bodyData.area,
            fkPersona   : bodyData.fkPersona
        });
    
        const nombreUsuario = await Usuario.findOne({ $or : [{usuario : bodyData.usuario}, { email : bodyData.email}] });
        if (nombreUsuario) {
            return res.status(400).json({
                statusCode  : 400,
                mensaje     : `Ya existe un usuario con el nombre de usuario ${bodyData.usuario}`
            });
    
        } else {
            nuevoUsuario.contrasenia = await nuevoUsuario.encryptPassword(bodyData.contrasenia);
            await nuevoUsuario.save();
            return res.status(201).json({
                mensaje : "Usuario creado correctamente"
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message);
    }
    
}

async function inciarSesionUsuario(req, res) {
    try {
        const usuario = await Usuario.findOne({ $or : [{usuario : req.body.usuario}, { email : req.body.email}] });
        if(!usuario) {
            return res.status(400).json({
                statusCode : 400,
                mensaje    : "El usuario y/o la contraseña ingresada son incorrectas"
            });
        }
        const contraseniaValida = await usuario.matchPassword(req.body.contrasenia);
        if (!contraseniaValida) {
            return res.status(401).send({ 
                auth    : false, 
                token   : null, 
                mensaje : "El usuario y/o la contraseña ingresada son incorrectas" });
        }

        const token = jwt.sign({ 
            id: usuario._id }, 
            secret_key, {
            expiresIn: '24h',
        });

        res.status(200).json({
            mensaje : "Usuario autenticado correctamente",
            token   : token, 
            usuario : usuario
        });    
            
    } catch (error) {
        return res.stats(500).json({
            mensaje : error
        })
    }

}

async function actualizarContraseniaUsuario(req, res) {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id_usuario, {
            contrasenia : req.body.contrasenia
        });
        if(!usuario) {
            return res.status(400).json({
                statusCode : 400,
                mensaje    : "Petición errónea, revisa tus parámetros."
            })
        }
        return res.status(200).json("Contraseña actualizada correctamente");

    } catch(error) {
        return res.status(500).json({ 
            mensaje : error 
        });
    }
}

module.exports = {
    crearNuevoUsuario,
    inciarSesionUsuario,
    actualizarContraseniaUsuario
}

