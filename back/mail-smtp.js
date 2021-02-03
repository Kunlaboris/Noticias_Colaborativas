"use strict";

const nodemailer = require("nodemailer");

const {
  HTTP_SERVER_DOMAIN,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
} = process.env;

const transporter = nodemailer.createTransport({
  port: SMTP_PORT,
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  secure: false,
});

async function sendEmailRegistration(name, email, verificationCode) {
  const linkActivation = `${HTTP_SERVER_DOMAIN}/api/v1/users/activation?verification_code=${verificationCode}`;
  console.log("linkActivation", linkActivation);

  const mailData = {
    from: "info@kunlaboris.com",
    to: email,
    subject: "Bienvenid@ a Kunlaboris",
    text: `Hi ${name}, To confirm the account activate it here: ${linkActivation}`,
    html: `Hi ${name}, To confirm the account <a href="${linkActivation}">activate it here</a>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendEmailCorrectValidation(name, email) {
  const mailData = {
    from: "anamariavaduva29@gmail.com",
    to: email,
    subject: "[Kunlaboris] Account Activated!",
    text: `Hi ${name},\n Your account was be activated. Enjoy our web`,
    html: `<p>Hi ${name},</p><p>Your account was be activated. Enjoy our web!</p>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

module.exports = {
  sendEmailRegistration,
  sendEmailCorrectValidation,
};
