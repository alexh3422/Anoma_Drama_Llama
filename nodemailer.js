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
    subject: "Welcome! - Account Created", // Subject line
    text: `Your Anoma Drama Llama account was sucessfully created! Your username is: ${username} 

    You should have been redirected to the edit llama page after signing up to create your llama.
    If you have not created your llama yet, you can do so by clicking Llama in the side menu bar (top menu if on mobile).
    
    Be sure to keep feeding your llama your drama! It gains happiness points for every journal post and mood entry. It will start losing
    happiness and become a sad llama if you neglect to feed it.

    To create a mood-entry, you can navigate to the ALL POSTS or MY MOODS page from the top menu bar.
    To create a journal post you can navigate to the MY JOURNAL page from the top menu bar.

    NOTE: You can select to post publicly, anonymously, or privately. If you select to post privately, only you will be able to see the post.
    If you select to post anonymously, your post will be visible to everyone but your username will not be displayed. If you select to post publicly,
    your post will be visible to everyone and your username will be displayed.

    You can view other users' public posts by navigating to the ALL POSTS page from the top menu bar. 
    
    As you start posting you can check out your mood analytics by clicking "Your Moods" at the top of the page.

    You can also edit your llama at anytime by navigating to the Llama page from the side menu bar (top menu if on mobile).

    If you have any questions or concerns, please feel free to reach out to us at DramaLlamaCeo@gmail.com

    https://anomallama.herokuapp.com/ - Anoma Drama Llama App

    best, 

    The Drama Llama Team`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  console.log("email sent");
}

// emailfunction().catch(console.error);

module.exports = emailfunction;
