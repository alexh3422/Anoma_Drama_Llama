const dialougeArray = ["Yum!", "Thanks! That was tasty!", "Sooo delicious!"];

const validateBtn2 = document.querySelector("#validateBtn");
const trackMoodBtn2 = document.querySelector("#trackMoodBtn");
const journalBtn = document.querySelector("#submit-post");
const deleteBtn2 = document.querySelector("#deleteBtn");
console.log(document.querySelector("#deleteBtn"));

if (window.location.pathname === "/mood") {
  validateBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#speechBubble").innerHTML =
      "Yum, that was tasty! If you want to see your updated analytics, go ahead and REFRESH the page.";
    document.querySelector(".bubble").style.display = "block";
    setTimeout(() => {
      document.querySelector(".bubble").style.display = "none";
    }, 10000);
  });
  trackMoodBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#speechBubble").innerHTML =
      "How are you feeling? You can choose as many moods as you'd like, then just click outside of the wheel when you're finished.";
    document.querySelector(".bubble").style.display = "block";
    setTimeout(() => {
      document.querySelector(".bubble").style.display = "none";
    }, 10000);
  });
} else if (window.location.pathname === "/journal") {
  journalBtn.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#speechBubble").innerHTML = "Yum!";
    document.querySelector(".bubble").style.display = "block";
    setTimeout(() => {
      document.querySelector(".bubble").style.display = "none";
    }, 5000);
  });
  trackMoodBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#speechBubble").innerHTML =
      "How are you feeling? You can choose as many moods as you'd like, then just click outside of the wheel when you're finished.";
    document.querySelector(".bubble").style.display = "block";
    setTimeout(() => {
      document.querySelector(".bubble").style.display = "none";
    }, 10000);
  });
  deleteListener();
} else if (window.location.pathname === "/home") {
  trackMoodBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#speechBubble").innerHTML =
      "How are you feeling right now? Select a mood, then just click outside of the wheel when you're finished.";
    document.querySelector(".bubble").style.display = "block";
    setTimeout(() => {
      document.querySelector(".bubble").style.display = "none";
    }, 10000);
  });
  validateBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#speechBubble").innerHTML = "Yum!";
    document.querySelector(".bubble").style.display = "block";
    setTimeout(() => {
      document.querySelector(".bubble").style.display = "none";
    }, 5000);
  });
}

function deleteListener() {
  if (deleteBtn2) {
    deleteBtn2.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#speechBubble").innerHTML = "I saw nothing.";
      document.querySelector(".bubble").style.display = "block";
      setTimeout(() => {
        document.querySelector(".bubble").style.display = "none";
      }, 5000);
    });
  }
}
