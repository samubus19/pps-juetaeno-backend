const Usuario           = require('../database/models/Usuario');
const Persona           = require('../database/models/Persona');
const jwt               = require('jsonwebtoken');
const config            = require('config');
const { secret_key }    = config.get('services.token');
const Joi               = require('joi');
let CryptoJS            = require("crypto-js");
const { usuarioSchema, editarUsuarioSchema } = require('./schemas/usuarioSchema');
const { stringify } = require("flatted");

async function crearNuevoUsuario(req, res) {
    const bodyData = {
        usuario     : req.body.usuario,
        contrasenia : req.body.contrasenia,
        email       : req.body.email,
        area        : req.body.area,
        rol         : req.body.rol,
        idPersona   : req.body.idPersona
    }
    try {
        Joi.assert(bodyData, usuarioSchema);

        const nuevoUsuario = new Usuario({
            usuario     : bodyData.usuario,
            contrasenia : bodyData.contrasenia,
            email       : bodyData.email,
            rol         : bodyData.rol,
            area        : bodyData.area,
            idPersona   : bodyData.idPersona
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
        res.status(500).json({
            mensaje : error
        });
    }
    
}

async function inciarSesionUsuario(req, res) {
    try {
        const usuario = await Usuario.findOne({ $or : [{usuario : req.body.usuario}, { email : req.body.email}] });
        if(!usuario) {
            return res.status(400).json({
                statusCode : 400,
                mensaje    : "El usuario y/o la contrase??a ingresada son incorrectas"
            });
        }
        const contraseniaValida = await usuario.matchPassword(req.body.contrasenia);
        if (!contraseniaValida) {
            return res.status(400).send({ 
                auth    : false, 
                token   : null, 
                mensaje : "El usuario y/o la contrase??a ingresada son incorrectas" });
        }

        const token = jwt.sign({ 
            id : usuario._id }, 
            secret_key, 
            {
                expiresIn: '8h',
            });
        
            let usuarioEncriptadoJson = CryptoJS.AES.encrypt(JSON.stringify(usuario), token).toString()
            let usuarioEncriptadoData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(usuarioEncriptadoJson))

        res.status(200).json({
            mensaje  : "Usuario autenticado correctamente",
            token    : token ,
            usuario  : usuarioEncriptadoData
    });    
            
    } catch (error) {
        return res.status(500).json({
            mensaje : error
        })
    }

}

async function actualizarContraseniaUsuario(req, res) {
    try {
        Joi.assert(req.body.contrasenia, Joi.string().min(6).required())
        const usuario       = await Usuario.findById(req.params.idUsuario)
        
        if(!usuario) {
            return res.status(400).json({
                statusCode : 400,
                mensaje    : "Petici??n err??nea, revisa tus par??metros."
            })
        }
        usuario.contrasenia = await usuario.encryptPassword(req.body.contrasenia) 
        await usuario.save();
        return res.status(200).json("Contrase??a actualizada correctamente");

    } catch(error) {
        return res.status(500).json({ 
            mensaje : error 
        });
    }
}

async function obtenerUsuarios(req, res) {
    try {
        const usuarios  = await Usuario.find().populate("idPersona");

        return res.status(200).json({
            mensaje : usuarios
        });
    } catch(error) {
        return res.status(500).json({ 
            mensaje : error 
        });
    }
}

async function editarUsuario(req, res) {
    
    const idUsuario = req.params.idUsuario;
    const bodyData = {
        usuario     : req.body.usuario,
        email       : req.body.email,
        area        : req.body.area,
        rolEditado  : req.body.rolEditado,
        rol         : req.body.rol,
    }
        
    try {
        Joi.assert(bodyData, editarUsuarioSchema);
        const usuario = await Usuario.findById(req.params.idUsuario);

        if(!usuario) {
            return res.status(400).json({
                statusCode : 400,
                mensaje    : "Petici??n err??nea, revisa tus par??metros."
            })
        }

        usuario.usuario     = bodyData.usuario
        usuario.email       = bodyData.email
        usuario.area        = bodyData.area
        usuario.rol         = bodyData.rolEditado
    
        await usuario.save();
        return res.status(200).json({
            mensaje : "Usuario editado correctamente"
        });

    } catch (error) {
        return res.status(500).json({ 
            mensaje : error
        });
    } 
}

async function obtenerUsuarioPorId(req, res) {
    const idUsuario = req.params.idUsuario
    try {
        Joi.assert(idUsuario, Joi.string().required())
        const usuario  = await Usuario.findById(idUsuario).populate("idPersona");

        return res.status(200).json({
            mensaje : usuario
        });
    } catch(error) {
        return res.status(500).json({ 
            mensaje : error 
        });
    }
}

module.exports = {
    crearNuevoUsuario,
    inciarSesionUsuario,
    actualizarContraseniaUsuario,
    obtenerUsuarios,
    editarUsuario,
    obtenerUsuarioPorId
}

