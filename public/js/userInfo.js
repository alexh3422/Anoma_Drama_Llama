fetch('/sessions', {
    method: "GET"
}).then(res => {
    return res.json()
}).then(data => {
    if(data.userId){
        fetch('api/users/currentUser', {
            method:"GET"
        }).then(res => {
            return res.json()
        }).then(data=>{
            fetch('/api/users', {
                method:"GET"
              }).then(res => {
                return res.json()
              }).then(allUsers => {
                let counter = 0
                
                allUsers.forEach(user => {
                  console.log(user.currentMood)
                  if(user.currentMood===data.currentMood){
                    counter++
                  }
                })
                if(counter>2){
                  document.querySelector("#sameMood").textContent = `You and ${counter-1} other users are feeling ${data.currentMood}`
                } else if (counter>1){
                  document.querySelector("#sameMood").textContent = `You and ${counter-1} other user are feeling ${data.currentMood}`
                } else {
                  document.querySelector("#sameMood").textContent = ``
                }
              })


            const userNameandInfo = document.querySelector("#userPageUsername")
            const moodInfo = document.querySelector("#userPageCurrentMood")
            userNameandInfo.textContent = `Hi ${data.username}`
            if(data.currentMood){
            moodInfo.textContent = `Your current mood is: ${data.currentMood}`
            const emoji = document.querySelector("#emoji")
            const boxes = document.querySelectorAll('.moodSelector')
            boxes.forEach(box => {
                box.setAttribute("class", `moodSelector ${data.currentMood}`)
            });
            const boxBorder = document.querySelectorAll(".column")
            boxBorder.forEach(border => {
                border.setAttribute("class", `column ${data.currentMood}Border`)
            })
        
            if(data.currentMood==="tired"){
                emoji.textContent = `😴`
                // background.style.background = '#49adb4'
            } else if(data.currentMood==="happy"){
                emoji.textContent = `😀`
                // background.style.background = '#479b79'
            } else if(data.currentMood==="annoyed"){
                emoji.textContent = `😒`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="embarrassed"){
                emoji.textContent = `😳`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="sad"){
                emoji.textContent = `😢`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="calm"){
                emoji.textContent = `😌`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="bored"){
                emoji.textContent = `😐`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="disappointed"){
                emoji.textContent = `😕`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="mischievous"){
                emoji.textContent = `😈`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="angry"){
                emoji.textContent = `😡`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="flirty"){
                emoji.textContent = `😘`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="anxious"){
                emoji.textContent = `😟`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="silly"){
                emoji.textContent = `😛`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="scared"){
                emoji.textContent = `😧`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="frustrated"){
                emoji.textContent = `😫`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="excited"){
                emoji.textContent = `🤩`
                // background.style.background = '#47c14d'
            }
           } 
        })
    }
})