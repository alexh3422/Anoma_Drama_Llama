document.querySelector("#signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#signupEmail").value;
  const username = document.querySelector("#signupUserName").value;
  const password = document.querySelector("#signupPassword").value;

  if (!email || !username || !password) {
    alert("Please enter your email, username, and password.");
    return;
  }

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  }).then((res) => {
    if (res.ok) {
      location.href = "/home";
    } else {
      alert("Error");
    }
  });
});
