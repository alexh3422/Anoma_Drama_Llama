document.querySelector("#signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const signupObj = {
    email: document.querySelector("#signupEmail").value,
    username: document.querySelector("#signupUserName").value,
    password: document.querySelector("#signupPassword").value,
  };
  console.log(signupObj);
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
