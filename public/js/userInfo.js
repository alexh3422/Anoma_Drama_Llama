fetch('api/users/currentUser', {
    method:"GET"
}).then(res => {
    return res.json()
}).then(data=>{
    document.querySelector("#userPageUsername").textContent = `Hi ${data.username},`
    document.querySelector("#userPageCurrentMood").textContent = `Your current mood is: ${data.currentMood}`
    console.log(data.username);
    console.log(data.currentMood);
})