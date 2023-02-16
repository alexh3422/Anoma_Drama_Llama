const options = {
  method: "GET",
  headers: {
    "X-Api-Key": "buG0xgX2GqWW2T6qEcZReDB8ZEd5y74abzvtAJOg",
  },
};

let quoteCount = 0;
let timerInterval;

timerInterval = setInterval(() => {
  quoteCount++;
  if (quoteCount > 2) {
    clearInterval(timerInterval);
  }
  fetch("/sessions", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((sessionData) => {
      fetch("api/users", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          function quotes() {
            switch (res[0].currentMood) {
              case "happy":
                happiness();
                break;
              case "calm":
                happiness();
                break;
              case "sad":
                sad();
                break;
              case "frustrated":
                sad();
                break;
              case "annoyed":
                annoyed();
                break;
              case "embarrassed":
                embarrassed();
                break;
              case "tired":
                tired();
                break;
              case "anxious":
                tired();
                break;
              case "bored":
                bored();
                break;
              case "silly":
                bored();
                break;
              case "disappointed":
                disappointed();
                break;
              case "angry":
                disappointed();
                break;
              case "michievous":
                misch();
                break;
              case "flirty":
                flirty();
                break;
              case "scared":
                scared();
                break;
              case "excited":
                happiness();
                break;
            }
          }
          quotes();
        });
      function happiness() {
        fetch(
          "https://api.api-ninjas.com/v1/quotes?category=happiness",
          options
        )
          .then((quote) => quote.json())
          .then((quote) => speechBubbleFeature(quote[0].quote))
          .catch((err) => console.error(err));
      }

      function sad() {
        fetch(
          "https://api.api-ninjas.com/v1/quotes?category=inspirational",
          options
        )
          .then((quote) => quote.json())
          .then((quote) => speechBubbleFeature(quote[0].quote))
          .catch((err) => console.error(err));
      }

      function annoyed() {
        fetch("https://api.api-ninjas.com/v1/quotes?category=attitude", options)
          .then((quote) => quote.json())
          .then((quote) => speechBubbleFeature(quote[0].quote))
          .catch((err) => console.error(err));
      }

      function embarrassed() {
        fetch(
          "https://api.api-ninjas.com/v1/quotes?category=knowledge",
          options
        )
          .then((quote) => quote.json())
          .then((quote) => speechBubbleFeature(quote[0].quote))
          .catch((err) => console.error(err));
      }

      function tired() {
        fetch("https://api.api-ninjas.com/v1/quotes?category=life", options)
          .then((quote) => quote.json())
          .then((quote) => speechBubbleFeature(quote[0].quote))
          .catch((err) => console.error(err));
      }

      function bored() {
        fetch("https://api.api-ninjas.com/v1/quotes?category=funny", options)
          .then((quote) => quote.json())
          .then((quote) => speechBubbleFeature(quote[0].quote))
          .catch((err) => console.error(err));
      }

      function disappointed() {
        fetch("https://api.api-ninjas.com/v1/quotes?category=good", options)
          .then((quote) => quote.json())
          .then((quote) => speechBubbleFeature(quote[0].quote))
          .catch((err) => console.error(err));
      }

      function misch() {
        fetch("https://api.api-ninjas.com/v1/quotes?category=cool", options)
          .then((quote) => quote.json())
          .then((quote) => speechBubbleFeature(quote[0].quote))
          .catch((err) => console.error(err));
      }

      function flirty() {
        fetch("https://api.api-ninjas.com/v1/quotes?category=love", options)
          .then((quote) => quote.json())
          .then((quote) => speechBubbleFeature(quote[0].quote))
          .catch((err) => console.error(err));
      }

      function scared() {
        fetch("https://api.api-ninjas.com/v1/quotes?category=fear", options)
          .then((quote) => quote.json())
          .then((quote) => speechBubbleFeature(quote[0].quote))
          .catch((err) => console.error(err));
      }
    });
}, 20000);

function speechBubbleFeature(quote) {
  document.querySelector("#speechBubble").innerHTML = quote;
  document.querySelector(".bubble").style.display = "block";
  setTimeout(() => {
    document.querySelector(".bubble").style.display = "none";
  }, 10000);
  // if (quote.length < 50) {
  //   setTimeout(() => {
  //     document.querySelector(".bubble").style.display = "none";
  //   }, 6000);
  // } else if (quote.length < 100) {
  //   setTimeout(() => {
  //     document.querySelector(".bubble").style.display = "none";
  //   }, 8000);
  // } else if (quote.length < 150) {
  //   setTimeout(() => {
  //     document.querySelector(".bubble").style.display = "none";
  //   }, 10000);
  // } else if (quote.length < 200) {
  //   setTimeout(() => {
  //     document.querySelector(".bubble").style.display = "none";
  //   }, 15000);
  // }
}
