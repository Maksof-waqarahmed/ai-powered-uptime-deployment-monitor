import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(email: string, message: string) {
  try {
    const info = await transporter.sendMail({
      from: `"AI Monitor" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Website Down Alert",
      text: message,
    });
    console.log("Message sent:", info.messageId);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}
