const mongoose = require("mongoose");

const schema_usuario = new mongoose.Schema({
  nombre: { type: String, required: true, unique: false },
  apellido1: { type: String, required: true, unique: false },
  apellido2: { type: String, required: true, unique: false },
  contrasenna: { type: String, required: true, unique: false },
  tipoUsuario: { type: String, required: true, unique: false },
  correo: { type: String, required: true, unique: true },
  empresa_empleado: { type: String, required: false, },
  estado: { type: String, default: "Activo" }
});

module.exports = mongoose.model("invitarEmpleado", schema_usuario, "InvitarEmpleados");
