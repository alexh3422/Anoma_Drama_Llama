document.querySelector(".loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const login = document.querySelector("#login").value;
  const password = document.querySelector("#loginPassword").value;

  if (!login || !password) {
    alert("Please enter your login and password.");
    return;
  } 

  const loginObj = {
    login,
    password,
  };

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
      alert("Incorrect login or password. Please try again.");
    }
  });
});

document.querySelector("#signUpBttn").addEventListener("click", () => {
  location.href = "/signup";
});
