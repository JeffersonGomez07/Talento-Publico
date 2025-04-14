const nodemailer = require("nodemailer");
require("dotenv").config();

const enviar_mail_recuperacion = (pnombre, pcorreo, presetLink) => {
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
    subject: "Recuperación de Contraseña - Talento Público",
    html: `
      <table style="max-width: 600px; margin: 0 auto; border-radius: 20px; background-color: #6D8B74;" cellspacing="0" cellpadding="0">
        <tr>
          <td style="padding: 20px;">
            <h1 style="color: #fff; text-align: center;">Recuperación de Contraseña</h1>
            <p style="color: #fff; text-align: center;">
              ¡Hola <span style="color: #453431; font-weight: bold;">${pnombre}</span>!
              Has solicitado restablecer tu contraseña en Talento Público.
            </p>
            <p style="color: #fff; text-align: center;">Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <p style="color: #fff; text-align: center;">
              <a href="${presetLink}" style="display: inline-block; background-color: #453431; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 20px;"">Restablecer Contraseña</a>
            </p>
            <p style="color: #fff; text-align: center;">Si no has solicitado esto, puedes ignorar este correo.</p>
            <div style="text-align: center;">
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

module.exports = { enviar_mail_recuperacion };
