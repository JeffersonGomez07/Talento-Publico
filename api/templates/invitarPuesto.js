const nodemailer = require("nodemailer");
require("dotenv").config();

const invitar_aplicar_puesto_mail = (pcorreo, ppuesto, pubicacion) => {
  console.log("Enviando correo a:", pcorreo);
  console.log("Puesto:", ppuesto);

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPSSWD,
    },
    connectionTimeout: 5 * 60 * 1000, // 5 min
    tls: {
      ciphers: "SSLv3",
    },
    logger: true,
    debug: true,
  });

  let mail_options = {
    from: "Codemasters",
    to: pcorreo,
    subject: "¡Tu próximo reto laboral te espera!",
    html: `
        <table style="max-width: 600px; margin: 0 auto; border-radius: 20px; background-color: #6D8B74;;" cellspacing="0" cellpadding="0">
            <tr>
                <td style="padding: 20px;">
                    <h1 style="color: #fff; text-align: center;">¡Desafía tus límites y aplica al puesto!</h1>
                    <h1 style="text-align: center;"><span style="color: #453431;">${ppuesto}</span></h1>
                    <p style="color: #fff; text-align: center;">
                        ¡Hola aventurero/a!
                    </p>
                    <p style="color: #fff; text-align: center;">¿Listo/a para un nuevo desafío? Estamos buscando a alguien como tú para unirse a nuestro equipo y conquistar el puesto de <span style="color: #453431; font-weight: bold;;">${ppuesto}</span> en <span style="color: #453431; font-weight: bold;;">${pubicacion}</span>.</p>
                    <p style="color: #fff; text-align: center;">Prepárate para una emocionante travesía y crecimiento profesional.</p>
                    <div style="text-align: center;">
                        <a href="http://127.0.0.1:5503/public/inicio-sesion.html" style="display: inline-block; background-color: #453431; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 20px;">
                            ¡Aplica Ahora!
                        </a>
                    </div>
                </td>
            </tr>
        </table>
    `,
  };

  transporter.sendMail(mail_options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("El correo se envió correctamente: " + info.response);
    }
  });
};

module.exports = { invitar_aplicar_puesto_mail };