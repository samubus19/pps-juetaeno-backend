const Persona                 = require('../database/models/Persona')
const Joi                     = require('joi');
const { personaSchema, 
        editarPersonaSchema } = require('./schemas/personaSchema');


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

async function editarPersona(req, res) {
    const idPersona = req.params.idPersona;
    const bodyData = {
        nombre          : req.body.nombre,
        apellido        : req.body.apellido,
        fechaNacimiento : req.body.fechaNacimiento,
        nroTelefono     : req.body.nroTelefono,
    }
        
    try {
        Joi.assert(bodyData, editarPersonaSchema);
        const persona = await Persona.findById(idPersona);
        console.log(persona)
        if(!persona) {
            return res.status(400).json({
                statusCode : 400,
                mensaje    : "Petición errónea, revisa tus parámetros."
            })
        }

        persona.nombre          = bodyData.nombre
        persona.apellido        = bodyData.apellido
        persona.fechaNacimiento = bodyData.fechaNacimiento
        persona.nroTelefono     = bodyData.nroTelefono

        await persona.save();
        return res.status(200).json({
            mensaje : "Persona editada correctamente"
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
            mensaje : error
        });
    } 
}


async function eliminarPersona(req, res) {
    const idPersona = req.params.idPersona;
    try {
        const persona = await Persona.findById(idPersona);
        if(!persona) {
            return res.status(400).json({
                statusCode : 400,
                mensaje    : "Petición errónea, revisa tus parámetros."
            })
        }

        await persona.deleteOne({_id : idPersona});
        return res.status(200).json({
            mensaje : "Persona eliminada correctamente"
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
            mensaje : error
        });
    } 
}

module.exports = {
    crearNuevaPersona,
    obtenerPersonaPorNroDocumento,
    editarPersona,
    eliminarPersona
}

