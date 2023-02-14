const llamaGrey = "images/pixel-llamas/llama01.png";
const llamaBrown = "images/pixel-llamas/llama02.png";
const llamaWhite = "images/pixel-llamas/llama03.png";
const hatCowboy = "images/pixel-llamas/hat01.png";
const hatCrown = "images/pixel-llamas/hat02.png";
const hatWizard = "images/pixel-llamas/hat03.png";
const hatNone = "images/pixel-llamas/no-hat.png";
const llama = document.querySelector("#llamaImage");
const hat = document.querySelector("#hatImage");
const colorOption = document.querySelector(".colorSelect");
const hatOption = document.querySelector(".hatSelect");
const llamaName = document.querySelector("#llamaName");
const submit = document.querySelector("#submit");
const userLlamaPage = document.querySelector("#userLlamaPage");
const userLlamaName = document.querySelector("#userLlamaName");
const userId = userLlamaPage.getAttribute("userId");
const editLlama = document.querySelector("#llamaEdit");
const toEditBttn = document.querySelector("#toEditBttn");
const llamaId = userLlamaPage.getAttribute("llamaId");
const userLlamaColor = document.querySelector("#userLlamaColor");
const userLlamaSrc = userLlamaColor.getAttribute("src");
const userLlamaHat = document.querySelector("#userLlamaHat");
const userLlamaHatSrc = userLlamaHat.getAttribute("src");
const happiness = document.querySelector("#userLlamaHappiness");

if (happiness.value == 10 || happiness.value == 9) {
  happiness.setAttribute("class", "green");
} else if (
  happiness.value == 8 ||
  happiness.value == 7 ||
  happiness.value == 6
) {
  happiness.setAttribute("class", "light-green");
} else if (happiness.value == 5 || happiness.value == 4) {
  happiness.setAttribute("class", "yellow");
} else if (happiness.value == 3 || happiness.value == 2) {
  happiness.setAttribute("class", "orange");
  console.log("Orange!");
} else if (happiness.value == 1) {
  happiness.setAttribute("class", "red");
}

function onLoad() {
  if (!userLlamaName.innerHTML) {
    editLlama.style.display = "block";
  } else {
    userLlamaPage.style.display = "block";
  }
}

toEditBttn.addEventListener("click", (event) => {
  event.preventDefault();
  llamaName.value = userLlamaName.innerHTML;
  llama.src = llamaGrey;
  hat.src = hatNone;
  editLlama.style.display = "block";
  userLlamaPage.style.display = "none";
});

function chooseLlama() {
  if (colorOption.value == "grey") {
    llama.src = llamaGrey;
  } else if (colorOption.value == "brown") {
    llama.src = llamaBrown;
  } else if (colorOption.value == "white") {
    llama.src = llamaWhite;
  } else {
    console.log("no such color");
  }
}

function chooseHat() {
  if (hatOption.value == "cowboy") {
    hat.src = hatCowboy;
  } else if (hatOption.value == "crown") {
    hat.src = hatCrown;
  } else if (hatOption.value == "wizard") {
    hat.src = hatWizard;
  } else if (hatOption.value == "none") {
    hat.src = hatNone;
  }
}

colorOption.addEventListener("change", function () {
  chooseLlama();
  console.log(colorOption.value);
});

hatOption.addEventListener("change", function () {
  chooseHat();
  console.log(hatOption.value);
});

submit.addEventListener("click", (event) => {
  event.preventDefault();
  if (!llamaName.value) {
    alert("Please enter a name for your llama.");
    return;
  }
  if (!userLlamaName.innerHTML) {
    let userLlama = {
      name: llamaName.value,
      llama_image: llama.src,
      llama_hat_image: hat.src,
      happiness: 5,
      userId: userId,
    };
    fetch("api/llamas", {
      method: "POST",
      body: JSON.stringify(userLlama),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log(userLlama);
        editLlama.style.display = "none";
        userLlamaPage.style.display = "block";
        location.reload();
      } else {
        alert("Llama could not be created, please try again.");
      }
    });
  } else {
    let userLlama = {
      name: llamaName.value,
      llama_image: llama.src,
      llama_hat_image: hat.src,
    };
    fetch(`api/llamas/${llamaId}`, {
      method: "PUT",
      body: JSON.stringify(userLlama),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log(userLlama);
        editLlama.style.display = "none";
        userLlamaPage.style.display = "block";

        location.reload();
      } else {
        alert("Llama could not be updated, please try again.");
      }
    });
  }
});

onLoad();
