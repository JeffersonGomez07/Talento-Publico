const nodemailer = require("nodemailer");
require("dotenv").config();

const enviar_mail = (pnombre, pcontrasenna,pPuesto,pcorreo,pEmpresaEmpleado) => {
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
    subject: "Haz sido selecccionado por nuestra empresa",
    html: `
    <table style="max-width: 600px; margin: 0 auto; border-radius: 20px; background-color: #6D8B74;" cellspacing="0" cellpadding="0">
    <tr>
      <td style="padding: 20px;">
        <h1 style="color: #fff; text-align: center;">¡Felicitaciones, ${pnombre}!</h1>
        <p style="color: #fff; text-align: center;">
          Hola <span style="color: #453431; font-weight: bold;">${pnombre}</span>,
          ¡has sido seleccionado para el puesto de <span style="color: #453431; font-weight: bold;">${pPuesto}</span> en ${pEmpresaEmpleado}!
        </p>
        <p style="color: #fff; text-align: center;">Estamos emocionados de ofrecerte una increíble oportunidad de trabajo en nuestra organización. Tu habilidades y experiencia son lo que estábamos buscando.</p>
        <p style="color: #fff; text-align: center;">Hemos generado una contraseña temporal para que puedas acceder a tu cuenta:</p>
        <p style="color: #fff; text-align: center; font-size: 24px; font-weight: bold;">${pcontrasenna}</p>
        <p style="color: #fff; text-align: center;">Por favor, cambia tu contraseña tan pronto como inicies sesión.</p>
        <div style="text-align: center;">
          <a href="http://127.0.0.1:5503/public/inicio-sesion.html" style="display: inline-block; background-color: #453431; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 20px;">
            Iniciar sesión
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