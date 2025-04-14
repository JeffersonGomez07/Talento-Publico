const mongoose = require("mongoose");

const schema_crearPuestos = new mongoose.Schema({
  puesto: { type: String, required: true, unique: false },
  horario: { type: String, required: true, unique: false },
  salario: { type: String, required: true, unique: false },
  responsabilidad: { type: String, required: true, unique: false },
  provincia: { type: String, required: true, unique: false },
  canton: { type: String, required: true, unique: false },
  visibilidad: { type: String, required: true, unique: false },
  aptitudes: { type: String, required: true, unique: false },
  habilidades: { type: String, required: true, unique: false },
  detalles: { type: String, required: true, unique: false },
  beneficios: { type: String, required: true, unique: false },
  responsabilidades: { type: String, required: true, unique: false },
  empresa_puesto: { type: String, required: false, unique: false},
});

module.exports = mongoose.model("crearPuesto", schema_crearPuestos, "CrearPuestos");
