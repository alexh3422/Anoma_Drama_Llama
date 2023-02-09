document.querySelector(".loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const loginObj = {
    email: document.querySelector(".loginEmail").value,
    password: document.querySelector(".loginPassword").value,
  };
  console.log(loginObj);
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(loginObj),
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

const createAccount = document.getElementById("signUpBttn");

createAccount.addEventListener("click", function () {
  location.replace("/signup");
  console.log("Test");
});
