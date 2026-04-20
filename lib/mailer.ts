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

export function createInquiryTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}
