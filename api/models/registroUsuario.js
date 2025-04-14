const mongoose = require("mongoose");

const schema_usuario = new mongoose.Schema({
  nombre: { type: String, required: true, unique: false },
  apellido1: { type: String, required: true, unique: false },
  genero: { type: String, required: true, unique: false },
  apellido2: { type: String, required: true, unique: false },
  correo: { type: String, required: true, unique: true },
  contrasenna: { type: String, required: true, unique: false },
  fotoPerfil: { type: String, required: false, unique: false },
  curriculum: { type: String, required: false, unique: false },

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

  estado: { type: String, default: "Activo" },
  tipoUsuario: { type: String, default: "Usuario" },
});

module.exports = mongoose.model("registrarUsuario", schema_usuario, "Usuarios");
