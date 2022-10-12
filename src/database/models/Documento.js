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
        destino           : String,
        idUsuarioFirmante : String
    }]
    }, {
    timestamps     : false
});

module.exports = model("Documento", DocumentoSchema);