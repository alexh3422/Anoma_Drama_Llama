// This runs with a node command of "node mailer.js" ,
//so every time a user is created, that command will need to be run

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const API_KEY = "3d19980f4b1e36bd1cb4c1387049e779-d1a07e51-62c03cfe";

DOMAIN = "sandbox92d68365e45f4f8dabec158cb5b45a01.mailgun.org";

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "api",
  key: API_KEY,
});

const messageData = {
  from: "Head Llama @ Anomma Drama Llama<ceo@dramallama.com>",
  to: "alexh25@uw.edu", // this will eventually be the user's email
  subject: "Account Created",
  text: "Your account was successfully created!",
};

client.messages
  .create(DOMAIN, messageData)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
