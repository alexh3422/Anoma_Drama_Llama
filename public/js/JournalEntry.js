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
    document.querySelector(`#${this.name}`).addEventListener("click", () => {
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
  new Emotion("happy", "color01"),
  new Emotion("sad", "color02"),
  new Emotion("embarrassed", "color03"),
  new Emotion("calm", "color04"),
  new Emotion("disappointed", "color05"),
  new Emotion("scared", "color06"),
  new Emotion("anxious", "color07"),
  new Emotion("angry", "color08"),
  new Emotion("mischievous", "color09"),
  new Emotion("flirty", "color10"),
  new Emotion("silly", "color11"),
  new Emotion("frustrated", "color12"),
  new Emotion("shocked", "color13"),
  new Emotion("bored", "color14"),
  new Emotion("tired", "color15"),
  new Emotion("annoyed", "color16"),
];

const moodWheel = document.querySelector("#moodWheel");

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

const backgroundCover = document.querySelector("#backgroundCover");

backgroundCover.addEventListener("click", () => {
  moodWheel.style.display = "none";
  trackEmotions();
  changeTitle();
});

const trackMoodBtn = document.querySelector("#trackMoodBtn");

trackMoodBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moodWheel.style.display = "flex";
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
const privacySetting = document.querySelector("#privacySelect");

let feelings = emotionsToTrack[0];

const sumbitBtn = document.querySelector("#submit-post");

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
    privacySetting.style.display = "block";
    sumbitBtn.style.display = "block";
  } else {
    moodTitle.textContent = "How are you feeling right now?";
    trackMoodBtn.textContent = "Add emotions";
    privacySetting.style.display = "none";
    sumbitBtn.style.display = "none";
  }
};

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

sumbitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title-input").value;
  const text = document.querySelector("#post-input").value;

  if (emotionsToTrack.length < 1) {
    errorMsg("Please add at least 1 emotion");
  } else if (!title) {
    errorMsg("Please add a title");
  } else if (!text) {
    errorMsg("Please add some text");
  } else {
    const values = document.getElementsByName("privacy");
    let privacyChoice;
    values.forEach((choice) => {
      if (choice.checked) {
        privacyChoice = choice;
      }
    });
    const postObj = {
      moodText: feelings,
      title: title,
      text: text,
      type: "journal",
      visibility: privacyChoice.id,
    };
    document.querySelector("#title-input").value = "";
    document.querySelector("#post-input").value = "";
    moodTitle.textContent = "How are you feeling right now?";
    trackMoodBtn.textContent = "Add emotions";
    privacySetting.style.display = "none";
    sumbitBtn.style.display = "none";
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
        const allPostsDiv = document.querySelector(".allPosts");

        const thisPostDiv = document.createElement("div");
        thisPostDiv.setAttribute("class", "post-box");
        const postUser = document.createElement("p");
        postUser.setAttribute("id", "postUsername");
        postUser.innerHTML = "Your drama:";
        const postTitle = document.createElement("p");
        postTitle.setAttribute("id", "title");
        postTitle.innerHTML = `\"${post.title}\"`;
        const postText = document.createElement("p");
        postText.setAttribute("id", "text");
        postText.innerHTML = post.text;
        const postMoodsAndDate = document.createElement("p");
        postMoodsAndDate.innerHTML = `You felt ${post.moodText} on ${dayjs(
          post.createdAt
        ).format("MMM DD YYYY, HH:mm")}`;

        // Create the delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "deleteBtn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
          fetch(`api/posts/${post.id}`, {
            method: "DELETE",
          }).then((res) => {
            if (res.ok) {
              thisPostDiv.remove();
            } else {
              errorMsg("Error");
            }
          });
        });

        const editBtn = document.createElement("button");
        editBtn.setAttribute("id", "editBtn");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {});

        thisPostDiv.appendChild(postUser);
        thisPostDiv.appendChild(postTitle);
        thisPostDiv.appendChild(postText);
        thisPostDiv.appendChild(postMoodsAndDate);
        thisPostDiv.appendChild(editBtn);
        thisPostDiv.appendChild(deleteBtn);

        allPostsDiv.insertBefore(thisPostDiv, allPostsDiv.children[1]);

        console.log(post);
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
              errorMsg("error, please try again");
            }
          });
        });
      });
  }
});

const editBtn = document.querySelectorAll("#editBtn");
const deleteBtn = document.querySelectorAll("#deleteBtn")

editBtn.forEach(button => {
  button.addEventListener("click", () => {
    if (button.textContent === "Edit") {
      const previousEl= button.previousElementSibling;
      const p = previousEl.previousElementSibling;
      const post = previousEl.previousElementSibling.innerHTML;
      const newText = document.createElement("textarea");
      const updateBtn = document.createElement("button");
      const deleteBtn = button.nextElementSibling;
      
      deleteBtn.setAttribute("class", "hide");
      button.textContent = "Cancel";
      
      newText.innerHTML = post;
      newText.setAttribute("id", "post-input");
      p.replaceWith(newText);
      
      updateBtn.innerHTML = "Update";
      updateBtn.setAttribute("id", "updateBtn");
      button.parentElement.append(updateBtn);

      updateBtn.addEventListener("click", () => {
        const id = button.getAttribute("post-id");
        const postObj = {
          text: previousEl.previousElementSibling.value
        }
        console.log(postObj)
        fetch(`/api/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify(postObj),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          if (res.ok) {
            location.href="/journal"
          } else {
            alert("error! please try again!")
          }
        })
      })
    } else {
      location.reload();
    }
  })
})

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
        errorMsg("error, please try again");
      }
    });
  });
});
