import nodemailer from "nodemailer";
import { EMAIL_ADDRESS, PASSWORD_EMAIL_ADDRESS } from "../constants/email";

export default async (
  to: string,
  title: string,
  message: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      tls: {
        rejectUnauthorized: false,
      },
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_ADDRESS,
        pass: PASSWORD_EMAIL_ADDRESS,
      },
    });

    const mailOptions = {
      from: EMAIL_ADDRESS,
      to: [to],
      subject: title,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(new Error("Erro ao enviar email"));
      } else {
        resolve(info);
      }
    });
  });
};
