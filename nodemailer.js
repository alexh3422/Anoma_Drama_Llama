("use strict");
const nodemailer = require("nodemailer");

async function main() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "DramaLlamaCEO@gmail.com",
      pass: "xamzjbohifbajihy",
      tls: {
        rejectUnAuthorized: true,
      },
    },
  });

  let info = await transporter.sendMail({
    from: '"DramaLlamaCEO@DramaLlama.com', // sender address
    to: "alexander.hallpnw@icloud.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
