fetch("/sessions", {
  method: "GET",
})
  .then((res) => {
    return res.json();
  })
  .then((sessionData) => {
    fetch(`/api/llamas/user/${sessionData.userId}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((llamaData) => {
        if (llamaData.llama) {
          document.querySelector("#userLlamaColor").src =
            llamaData.llama.llama_image;
          document.querySelector("#userLlamaHat").src =
            llamaData.llama.llama_hat_image;
          document.querySelector("#sideLlamaHappiness").value =
            llamaData.llama.happiness;
          const happiness = document.querySelector("#sideLlamaHappiness");
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
          } else if (happiness.value == 1) {
            happiness.setAttribute("class", "red");
          }
        }
      });
  });

function gifSwitchLlama(time) {
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
  setTimeout(() => {
    if (document.querySelector("#userLlamaColor").src.includes("llama01.gif")) {
      document.querySelector("#userLlamaColor").src =
        "images/pixel-llamas/llama01.png";
    } else if (
      document.querySelector("#userLlamaColor").src.includes("llama02.gif")
    ) {
      document.querySelector("#userLlamaColor").src =
        "images/pixel-llamas/llama02.png";
    } else if (
      document.querySelector("#userLlamaColor").src.includes("llama03.gif")
    ) {
      document.querySelector("#userLlamaColor").src =
        "images/pixel-llamas/llama03.png";
    }
  }, time);
}

function gifSwitchHat(time) {
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
  setTimeout(() => {
    if (document.querySelector("#userLlamaHat").src.includes("hat01.gif")) {
      document.querySelector("#userLlamaHat").src =
        "images/pixel-llamas/hat01.png";
    } else if (
      document.querySelector("#userLlamaHat").src.includes("hat02.gif")
    ) {
      document.querySelector("#userLlamaHat").src =
        "images/pixel-llamas/hat02.png";
    } else if (
      document.querySelector("#userLlamaHat").src.includes("hat03.gif")
    ) {
      document.querySelector("#userLlamaHat").src =
        "images/pixel-llamas/hat03.png";
    }
  }, time);
}

const getPostButton = document.querySelectorAll(".llamaListener");
const sparkles = "images/pixel-llamas/sparkles.gif";

getPostButton.forEach((button) => {
  if (window.location.pathname === "/journal") {
  } else {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      gifSwitchLlama(3000);
      gifSwitchHat(3000);
      document.querySelector("#sparkles").src = sparkles;
      setTimeout(() => {
        document.querySelector("#sparkles").src =
          "images/pixel-llamas/no-hat.png";
      }, 3000);
    });
  }
});

if (!document.querySelector("#speechBubble").innerHTML) {
  document.querySelector(".bubble").style.display = "none";
}
