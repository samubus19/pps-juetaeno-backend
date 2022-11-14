const {Schema, model} = require("mongoose");
// const bcrypt          = require("bcrypt");

const DocumentoSchema = new Schema({
    nroDocumento  : String,
    tipoDocumento : String,
    descripcion   : String,
    historial     : [{
        fechaIngreso      : String,
        fechaSalida       : String,
        estado            : String,
        sede              : String,
        idUsuarioFirmante : {
            type : Schema.Types.ObjectId,
            ref  : "Usuario"
        }
    }]
    }, {
    timestamps     : false
});

module.exports = model("Documento", DocumentoSchema);

//agregar comprobacion de documentos inactivos