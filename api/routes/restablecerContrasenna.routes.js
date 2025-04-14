const express = require("express");
const router = express.Router();
const Empleado = require("../models/invitarEmpleado");
const Empresa = require("../models/registroEmpresa");
const Usuario = require("../models/registroUsuario");
const mailer = require("../templates/correoRestablecerContrasenna");

router.post("/enviarRestablecerLink", async (req, res) => {
  const cuerpoPeticion = req.body;

  try {
    let user;

    const foundEmpleado = await Empleado.findOne({ correo: cuerpoPeticion.correo });
    if (foundEmpleado) {
      user = foundEmpleado;
    } else {
      const foundEmpresa = await Empresa.findOne({ correo: cuerpoPeticion.correo });
      if (foundEmpresa) {
        user = foundEmpresa;
      } else {
        const foundUsuario = await Usuario.findOne({ correo: cuerpoPeticion.correo });
        if (foundUsuario) {
          user = foundUsuario;
        } else {
          throw new Error("Correo no registrado en ninguna categoría de usuario");
        }
      }
    }

    const resetLink = `http://127.0.0.1:5503/public/restablecer-contrasenna.html#/restablecerContrasenna?userType=${user.tipoUsuario}&userId=${user._id}`;

    mailer.enviar_mail_recuperacion(user.nombre, user.correo, resetLink);

    res.json({
      resultado: true,
      msg: "Enlace de recuperación enviado",
    });
  } catch (error) {
    console.error(error);
    res.json({
      resultado: false,
      msg: "Error al enviar el enlace de recuperación",
    });
  }
});



router.put("/restablecerContrasenna/:userType/:userId", async (req, res) => {
  const userType = req.params.userType;
  const userId = req.params.userId;
  const { contrasennaNueva, confirmarContrasenna } = req.body;

  if (contrasennaNueva !== confirmarContrasenna) {
    return res.json({
      resultado: false,
      msg: "Las contraseñas no coinciden",
    });
  }

  try {
    let user;

    if (userType === "Reclutador" || userType === "Manager") {
      user = await Empleado.findById(userId);
    } else if (userType === "Administrador") {
      user = await Empresa.findById(userId);
    } else if (userType === "Usuario") {
      user = await Usuario.findById(userId);
    }

    if (!user) {
      return res.json({
        resultado: false,
        msg: "Usuario no encontrado",
      });
    }

    user.contrasenna = contrasennaNueva;
    await user.save();

    res.json({
      resultado: true,
      msg: "Contraseña actualizada exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.json({
      resultado: false,
      msg: "Error al actualizar la contraseña",
    });
  }
});


module.exports = router;
