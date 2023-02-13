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
      });
  });
