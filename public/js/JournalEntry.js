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


const moodWheel = document.querySelector("#moodWheel")

if (moodWheel.getAttribute("wheelMode") === "single") {
    emotions.forEach(emotion => {
        emotion.makesingleSelection(emotions);
        emotion.nameOnhover();
    })
} else if (moodWheel.getAttribute("wheelMode") === "multiple") {
    emotions.forEach(emotion => {
        emotion.makeSelection();
        emotion.nameOnhover();
    })
}

const backgroundCover = document.querySelector("#backgroundCover")

backgroundCover.addEventListener("click", () => {
    moodWheel.style.display = "none";
    trackEmotions()
    changeTitle()
});

const trackMoodBtn = document.querySelector('#trackMoodBtn')

trackMoodBtn.addEventListener("click", (e) => {
    e.preventDefault()
    moodWheel.style.display = "flex";
});


let emotionsToTrack = []
const trackEmotions = () => {
    emotionsToTrack = []
    emotions.forEach(emotion => {
        if (emotion.selected) {
            emotionsToTrack.push(emotion.name)
        }
    })
    console.log(emotionsToTrack);
}

const moodTitle = document.querySelector("#moodTitle")

let feelings = emotionsToTrack[0]

const changeTitle = () => {
    if (emotionsToTrack.length > 0) {

        if (emotionsToTrack.length > 2) {
            const feelingsArr = []
            for (let i = 0; i < emotionsToTrack.length - 2; i++) {
                feelingsArr.push(emotionsToTrack[i])
            }
            feelingsArr.push(`${emotionsToTrack[emotionsToTrack.length - 2]} and ${emotionsToTrack[emotionsToTrack.length - 1]}`)
            feelings = feelingsArr.join(', ')
        } else {
            feelings = emotionsToTrack.join(' and ');
        }

        moodTitle.textContent = `You are feeling ${feelings}`
        trackMoodBtn.textContent = "No, actually..."

    } else {
        moodTitle.textContent = "How are you feeling right now?";
        trackMoodBtn.textContent = "Add emotions"
    }

}

const sumbitBtn = document.querySelector('#submit-post')

sumbitBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const title = document.querySelector('#title-input').value
    const text = document.querySelector('#post-input').value

    if(emotionsToTrack.length<1){
        alert("Please add at least 1 emotion")
    } else if(!title){
        alert('Please add a title'); 
    } else if(!text){
        alert('Please add some text'); 
    } else {
        const postObj = {
            moodText: feelings,
            title: title,
            text: text,
            type: "journal",
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
                alert("trumpet sound")
            }
        }).then(post => {
            console.log(post);
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
                        location.reload();
                    } else {
                        alert("trumpet sound")
                    }
                })
            })
        })
    }
})






