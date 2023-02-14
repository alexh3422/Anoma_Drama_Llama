console.log(document.querySelector("#submit-post"));

const journalBtn = document.querySelector("#submit-post");

journalBtn.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#speechBubble").innerHTML = "Yum!";
  document.querySelector(".bubble").style.display = "block";
  setTimeout(() => {
    document.querySelector(".bubble").style.display = "none";
  }, 5000);
});
