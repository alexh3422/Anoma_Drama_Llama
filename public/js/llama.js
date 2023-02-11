const llamaGrey = "images/pixel-llamas/llama01.png";
const llamaBrown = "images/pixel-llamas/llama02.png";
const llamaWhite = "images/pixel-llamas/llama03.png";

const hatCowboy = "images/pixel-llamas/hat01.png";
const hatCrown = "images/pixel-llamas/hat02.png";
const hatWizard = "images/pixel-llamas/hat03.png";

const llama = document.querySelector("#llamaImage");
const hat = document.querySelector("#hatImage");
const colorOption = document.querySelector(".colorSelect");
const hatOption = document.querySelector(".hatSelect");

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
    document.querySelector("#hatImage").style.display("none");
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
