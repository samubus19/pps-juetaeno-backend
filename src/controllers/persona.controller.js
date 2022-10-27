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
            tipoDocumento   : bodyData.tipoDocumento,
            nroDocumento    : bodyData.nroDocumento,
            fechaNacimiento : bodyData.fechaNacimiento,
            nroTelefono     : bodyData.nroTelefono
        });
    
        const persona = await Persona.findOne({nroDocumento : bodyData.nroDocumento});
        console.log(persona)
        if (persona) {
            return res.status(400).json({
                statusCode : 400,
                mensaje    : `Ya existe una persona con el número de documento ${bodyData.nroDocumento}.`
            })
        } else {
            await nuevaPersona.save();
            return res.status(201).json({
                mensaje : "Persona creada correctamente"
            });
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    
}

async function obtenerPersonaPorNroDocumento(req, res) {
   try {
    console.log(req.params.nro)
        const persona = await Persona.findOne({nroDocumento : req.params.nro});
        if(!persona) {
            return res.status(400).json({
                statusCode : 400,
                mensaje    : "Petición errónea, revisa tus parámetros."
            })
        }
        return res.status(200).json({persona : persona});
        
   } catch (error) {
        return res.status(500).json(error.message);
   }
}

module.exports = {
    crearNuevaPersona,
    obtenerPersonaPorNroDocumento
}

