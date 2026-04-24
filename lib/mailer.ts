import nodemailer from "nodemailer";

const requiredEnvKeys = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "INQUIRY_TO_EMAIL",
  "INQUIRY_FROM_EMAIL",
] as const;

export function getMissingMailerEnv() {
  return requiredEnvKeys.filter((key) => !process.env[key]);
}

export async function sendInquiryEmail({
  to,
  from,
  fromName,
  replyTo,
  subject,
  html,
  text,
}: {
  to: string;
  from: string;
  fromName: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });

  const info = await transporter.sendMail({
    from: `"${fromName}" <${from}>`,
    to,
    replyTo,
    subject,
    html,
    text,
  });

  return info;
}
