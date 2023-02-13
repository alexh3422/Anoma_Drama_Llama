const llamaGrey = "images/pixel-llamas/llama01.gif";
const llamaBrown = "images/pixel-llamas/llama02.gif";
const llamaWhite = "images/pixel-llamas/llama03.gif";
const hatCowboy = "images/pixel-llamas/hat01.gif";
const hatCrown = "images/pixel-llamas/hat02.gif";
const hatWizard = "images/pixel-llamas/hat03.gif";
const hatNone = "images/pixel-llamas/no-hat.gif";
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

// if user doesn't have a Llama yet, direct to llama edit
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
  llama.src = userLlamaSrc;
  hat.src = userLlamaHatSrc;
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
        llamaHappiness();
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

//console.log llama happiness level
function llamaHappiness() {
  if (userLlamaName.innerHTML) {
    let llamaHappiness = {
      happiness: 0,
    };
    fetch(`api/llamas/${llamaId}`, {
      method: "PUT",
      body: JSON.stringify(llamaHappiness),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log(llamaHappiness);
      } else {
        alert("Llama could not be updated, please try again.");
      }
    });
  }
}

//console.log llama happiness level

onLoad();
