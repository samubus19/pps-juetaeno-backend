const {Schema, model} = require("mongoose");
// const bcrypt          = require("bcrypt");

const DocumentoSchema = new Schema({
    nroExpediente : String,
    tipoDocumento : String,
    fechaIngreso  : String,
    fechaSalida   : String,
    estadoActual  : String, 
    descripcion   : String,
    sedeActual    : String,
    }, {
    timestamps     : false
});

module.exports = model("Documento", DocumentoSchema);