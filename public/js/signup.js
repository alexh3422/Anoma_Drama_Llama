document.querySelector("#signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const signupObj = {
    
    email: document.querySelector("#signupEmail").value,
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
      location.href = "/login";
    } else {
      alert("Error");
    }
  });
});

function hideHeaderFooter() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  header.classList.add("hide");
  footer.classList.add("hide");
}

hideHeaderFooter();
