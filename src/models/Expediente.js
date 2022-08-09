const {Schema, model} = require("mongoose");
// const bcrypt          = require("bcrypt");

const ExpedienteSchema = new Schema({
    nro_expediente : String,
    fecha_ingreso  : String,
    fecha_salida   : String,
    destino        : String,
    estado_actual  : String,
    descripcion    : String,
    sede_actual    : String,
    }, {
    timestamps     : false
});

module.exports = model("Expediente", ExpedienteSchema);