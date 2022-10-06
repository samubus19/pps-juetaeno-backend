const {Schema, model} = require("mongoose");
// const bcrypt          = require("bcrypt");

const DocumentoSchema = new Schema({
    nroDocumento  : String,
    tipoDocumento : String,
    historial     : [{
        fechaIngreso  : String,
        fechaSalida   : String,
        estado        : String,
        descripcion   : String,
        sede          : String,
        destino       : String
    }]
    }, {
    timestamps     : false
});

module.exports = model("Documento", DocumentoSchema);