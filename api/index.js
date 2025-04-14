const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Vincular carpeta routes EJEMPLO
const inicioSesion = require("./routes/inicioSesion.routes");
const registrarUsuario = require("./routes/registroUsuarios.routes");
const registroEmpresas = require("./routes/registroEmpresas.routes");
const crearPuesto = require("./routes/crearPuestos.routes");
const invitarEmpleado = require("./routes/invitarEmpleado.routes")
const cambiarConstrennaEmpresa = require("./routes/cambiarContrasennaEmpresa.routes")
const cambiarConstrennaUsuario = require("./routes/cambiarContrasennaEmpresaUsuario.routes")
const cambiarConstrennaEmpleado = require("./routes/cambiarContrasennaEmpleado.routes")
const recuperarContrasenna = require("./routes/restablecerContrasenna.routes")
const invitarPuesto = require ("./routes/invitarPuesto.routes")

//Importar dotenv
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongo connect
mongoose.connect(process.env.MONGO_URI);

//Habilitar cors
app.use(cors());
//Sirve las paginas html
app.use(express.static(__dirname + "/public"));

//EJEMPLO
app.use("/api", inicioSesion);
app.use("/api", registrarUsuario);
app.use("/api", registroEmpresas);
app.use("/api", cambiarConstrennaEmpresa);
app.use("/api", cambiarConstrennaUsuario)
app.use("/api", cambiarConstrennaEmpleado)
app.use("/api", recuperarContrasenna)
app.use("/api", crearPuesto);
app.use("/api", invitarEmpleado);
app.use("/api", invitarPuesto);

PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto:${PORT}, conectado a mongo`);
});
