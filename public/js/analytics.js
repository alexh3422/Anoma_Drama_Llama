fetch('/api/moods/user', {
    methode: "GET"
}).then(res => {
    return res.json()
}).then(userMoodData => {
    console.log(userMoodData);

    const allEmotions = []

    userMoodData.moods.forEach(mood => {
        if (!allEmotions.includes(mood.mood)) {
            allEmotions.push(mood.mood)
        }
    })

    console.log(allEmotions);

    class Emotion {
        constructor(datesArr, mood) {
            this.datesArr = datesArr;
            this.mood = mood
        }
    }

    const emotionsAndDates = []

    allEmotions.forEach(emotion => {
        const allDates = []
        userMoodData.moods.forEach(mood => {
            if(emotion===mood.mood){
               allDates.push(mood.createdAt);
            }
        })
        emotionsAndDates.push(new Emotion(allDates, emotion))
    })

    console.log(emotionsAndDates);

    const allValues = []

    emotionsAndDates.forEach(emotion => {
        allValues.push(emotion.datesArr.length)
    })

    console.log(allValues);

    var data = [{
        values: allValues,
        labels: allEmotions,
        type: 'pie'
    }];

    var layout = {
        height: 400,
        width: 500
    };

    Plotly.newPlot('myDiv', data, layout);

    // var happy = {
    //     x: ["Today", "Yeasterday", "Day Before Yeasterday"],
    //     y: [1, 0, 2, 0],
    //     type: 'scatter',
    //     name: 'happy'
    //   };

    //   var sad = {
    //     x: ["Today", "Yeasterday", "Day Before Yeasterday"],
    //     y: [0, 2, 0, 1],
    //     type: 'scatter',
    //     name: 'sad'
    //   };

    //   var embarrassed = {
    //     x: ["Today", "Yeasterday", "Day Before Yeasterday"],
    //     y: [0, 1, 0, 1],
    //     name: 'embarrassed'
    //   };

    //   var data = [happy, sad, embarrassed];

    //   Plotly.newPlot('myDiv', data);
})
