document.querySelector("#signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const signupObj = {
    email: document.querySelector("#signupEmail").value,
    password: document.querySelector("#signupPassword").value,
    username: document.querySelector("#signupUserName").value,
  };
  console.log(signupObj);
  fetch("/api/users/signup", {
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

// function hideHeaderFooter() {
//   const header = document.getElementById("header");
//   const aside = document.getElementById("aside");
//   const footer = document.getElementById("footer");
//   header.classList.add("hide");
//   aside.classList.add("hide");
//   footer.classList.add("hide");
// }

// hideHeaderFooter();
