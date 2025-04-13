// File: src/lib/mailer.ts

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendBookingEmail({
  to,
  hallName,
  date,
  time,
}: {
  to: string;
  hallName: string;
  date: string;
  time: string;
}) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `Booking Confirmation - ${hallName}`,
    text: `Your booking for ${hallName} on ${date} at ${time} has been confirmed.`,
    html: `<p>Your booking for <strong>${hallName}</strong> on <strong>${date}</strong> at <strong>${time}</strong> has been confirmed.</p>`,
  });

  console.log('Booking email sent:', info.messageId);
}
