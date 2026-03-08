import nodemailer from "nodemailer";

const usuario = "ttsilabasa133@gmail.com";
const contra = "nxfl dyqf irfx yhho";

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: usuario,
      pass: contra,
    },
  });

  const mailoptions = {
    from: usuario,
    to: usuario,
    subject: subject,
    html: text,
  };

  try {
    const info = await transporter.sendMail(mailoptions);
  } catch (error) {
    console.log("error: " + error);
  }
};

export default sendEmail;
