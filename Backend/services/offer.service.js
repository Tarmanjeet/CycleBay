import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export async function sendOfferEmail(sellerEmail, buyerName, productName) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: sellerEmail,
    subject: 'Offer Received on Your Product',
    html: `
      <p>Hi,</p>
      <p><strong>${buyerName}</strong> is interested in buying your product: <strong>${productName}</strong>.</p>
      <p>Please login to your account and respond to them.</p>
      <p>Thank you!</p>
    `
  };

  await transporter.sendMail(mailOptions);
}