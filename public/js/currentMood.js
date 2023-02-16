const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

function errorMsg(alert) {
  modal.style.display = "block";
  modalContent.innerHTML = alert;
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

class Emotion {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.selected = false;
  }

  makeSelection() {
    document.querySelector(`#${this.name}`).addEventListener("click", () => {
      const color = document.querySelector(`.${this.color}`);
      if (!this.selected) {
        color.style.opacity = "100%";
        this.selected = true;
      } else {
        color.style.opacity = "30%";
        this.selected = false;
      }
    });
  }

  makesingleSelection(allEmotions) {
    document
      .querySelector(`#${this.name}`)
      .addEventListener("click", (event) => {
        event.preventDefault();
        const color = document.querySelector(`.${this.color}`);
        allEmotions.forEach((emotion) => {
          if (emotion.name != this.name) {
            document.querySelector(`.${emotion.color}`).style.opacity = "30%";
            emotion.selected = false;
          }
        });
        if (!this.selected) {
          color.style.opacity = "100%";
          this.selected = true;
        } else {
          color.style.opacity = "30%";
          this.selected = false;
        }
      });
  }

  nameOnhover() {
    document
      .querySelector(`#${this.name}`)
      .addEventListener("mouseover", () => {
        document.querySelector(`#moodName`).textContent = this.name;
      });
  }
}

const emotions = [
  new Emotion("tired", "color01"),
  new Emotion("happy", "color02"),
  new Emotion("calm", "color03"),
  new Emotion("embarrassed", "color04"),
  new Emotion("disappointed", "color05"),
  new Emotion("scared", "color06"),
  new Emotion("anxious", "color07"),
  new Emotion("frustrated", "color08"),
  new Emotion("angry", "color09"),
  new Emotion("flirty", "color10"),
  new Emotion("silly", "color11"),
  new Emotion("mischievous", "color12"),
  new Emotion("excited", "color13"),
  new Emotion("bored", "color14"),
  new Emotion("sad", "color15"),
  new Emotion("annoyed", "color16"),
];

emotions.forEach((emotion) => {
  emotion.makesingleSelection(emotions);
  emotion.nameOnhover();
});

const backgroundCover = document.querySelector("#backgroundCover");
const moodWheel = document.querySelector("#moodWheelFullScreen");

backgroundCover.addEventListener("click", (event) => {
  event.preventDefault();
  moodWheel.style.display = "none";
  trackEmotions();
  changeTitle();
  changeBoxColor();
  document.querySelector(".bubble").style.display = "none";
});

const trackMoodBtn = document.querySelector("#trackMoodBtn");
trackMoodBtn.textContent = "Add Current Mood";

trackMoodBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moodWheel.style.display = "flex";
});

let emotionsToTrack = [];
let feelings = emotionsToTrack;

const changeBoxColor = () => {
  fetch('/sessions', {
    method: "GET"
}).then(res => {
    return res.json()
}).then(data => {
  console.log(data)
  if (emotions.length > 0) {
    const boxes = document.querySelectorAll('.moodSelector')
    boxes.forEach(box => {
      box.setAttribute("class", `moodSelector ${emotionsToTrack[0]}`)
    });
    const boxBorder = document.querySelectorAll(".column")
    boxBorder.forEach(border => {
    border.setAttribute("class", `column ${emotionsToTrack[0]}Border`)
    })
  } else {
    const boxes = document.querySelectorAll('.moodSelector')
    boxes.forEach(box => {
      box.setAttribute("class", `moodSelector ${data.currentMood}`)
    });
    const boxBorder = document.querySelectorAll(".column")
    boxBorder.forEach(border => {
      border.setAttribute("class", `column ${data.currentMood}Border`)
    })
  }
})
}

const trackEmotions = () => {
  emotionsToTrack = [];
  emotions.forEach((emotion) => {
    if (emotion.selected) {
      emotionsToTrack.push(emotion.name);
    }
  });

  feelings = emotionsToTrack[0];
};

const moodTitle = document.querySelector("#moodTitle");
const validateBtn = document.querySelector("#validateBtn");
const privacySetting = document.querySelector("#privacySelect");
moodTitle.textContent = "What is your current mood?";

const changeTitle = () => {
  if (emotionsToTrack.length > 0) {
    moodTitle.textContent = `You are feeling ${feelings} right now`;
    trackMoodBtn.textContent = "No, actually...";
    validateBtn.textContent = `Yep, set current mood to ${feelings}`;
    validateBtn.style.display = "inline";
    privacySetting.style.display = "block";
  } else {
    moodTitle.textContent = "How are you feeling right now?";
    trackMoodBtn.textContent = "Add Current Mood";
    document.querySelector("#validateBtn").style.display = "none";
    privacySetting.style.display = "none";
  }
};

validateBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const values = document.getElementsByName("privacy");
  let privacyChoice;
  values.forEach((choice) => {
    if (choice.checked) {
      privacyChoice = choice;
    }
  });
  const postObj = {
    moodText: feelings,
    title: "Current Mood",
    text: "",
    type: "mood-entry",
    visibility: privacyChoice.id,
  };
  moodTitle.textContent = "How are you feeling right now?";
  trackMoodBtn.textContent = "Add Current Mood";
  document.querySelector("#validateBtn").style.display = "none";
  privacySetting.style.display = "none";
  fetch("api/posts", {
    method: "POST",
    body: JSON.stringify(postObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        errorMsg("Something went wrong while adding post");
      }
    })
    .then((post) => {

      console.log(post);
      const allPostsDiv = document.querySelector(".allPosts");

      const thisPostDiv = document.createElement("div");
      thisPostDiv.setAttribute("class", "post-box");
      const postUser = document.createElement("p");
      // postUser.setAttribute("id", "postUsername")

      const postTitle = document.createElement("p");
      postTitle.setAttribute("id", "title");
      postTitle.innerHTML = `\"${post.title}\"`;
      const postMoodsAndDate = document.createElement("p");
      postMoodsAndDate.innerHTML = `Was feeling ${post.moodText} on ${dayjs(
        post.createdAt
      ).format("MMM DD YYYY, HH:mm")}`;
      const postText = document.createElement("p");
      postText.setAttribute("id", "text");

      if (window.location.pathname === "/home") {
        fetch('/api/llamas/current_llama', {
          method: "GET"
        }).then(res => {
          return res.json()
        }).then(data => {
          const llamadiv = document.createElement("div")
          llamadiv.setAttribute("id", "profileLlama")
          const llamaBase = document.createElement("img")
          llamaBase.setAttribute("id", "profileLlamaColor")
          llamaBase.setAttribute("src", data.llama.llama_image)
          const llamaHat = document.createElement("img")
          llamaHat.setAttribute("id", "profileLlamaHat")
          llamaHat.setAttribute("src", data.llama.llama_hat_image)
          llamadiv.appendChild(llamaBase)
          llamadiv.appendChild(llamaHat)
          thisPostDiv.insertBefore(llamadiv, thisPostDiv.children[0])
        })
      }

      thisPostDiv.append(postUser);
      thisPostDiv.append(postTitle);
      thisPostDiv.append(postText);
      thisPostDiv.append(postMoodsAndDate);

      if (post.visibility == "public") {
        postUser.innerHTML = `Your drama: `;
        allPostsDiv.insertBefore(thisPostDiv, allPostsDiv.children[1]);
      } else if (post.visibility == "anonymous") {
        postUser.innerHTML = `Someone's drama: `;
        allPostsDiv.insertBefore(thisPostDiv, allPostsDiv.children[1]);
      } else if (post.visibility == "private") {
        thisPostDiv.remove();
      }
      const emoji = document.querySelector("#emoji")
      const moodInfo = document.querySelector("#userPageCurrentMood")
      moodInfo.textContent = `Your current mood is: ${emotionsToTrack[0]}`

      if (emotionsToTrack[0] === "tired") {
        emoji.textContent = `😴`;
      } else if (emotionsToTrack[0] === "happy") {
        emoji.textContent = `😀`
      } else if (emotionsToTrack[0] === "annoyed") {
        emoji.textContent = `😒`
      } else if (emotionsToTrack[0] === "embarrassed") {
        emoji.textContent = `😳`
      } else if (emotionsToTrack[0] === "sad") {
        emoji.textContent = `😢`
      } else if (emotionsToTrack[0] === "calm") {
        emoji.textContent = `😌`
      } else if (emotionsToTrack[0] === "bored") {
        emoji.textContent = `😐`
      } else if (emotionsToTrack[0] === "disappointed") {
        emoji.textContent = `😕`
      } else if (emotionsToTrack[0] === "mischievous") {
        emoji.textContent = `😈`
      } else if (emotionsToTrack[0] === "angry") {
        emoji.textContent = `😡`
      } else if (emotionsToTrack[0] === "flirty") {
        emoji.textContent = `😘`
      } else if (emotionsToTrack[0] === "anxious") {
        emoji.textContent = `😟`
      } else if (emotionsToTrack[0] === "silly") {
        emoji.textContent = `😛`
      } else if (emotionsToTrack[0] === "scared") {
        emoji.textContent = `😧`
      } else if (emotionsToTrack[0] === "frustrated") {
        emoji.textContent = `😫`
      } else if (emotionsToTrack[0] === "excited") {
        emoji.textContent = `🤩`
      }

      emotionsToTrack.forEach((emotion) => {
        const moodObj = {
          mood: emotion,
          postId: post.id,
        };
        fetch("api/moods", {
          method: "POST",
          body: JSON.stringify(moodObj),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.ok) {
            const currentMood = { currentMood: feelings };
            fetch("api/users", {
              method: "PUT",
              body: JSON.stringify(currentMood),
              headers: {
                "Content-Type": "application/json",
              },
            }).then((res) => {
              if (res.ok) {
              } else {
                errorMsg("Something went wrong with updating Current Mood");
              }
            });
          } else {
            errorMsg("Something went wrong while adding moods");
          }
        });
      });
    });
});
