const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

document.getElementById("signUpBttn").addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "/";
});

function errorMsg(alert) {
  modal.style.display = "block";
  modalContent.innerHTML = alert;
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

document.querySelector("#signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#signupEmail").value;
  const username = document.querySelector("#signupUserName").value;
  const password = document.querySelector("#signupPassword").value;

  if (!email || !username || !password) {
    errorMsg("Please enter your email, username, and password.");
    return;
  }

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    errorMsg("Invalid email. Please enter a valid email address.");
    return;
  }

  if (password.length < 8) {
    errorMsg("Password must be at least 8 characters long.");
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
        location.href = "/llama";
      } else if (data.original.errno === 1062 && data.fields.username) {
        errorMsg("Username already exists. Please choose another one.");
      } else if (data.original.errno === 1062 && data.fields.email) {
        errorMsg("Email already exists. Please choose another one.");
      }
    });
});
