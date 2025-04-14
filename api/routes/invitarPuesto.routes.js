const express = require("express");
const router = express.Router();
const mailer = require("../templates/invitarPuesto");

router.post("/invitarPuesto", async (req, res) => {
  console.log("Recibida solicitud POST en /invitarPuesto");
  const cuerpoPeticion = req.body;

  try {
    const { correo, puesto, ubicacion } = cuerpoPeticion;

    // Llama a la función de envío de correo electrónico
    mailer.invitar_aplicar_puesto_mail(correo, puesto, ubicacion);

    res.json({
      resultado: true,
      msg: "Correo de invitación enviado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultado: false,
      msg: "Error al procesar la solicitud",
    });
  }
});

module.exports = router;
