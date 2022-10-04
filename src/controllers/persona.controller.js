const Persona           = require('../database/models/Persona')
const Joi               = require('joi');
const { personaSchema } = require('./schemas/personaSchema');


async function crearNuevaPersona(req, res) {
    const bodyData = {
        nombre          : req.body.nombre,
        apellido        : req.body.apellido,
        tipoDocumento   : req.body.tipoDocumento,
        nroDocumento    : req.body.nroDocumento,
        fechaNacimiento : req.body.fechaNacimiento,
        nroTelefono     : req.body.nroTelefono
    }
    try {
        Joi.assert(bodyData, personaSchema);

        const nuevaPersona = new Persona({
            nombre          : bodyData.nombre,
            apellido        : bodyData.apellido,
            tipoDocumento   : bodyData.tipo_documento,
            nroDocumento    : bodyData.nro_documento,
            fechaNacimiento : bodyData.fecha_nacimiento,
            nroTelefono     : bodyData.nro_telefono
        });
    
        const nroDocumento = await Persona.findOne({nro_documento : bodyData.nro_documento});
        if (nroDocumento) {
            // return res.json("Ya existe este usuario");
            throw new Error("Esta persona ya existe");
    
        } else {
            // nuevoUsuario.contrasenia = await nuevoUsuario.encryptPassword(contrasenia);
            await nuevaPersona.save();
            return res.status(201).json("Persona creada correctamente");
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
    
}

async function obtenerPersonaPorNroDocumento(req, res) {
   try {
        const persona = await Persona.findOne({nro_documento : req.params.nro});
        return res.status(200).json(persona);
   } catch (error) {
        return res.status(500).json(error);
   }
}

module.exports = {
    crearNuevaPersona,
    obtenerPersonaPorNroDocumento
}

