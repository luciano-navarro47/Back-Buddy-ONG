import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASS,
  },
});

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("ERROR: ", error);
//   } else {
//     console.log("Server is ready to take our messages", success);
//   }
// });

export const sendEmail = async (email: string, name: string) => {
  try {
    await transporter.sendMail({
      from: `🐾​ EQUIPO BUDDY-ONG 🐾​ <${process.env.GMAIL_USER}>`,
      subject: "Te damos la bienvenida.",
      to: email,
      html: `
      <b> 
			<h1>Hola ${name}</h1>,
			<p>El equipo de Buddy ONG te quiere dar la bienvenida y ante todo, agradecer tu tiempo por haberte registrado en nuestra comunidad. Nos complace que estés aqui.</p>
      </b>,
  		<p>Saludos, Equipo de Buddy</p>
      `
    });
  } catch (error) {
    console.log("An error ocurred when sending the email: ", error);
  }
};
