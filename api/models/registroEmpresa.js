const mongoose = require("mongoose");

const schema_empresa = new mongoose.Schema({
  nombre: { type: String, required: true, unique: false },
  correo: { type: String, required: true, unique: true },
  contrasenna: { type: String, required: true, unique: false },
  fotoPerfil: { type: String, required: false, unique: false },
  estado: { type: String, default: "Activo" },
  tipoUsuario: { type: String, default: "Administrador" }
});

module.exports = mongoose.model("registroEmpresa", schema_empresa, "Empresas");
