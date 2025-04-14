const express = require("express");
const Empleado = require("../models/invitarEmpleado");
const router = express.Router();

router.post("/validarContrasennaAnteriorYActualizarEmpleado", async (req, res) => {
  const { _id, contrasennaAnterior, contrasennaNueva } = req.body;

  try {
    const empleado = await Empleado.findById(_id);

    if (!empleado) {
      return res.json({
        resultado: false,
        msg: "Contraseña anterior incorrecta"
      });
    }

    if (empleado.contrasenna === contrasennaAnterior) {
      // La contraseña anterior coincide, actualizamos la contraseña nueva
      empleado.contrasenna = contrasennaNueva;
      await empleado.save();

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
