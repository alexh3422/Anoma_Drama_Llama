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
    document
      .querySelector(`#${this.name}`)
      .addEventListener("click", (event) => {
        event.preventDefault();
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

const moodWheel = document.querySelector("#moodWheel");
const moodWheelScreen = document.querySelector("#moodWheelFullScreen");

if (moodWheel.getAttribute("wheelMode") === "single") {
  emotions.forEach((emotion) => {
    emotion.makesingleSelection(emotions);
    emotion.nameOnhover();
  });
} else if (moodWheel.getAttribute("wheelMode") === "multiple") {
  emotions.forEach((emotion) => {
    emotion.makeSelection();
    emotion.nameOnhover();
  });
}

const clickCover = document.querySelector("#clickCover");

clickCover.addEventListener("click", (event) => {
  event.preventDefault();
  moodWheelScreen.style.display = "none";
  trackEmotions();
  changeTitle();
  document.querySelector(".bubble").style.display = "none";
});

const trackMoodBtn = document.querySelector("#trackMoodBtn");

trackMoodBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moodWheelScreen.style.display = "flex";
});

let emotionsToTrack = [];
const trackEmotions = () => {
  emotionsToTrack = [];
  emotions.forEach((emotion) => {
    if (emotion.selected) {
      emotionsToTrack.push(emotion.name);
    }
  });
  console.log(emotionsToTrack);
};

const moodTitle = document.querySelector("#moodTitle");
const validateBtn = document.querySelector("#validateBtn");
const privacySetting = document.querySelector("#privacySelect");

let feelings = emotionsToTrack[0];

const changeTitle = () => {
  if (emotionsToTrack.length > 0) {
    if (emotionsToTrack.length > 2) {
      const feelingsArr = [];
      for (let i = 0; i < emotionsToTrack.length - 2; i++) {
        feelingsArr.push(emotionsToTrack[i]);
      }
      feelingsArr.push(
        `${emotionsToTrack[emotionsToTrack.length - 2]} and ${
          emotionsToTrack[emotionsToTrack.length - 1]
        }`
      );
      feelings = feelingsArr.join(", ");
    } else {
      feelings = emotionsToTrack.join(" and ");
    }

    moodTitle.textContent = `You are feeling ${feelings}`;
    trackMoodBtn.textContent = "No, actually...";
    validateBtn.style.display = "inline";
    privacySetting.style.display = "block";
  } else {
    moodTitle.textContent = "How are you feeling right now?";
    trackMoodBtn.textContent = "Add emotions";
    validateBtn.style.display = "none";
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
    title: "Mood Entry",
    text: "",
    type: "mood-entry",
    visibility: privacyChoice.id,
  };
  moodTitle.textContent = "How are you feeling right now?";
  trackMoodBtn.textContent = "Add emotions";
  validateBtn.style.display = "none";
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
        errorMsg("Error");
      }
    })
    .then((post) => {
      console.log(post);

      const allPostsDiv = document.querySelector(".allPosts");

      const thisPostDiv = document.createElement("div");
      thisPostDiv.setAttribute("class", "post-box");
      const postUser = document.createElement("p");
      postUser.setAttribute("id", "postUsername");
      const postTitle = document.createElement("p");
      postTitle.setAttribute("id", "title");
      const postMoodsAndDate = document.createElement("p");

      if (document.getElementById("moodPage")) {
        postUser.innerHTML = `Your were feeling ${post.moodText}`;
        postTitle.innerHTML = `\"${post.title}\"`;
        postMoodsAndDate.innerHTML = ` ${dayjs(post.createdAt).format(
          "MMM DD YYYY, HH:mm"
        )}`;
      } else {
        postUser.innerHTML = "Your drama:";
        postTitle.innerHTML = `\"${post.title}\"`;
        postMoodsAndDate.innerHTML = `You felt ${post.moodText} on ${dayjs(
          post.createdAt
        ).format("MMM DD YYYY, HH:mm")}`;
      }
      const postText = document.createElement("p");
      postText.setAttribute("id", "text");

      thisPostDiv.appendChild(postUser);
      thisPostDiv.appendChild(postTitle);
      thisPostDiv.appendChild(postText);
      thisPostDiv.appendChild(postMoodsAndDate);

      allPostsDiv.insertBefore(thisPostDiv, allPostsDiv.children[1]);

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
            // setTimeout(() => {
            //   location.reload();
            // }, "3000");
          } else {
            errorMsg("Error");
          }
        });
      });
    });
});

const deleteBtn = document.querySelectorAll("#deleteBtn");

deleteBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("post-id");
    fetch(`/api/posts/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        let postBoxDiv = document.querySelectorAll(".post-box");
        const deleteBtn = button.getAttribute("post-id");
        postBoxDiv.forEach((post) => {
          const postId = post.getAttribute("post-id");
          if (postId == deleteBtn) {
            post.remove();
          }
        });
      } else {
        errorMsg("Oh noes!");
      }
    });
  });
});
