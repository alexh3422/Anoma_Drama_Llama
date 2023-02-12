const llamaBrown01 = "images/pixel-llamas/llama-brown-01.png";
const llamaBrown02 = "images/pixel-llamas/llama-brown-02.png";
const llamaBrown03 = "images/pixel-llamas/llama-brown-03.png";
const llamaBrown04 = "images/pixel-llamas/llama-brown-04.png";

const llamaGrey01 = "images/pixel-llamas/llama-grey-01.png";
const llamaGrey02 = "images/pixel-llamas/llama-grey-02.png";
const llamaGrey03 = "images/pixel-llamas/llama-grey-03.png";
const llamaGrey04 = "images/pixel-llamas/llama-grey-04.png";

const llamaWhite01 = "images/pixel-llamas/llama-white-01.png";
const llamaWhite02 = "images/pixel-llamas/llama-white-02.png";
const llamaWhite03 = "images/pixel-llamas/llama-white-03.png";
const llamaWhite04 = "images/pixel-llamas/llama-white-04.png";

function back() {
  const llama = document.getElementById("llamaImage");

  if (llama.src == llamaBrown01) {
    llama.src = llamaWhite04;
  } else if (llama.src == llamaBrown02) {
    llama.src = llamaBrown01;
  } else if (llama.src == llamaBrown03) {
    llama.src = llamaBrown02;
  } else if (llama.src == llamaBrown04) {
    llama.src = llamaBrown03;
  } else if (llama.src == llamaGrey01) {
    llama.src = llamaBrown04;
  } else if (llama.src == llamaGrey02) {
    llama.src = llamaGrey01;
  } else if (llama.src == llamaGrey03) {
    llama.src = llamaGrey02;
  } else if (llama.src == llamaGrey04) {
    llama.src = llamaGrey03;
  } else if (llama.src == llamaWhite01) {
    llama.src = llamaGrey04;
  } else if (llama.src == llamaWhite02) {
    llama.src = llamaWhite01;
  } else if (llama.src == llamaWhite03) {
    llama.src = llamaWhite02;
  } else if (llama.src == llamaWhite04) {
    llama.src = llamaWhite03;
  }
}
