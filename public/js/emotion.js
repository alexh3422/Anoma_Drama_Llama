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

    nameOnhover() {
        document.querySelector(`#${this.name}`).addEventListener("mouseover", () =>{
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
    new Emotion("Bored", "color14"),
    new Emotion("tired", "color15"),
    new Emotion("annoyed", "color16")
] 

emotions.forEach(emotion => {
    emotion.makeSelection();
    emotion.nameOnhover();
})
