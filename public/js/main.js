const url = location.href;

document.querySelector("#allPostsBttn").addEventListener("click", () => {
  location.href = "/home";
});

document.querySelector("#journalBttn").addEventListener("click", () => {
  location.href = "/journal";
});

document.querySelector("#moodsBttn").addEventListener("click", () => {
  location.href = "/mood";
});

if (window.location.pathname === ("/llama")) {
  document.querySelector("#sideLlamaCard").style.display = "none";
}



// if (!document.querySelector("#userLlamaColor")) {
//   document.querySelector("#rightSide").style.display = "none";
//   console.log("test");
// }

