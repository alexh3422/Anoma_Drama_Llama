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

if (url.includes("Llama")) {
  document.querySelector("#sideLlamaCard").style.display = "none";
}
