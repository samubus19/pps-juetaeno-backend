const {Schema, model} = require("mongoose");

const PersonaSchema = new Schema({
    nombre           : String,
    apellido         : String,
    tipo_documento   : String,
    documento        : String,
    fecha_nacimiento : String,
    nro_telefono     : String,
    }, {
    timestamps       : false
});

module.exports = model("Persona", PersonaSchema);