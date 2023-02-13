document.querySelector("#allPostsBttn").addEventListener("click", () => {
  location.href = "/home";
});

document.querySelector("#journalBttn").addEventListener("click", () => {
  location.href = "/journal";
});

document.querySelector("#moodsBttn").addEventListener("click", () => {
  location.href = "/mood";
});

// rendering user's llama to the side panel ==============================>

// const userId = sideLlamaCard.getAttribute("userId");
// const sideLlamaColor = document.querySelector("#sideLlamaColor");
// const sideLlamaHat = document.querySelector("#sideLlamaHat");

// fetch(`api/llamas/user/${userId}`, {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// }).then((res) => {
//   if (res.ok) {
//     console.log(userId);
//     sideLlamaColor.src = userId.llama.llama_image;
//     sideLlamaHat.src = userId.llama.llama_hat_image;
//   } else {
//     alert("Could not find user's llama!");
//   }
// });
