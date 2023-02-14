fetch("/sessions", {
  method: "GET",
})
  .then((res) => {
    return res.json();
  })
  .then((sessionData) => {
    console.log(sessionData);
    fetch(`/api/llamas/user/${sessionData.userId}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((llamaData) => {
        console.log(llamaData);
        document.querySelector("#userLlamaColor").src =
          llamaData.llama.llama_image;
        document.querySelector("#userLlamaHat").src =
          llamaData.llama.llama_hat_image;
        document.querySelector("#sideLlamaHappiness").value =
          llamaData.llama.happiness;
      });
  });

function gifSwitchLlama() {
  if (document.querySelector("#userLlamaColor").src.includes("llama01.png")) {
    document.querySelector("#userLlamaColor").src =
      "images/pixel-llamas/llama01.gif";
  } else if (
    document.querySelector("#userLlamaColor").src.includes("llama02.png")
  ) {
    document.querySelector("#userLlamaColor").src =
      "images/pixel-llamas/llama02.gif";
  } else if (
    document.querySelector("#userLlamaColor").src.includes("llama03.png")
  ) {
    document.querySelector("#userLlamaColor").src =
      "images/pixel-llamas/llama03.gif";
  }
}

function gifSwitchHat() {
  if (document.querySelector("#userLlamaHat").src.includes("hat01.png")) {
    document.querySelector("#userLlamaHat").src =
      "images/pixel-llamas/hat01.gif";
  } else if (
    document.querySelector("#userLlamaHat").src.includes("hat02.png")
  ) {
    document.querySelector("#userLlamaHat").src =
      "images/pixel-llamas/hat02.gif";
  } else if (
    document.querySelector("#userLlamaHat").src.includes("hat03.png")
  ) {
    document.querySelector("#userLlamaHat").src =
      "images/pixel-llamas/hat03.gif";
  }
}

const getPostButton = document.querySelectorAll(".llamaListener");
console.log(getPostButton);
const sparkles = "images/pixel-llamas/sparkles.gif";

getPostButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    gifSwitchLlama();
    gifSwitchHat();
    document.querySelector("#sparkles").src = sparkles;
  });
});
