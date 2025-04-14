const mongoose = require("mongoose");

const schema_aplicar = new mongoose.Schema({
  puesto: { type: String, required: true, unique: false },
  empresa: { type: String, required: true, unique: false },
  ubicacion: { type: String, required: true, unique: false },
  nombre: { type: String, required: true, unique: false },
  apellido1: { type: String, required: true, unique: false },
  apellido2: { type: String, required: true, unique: false },
  correo: { type: String, required: true, unique: false },
  estudios: [
    {
      estudio: { type: String, required: false },
      universidad: { type: String, required: false },
      annoInicio: { type: String, required: false },
      annoFinalizacion: { type: String, required: false },
    }
  ],
  experiencias: [
    {
      empresa: { type: String, required: false },
      puesto: { type: String, required: false },
      annoInicioEmp: { type: String, required: false },
      annoFinalizacionEmp: { type: String, required: false },
    }
  ],
  fecha: { type: Date, default: Date.now },
  estado: { type: String, default: "Revisión" }
});

module.exports = mongoose.model("aplicar", schema_aplicar, "Aplicaciones");