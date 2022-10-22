const {Schema, model} = require("mongoose");

const PersonaSchema = new Schema({
    nombre          : String,
    apellido        : String,
    tipoDocumento   : String,
    nroDocumento    : String,
    fechaNacimiento : String,
    nroTelefono     : String,
    }, {
    timestamps       : false
});

module.exports = model("Persona", PersonaSchema);