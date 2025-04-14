const nodemailer = require("nodemailer");
require("dotenv").config();

const enviar_mail = (pnombre, pcorreo) => {
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
    subject: "Bienvenido a Talento Público",
    html: `
    <table style="max-width: 600px; margin: 0 auto; border-radius: 20px; background-color: #6D8B74;" cellspacing="0" cellpadding="0">
    <tr>
      <td style="padding: 20px;">
        <h1 style="color: #fff; text-align: center;">¡Bienvenido!</h1>
        <p style="color: #fff; text-align: center;">
          ¡Hola <span style="color: #453431; font-weight: bold;">${pnombre}</span>!
          Te damos la bienvenida a la aplicación Talento Público como empresa.
        </p>
        <p style="color: #fff; text-align: center;">Con Talento Público, podrás publicar y gestionar puestos de trabajo en diferentes industrias y niveles. Nuestra plataforma te permitirá conectar con candidatos calificados y encontrar el talento que tu empresa necesita.</p>
        <p style="color: #fff; text-align: center;">¡Empieza a publicar tus puestos y encuentra el talento perfecto para tu equipo!</p>
        <div style="text-align: center;">
          <a href="http://127.0.0.1:5503/public/inicio-sesion.html" style="display: inline-block; background-color: #453431; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 20px;">
            Ver ahora
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

module.exports = { enviar_mail };