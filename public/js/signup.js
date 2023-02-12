document.querySelector("#signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#signupEmail").value;
  const username = document.querySelector("#signupUserName").value;
  const password = document.querySelector("#signupPassword").value;

  if (!email || !username || !password) {
    alert("Please enter your email, username, and password.");
    return;
  }

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email. Please enter a valid email address.");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  const signupObj = {
    email,
    username,
    password,
  };

  fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(signupObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.createdAt && data.id) {
        // Import Nodemailer

        // Define the SMTP transporter
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "DramaLlamaCEO@gmail.com",
            pass: "dramallama123!",
          },
        });

        // Define the email options
        let mailOptions = {
          from: "DramaLlamaCEO@gmail.com",
          to: email,
          subject: "Account Creation Successful",
          text: `Your account has been successfully created. Your username is ${username}.`,
        };

        // Send the email
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        location.href = "/home";
      } else if (data.original.errno === 1062 && data.fields.username) {
        alert("Username already exists. Please choose another one.");
      } else if (data.original.errno === 1062 && data.fields.email) {
        alert("Email already exists. Please choose another one.");
      }
    });
});
