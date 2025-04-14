const express = require("express");
const Usuario = require("../models/registroUsuario");
const router = express.Router();

router.post("/validarContrasennaAnteriorYActualizarUsuario", async (req, res) => {
  const { _id, contrasennaAnterior, contrasennaNueva } = req.body;

  try {
    const usuario = await Usuario.findById(_id);

    if (!usuario) {
      return res.json({
        resultado: false,
        msg: "Empresa no encontrada"
      });
    }

    if (usuario.contrasenna === contrasennaAnterior) {
      // La contraseña anterior coincide, actualizamos la contraseña nueva
      usuario.contrasenna = contrasennaNueva;
      await usuario.save();

      res.json({
        resultado: true,
        msg: "Contraseña actualizada exitosamente"
      });
    } else {
      res.json({
        resultado: false,
        msg: "Contraseña anterior incorrecta"
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      resultado: false,
      msg: "Error al validar o actualizar la contraseña"
    });
  }
});

module.exports = router;
