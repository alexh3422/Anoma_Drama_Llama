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
            const userNameandInfo = document.querySelector("#userPageUsername")
            const moodInfo = document.querySelector("#userPageCurrentMood")
            userNameandInfo.textContent = `Hi ${data.username}`
            if(data.currentMood){
            moodInfo.textContent = `Your current mood is: ${data.currentMood}`
            
            const boxes = document.querySelectorAll('.row')
            boxes.forEach(box => {
                box.setAttribute("class", `row ${data.currentMood}`)
            });
        
            if(data.currentMood==="tired"){
                userNameandInfo.textContent = `Hi ${data.username} 😴`
                // background.style.background = '#49adb4'
            } else if(data.currentMood==="happy"){
                userNameandInfo.textContent = `Hi ${data.username} 😀`
                // background.style.background = '#479b79'
            } else if(data.currentMood==="annoyed"){
                userNameandInfo.textContent = `Hi ${data.username} 😒`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="embarrassed"){
                userNameandInfo.textContent = `Hi ${data.username} 😳`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="sad"){
                userNameandInfo.textContent = `Hi ${data.username} 😢`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="calm"){
                userNameandInfo.textContent = `Hi ${data.username} 😌`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="bored"){
                userNameandInfo.textContent = `Hi ${data.username} 😐`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="disappointed"){
                userNameandInfo.textContent = `Hi ${data.username} 😕`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="mischievous"){
                userNameandInfo.textContent = `Hi ${data.username} 😈`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="angry"){
                userNameandInfo.textContent = `Hi ${data.username} 😡`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="flirty"){
                userNameandInfo.textContent = `Hi ${data.username} 😘`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="anxious"){
                userNameandInfo.textContent = `Hi ${data.username} 😟`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="silly"){
                userNameandInfo.textContent = `Hi ${data.username} 😛`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="scared"){
                userNameandInfo.textContent = `Hi ${data.username} 😧`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="frustrated"){
                userNameandInfo.textContent = `Hi ${data.username} 😫`
                // background.style.background = '#47c14d'
            } else if(data.currentMood==="excited"){
                userNameandInfo.textContent = `Hi ${data.username} 🤩`
                // background.style.background = '#47c14d'
            }
           } 
        })
    }
})