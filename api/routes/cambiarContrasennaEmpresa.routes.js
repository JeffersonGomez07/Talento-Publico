const express = require("express");
const Empresa = require("../models/registroEmpresa");
const router = express.Router();

router.post("/validarContrasennaAnteriorYActualizar", async (req, res) => {
  const { _id, contrasennaAnterior, contrasennaNueva } = req.body;

  try {
    const empresa = await Empresa.findById(_id);

    if (!empresa) {
      return res.json({
        resultado: false,
        msg: "Contraseña anterior incorrecta"
      });
    }

    if (empresa.contrasenna === contrasennaAnterior) {
      // La contraseña anterior coincide, actualizamos la contraseña nueva
      empresa.contrasenna = contrasennaNueva;
      await empresa.save();

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
