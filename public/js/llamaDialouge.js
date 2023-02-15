const eatArray = [
  "Yum yum yum yum!",
  "Thanks! That was tasty!",
  "Sooo delicious!",
  "Power levels rising!",
  "Yeah! More please!",
  "You write the tastiest drama!",
];
const randomIndexEat = Math.floor(Math.random() * eatArray.length);
const eatDialouge = eatArray[randomIndexEat];
const deleteArray = [
  "I saw nothing.",
  "Just taking out the trash.",
  "Yeah I didn't like that one either.",
  "Good riddance!",
  "What post? I didn't see a post.",
];
const randomIndexDelete = Math.floor(Math.random() * deleteArray.length);
const deleteDialouge = deleteArray[randomIndexDelete];
const validateBtn2 = document.querySelector("#validateBtn");
const trackMoodBtn2 = document.querySelector("#trackMoodBtn");
const journalBtn = document.querySelector("#submit-post");
const deleteBtn2 = document.querySelector("#deleteBtn");

if (window.location.pathname === "/mood") {
  moodListenerAnalytics();
  multiMoodListener();
  deleteListener();
} else if (window.location.pathname === "/journal") {
  journalPostListener();
  multiMoodListener();
  deleteListener();
} else if (window.location.pathname === "/home") {
  singleMoodListener();
  moodPostListener();
}

function deleteListener() {
  if (deleteBtn2) {
    deleteBtn2.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#speechBubble").innerHTML = deleteDialouge;
      document.querySelector(".bubble").style.display = "block";
      setTimeout(() => {
        document.querySelector(".bubble").style.display = "none";
      }, 5000);
    });
  }
}

function multiMoodListener() {
  trackMoodBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#speechBubble").innerHTML =
      "How are you feeling? You can choose as many moods as you'd like, then just click outside of the wheel when you're finished.";
    document.querySelector(".bubble").style.display = "block";
    setTimeout(() => {
      document.querySelector(".bubble").style.display = "none";
    }, 10000);
  });
}

function singleMoodListener() {
  trackMoodBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#speechBubble").innerHTML =
      "How are you feeling right now? Select a mood, then just click outside of the wheel when you're finished.";
    document.querySelector(".bubble").style.display = "block";
    setTimeout(() => {
      document.querySelector(".bubble").style.display = "none";
    }, 10000);
  });
}

function journalPostListener() {
  journalBtn.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#speechBubble").innerHTML = eatDialouge;
    document.querySelector(".bubble").style.display = "block";
    setTimeout(() => {
      document.querySelector(".bubble").style.display = "none";
    }, 5000);
  });
}

function moodListenerAnalytics() {
  validateBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#speechBubble").innerHTML =
      "Yum, that was tasty! If you want to see your updated analytics, go ahead and REFRESH the page.";
    document.querySelector(".bubble").style.display = "block";
    setTimeout(() => {
      document.querySelector(".bubble").style.display = "none";
    }, 10000);
  });
}

function moodPostListener() {
  validateBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#speechBubble").innerHTML = eatDialouge;
    document.querySelector(".bubble").style.display = "block";
    setTimeout(() => {
      document.querySelector(".bubble").style.display = "none";
    }, 5000);
  });
}
