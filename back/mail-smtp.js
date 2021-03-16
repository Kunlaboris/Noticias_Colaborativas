'use strict';

// const sendgrid = require('@sendgrid/mail');

// async function sendEmailRegistration({ email, name, verificationCode }) {
//   const { HTTP_SERVER_DOMAIN, SENDGRID_KEY, SENDGRID_MAIL_FORM } = process.env;

//   const linkActivation = `${HTTP_SERVER_DOMAIN}/api/v1/users/activation?verification_code=${verificationCode}`;
//   console.log('linkActivation', linkActivation);
//   sendgrid.setApiKey(SENDGRID_KEY);
//   const contentEmail = {
//     from: SENDGRID_MAIL_FORM,
//     to: email,
//     cc: email,
//     subject: 'Bienvenido a Cars App',
//     text: `Hola ${name}.\nBienvenido a nuestra app. Confirma tu usuario ${linkActivation}\n`,
//     html: `<h1>Hola ${name}.</h1><p>Bienvenido a nuestra app.
//     Confirma tu usuario <a href="${linkActivation}">aquí</a></p>`,
//   };
//   await sendgrid.send(contentEmail);
// }

// module.exports = {
//   sendEmailRegistration,
// };

////////////////////////////////////////////////// opcion 2

// const { sendEmailRegistration } = require('../../../mail-smtp');

const nodemailer = require('nodemailer');

const { HTTP_SERVER_DOMAIN, SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  port: SMTP_PORT,
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  secure: false,
});

async function sendEmailRegistration(email, name, verificationCode) {
  const linkActivation = `${HTTP_SERVER_DOMAIN}/api/v1/users/activation?verification_code=${verificationCode}`;
  console.log('linkActivation', linkActivation);

  const mailData = {
    from: 'info@carsapp.com',
    to: email,
    subject: 'Welcome to Kunlaboris',
    text: `Hi ${name}, To confirm the account activate it here: ${linkActivation}`,
    html: `Hi ${name}, To confirm the account <a href="${linkActivation}">activate it here</a>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendEmailCorrectValidation(name, email) {
  const mailData = {
    from: 'kunla@kunlaboris.com',
    to: email,
    subject: '[Kunlaboris] Account Activated!',
    text: `Hi ${name},\n Your account was be activated. Enjoy our apps`,
    html: `<p>Hi ${name},</p><p>Your account was be activated. Enjoy our app!</p>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendEmailWithAttachedFiles(email) {
  const mailData = {
    from: 'kunla@kunlaboris.com',
    to: email,
    subject: 'Emails with files attached',
    text: 'Email with files attached',
    html: '<b>Hey there! </b><br>Email with files attached<br/>',
    attachments: [
      {
        // file on disk as an attachment
        filename: 'nodemailer.png',
        path: 'nodemailer.png',
      },
      {
        // file on disk as an attachment
        filename: 'text_file.txt',
        path: 'text_file.txt',
      },
    ],
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

module.exports = {
  sendEmailRegistration,
  sendEmailCorrectValidation,
  sendEmailWithAttachedFiles,
};
