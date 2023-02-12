class Emotion {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.selected = false;
    }

    makeSelection() {
        document.querySelector(`#${this.name}`).addEventListener("click", () => {
            const color = document.querySelector(`.${this.color}`)
            if (!this.selected) {
                color.style.opacity = "100%";
                this.selected = true;
            } else {
                color.style.opacity = "30%"
                this.selected = false;
            }
        })
    }

    makesingleSelection(allEmotions) {
        document.querySelector(`#${this.name}`).addEventListener("click", () => {
            const color = document.querySelector(`.${this.color}`)
            allEmotions.forEach(emotion => {
                if (emotion.name != this.name) {
                    document.querySelector(`.${emotion.color}`).style.opacity = "30%";
                    emotion.selected = false;
                }
            })
            if (!this.selected) {
                color.style.opacity = "100%";
                this.selected = true;
            } else {
                color.style.opacity = "30%"
                this.selected = false;
            }
        })
    }

    nameOnhover() {
        document.querySelector(`#${this.name}`).addEventListener("mouseover", () => {
            document.querySelector(`#moodName`).textContent = this.name
        })
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
    new Emotion("annoyed", "color16")
]

emotions.forEach(emotion => {
    emotion.makesingleSelection(emotions);
    emotion.nameOnhover();
})

const backgroundCover = document.querySelector("#backgroundCover")

backgroundCover.addEventListener("click", () => {
    moodWheel.style.display = "none";
    trackEmotions()
    changeTitle()
});

const trackMoodBtn = document.querySelector('#trackMoodBtn')
trackMoodBtn.textContent = "Add Current Mood"

trackMoodBtn.addEventListener("click", () => {
    moodWheel.style.display = "flex";
});


let emotionsToTrack = []
let feelings = emotionsToTrack

const trackEmotions = () => {
    emotionsToTrack = []
    emotions.forEach(emotion => {
        if (emotion.selected) {
            emotionsToTrack.push(emotion.name)
        }
    })

    feelings = emotionsToTrack[0]
}


const moodTitle = document.querySelector("#moodTitle")
const validateBtn = document.querySelector("#validateBtn")

const changeTitle = () => {
    

    if (emotionsToTrack.length > 0) {

        moodTitle.textContent = `You are feeling ${feelings} right now`
        trackMoodBtn.textContent = "No, actually..."
        validateBtn.textContent = `Yep, set current mood to ${feelings}`
        validateBtn.style.display = "inline"

    } else {
        moodTitle.textContent = "How are you feeling right now?";
        trackMoodBtn.textContent = "Add Current Mood"
        document.querySelector("#validateBtn").style.display = "none"
    }

}

validateBtn.addEventListener("click", () => {

    const postObj = {
        moodText: feelings,
        title: "Current Mood",
        text: "",
        type: "mood-entry",
        visibility: "public"
    }
    fetch('api/posts', {
        method: "POST",
        body: JSON.stringify(postObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            alert("Something went wrong while adding post")
        }
    }).then(post => {
  
        emotionsToTrack.forEach(emotion => {
            const moodObj = {
                mood: emotion,
                postId: post.id
            }
            fetch('api/moods', {
                method: "POST",
                body: JSON.stringify(moodObj),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    const currentMood = {currentMood:feelings}
                    fetch('api/users', {
                        method:'PUT',
                        body: JSON.stringify(currentMood),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(res => {
                        if(res.ok){
                            location.reload()
                        } else {
                            alert("Something went wrong with updating Current Mood")
                        }
                    })
                } else {
                    alert("Something went wrong while adding moods")
                }
            })
        })
    })
})






