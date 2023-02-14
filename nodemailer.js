("use strict");
const nodemailer = require("nodemailer");

async function emailfunction(email, username) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "DramaLlamaCEO@gmail.com",
      pass: process.env.EMAIL_SECRET,
      tls: {
        rejectUnAuthorized: true,
      },
    },
  });

  let info = await transporter.sendMail({
    from: '"DramaLlamaCEO@DramaLlama.com', // sender address
    to: `${email}`, // list of receivers
    subject: "Account Created", // Subject line
    text: `Your account was sucessfully created! Your username is: ${username} `, // plain text body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// emailfunction().catch(console.error);

module.exports = emailfunction;
