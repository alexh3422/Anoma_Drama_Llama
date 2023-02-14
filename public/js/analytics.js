fetch('/api/moods/user', {
    methode: "GET"
}).then(res => {
    return res.json()
}).then(userMoodData => {
    console.log(userMoodData);

    const allEmotions = []
    const allDatesData = []
    const allPostIds = []

    userMoodData.moods.forEach(mood => {
        allDatesData.push(dayjs(mood.createdAt))
        if(!allPostIds.includes(mood.postId)){
            allPostIds.push(mood.postId)
        }
        if (!allEmotions.includes(mood.mood)) {
            allEmotions.push(mood.mood)

        }
    })

    console.log(allPostIds)

    dayjs.extend(window.dayjs_plugin_relativeTime)
    dayjs.extend(window.dayjs_plugin_minMax)

    const oldestEntry = dayjs.min(allDatesData)

    console.log(oldestEntry.format("MMM DD YYYY, HH:mm"))
    console.log(allEmotions);

    var now = dayjs().format("MMM DD YYYY, HH:mm")

    class Track {
        constructor(x, y,name, type, marker) {
            this.x = x;
            this.y = y;
            this.name = name;
            this.type = type;
            this.marker = marker

        }
    }
    
    const emotionsAndDates = []

    allEmotions.forEach(emotion => {
        const allDates = []
        userMoodData.moods.forEach(mood => {
            if (emotion === mood.mood) {
                allDates.push(dayjs(mood.createdAt).format("MMM DD YYYY, HH:mm"));
            } 
        })
        emotionsAndDates.push(allDates)
    })

    
    // console.log(emotionsAndDates);
    // emotionsAndDates.forEach(emotion => {
    //     console.log(emotion.datesArr);
    // })
    const allValues = []

    emotionsAndDates.forEach(emotion => {
        allValues.push(emotion.length)
    })

    console.log(allValues);

    const entries = []
    const allEntryDates = []
    allPostIds.forEach(post => {

        const moods = []
        let timeStamp;
        userMoodData.moods.forEach(mood =>{
            if(post==mood.postId){
                moods.push(mood.mood)
                timeStamp=mood.createdAt
            }
        })
        console.log(moods);
        console.log(timeStamp);
        entries.push({
            timeStamp:timeStamp,
            moods:moods
        })
        allEntryDates.push(dayjs(timeStamp).format("MMM DD YYYY, HH:00"))
    })

    console.log(entries);

    const dataByEntry = []
    // constructor(dates, moods, x, y, type)
    const colors = ["#43b4cd", "#479b79", "#47c14d", "#a5e23b", "#e1f71e", "#baa72e", "#9a621d", "#6c422a", "#662727", "#9f2d5b",
    "#9f2d7b", "#842d9f", "#712d9f", "#4f2d9f", "#2d319f","#2d559f"]

    let colorPosition = colors.length-1;
    
    allEmotions.forEach(mood => {
        const yArr = [];
        console.log(yArr);
        entries.forEach(entry=>{
            if(entry.moods.includes(mood)){
                yArr.push(1)
            } else {
                yArr.push(0)
            }
        })
        dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:colors[colorPosition]}));
        console.log(colors[colorPosition]);
        colorPosition--

        // if(mood=="happy"){
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#43b4cd"}))
        // } else if(mood=="sad"){
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#479b79"}))
        // } else if(mood=="annoyed") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#47c14d"}))
        // } else if(mood=="embarrassed") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#a5e23b"}))
        // } else if(mood=="tired") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#e1f71e"}))
        // } else if(mood=="calm") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#baa72e"}))
        // } else if(mood=="bored") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#9a621d"}))
        // } else if(mood=="disappointed") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#6c422a"}))
        // } else if(mood=="mischievous") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#662727"}))
        // } else if(mood=="angry") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#9f2d5b"}))
        // } else if(mood=="flirty") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#9f2d7b"}))
        // } else if(mood=="anxious") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#842d9f"}))
        // } else if(mood=="silly") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#712d9f"}))
        // } else if(mood=="scared") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#4f2d9f"}))
        // } else if(mood=="frustrated") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#2d319f"}))
        // } else if(mood=="shocked") {
        //     dataByEntry.push(new Track(allEntryDates,yArr,mood,"bar",{color:"#2d559f"}))
        // }
    })

    console.log(dataByEntry)
    

    var pieData = [{
        values: allValues,
        labels: allEmotions,
        type: 'pie',
         marker: {
            colors:colors.reverse()}
    }];


    var layout = {
        height: 400,
        width: 500
    };

    Plotly.newPlot('pieChart', pieData, layout);

    //     var trace1 = {
    //   x: ['giraffes', 'orangutans', 'monkeys'],
    //   y: [20, 14, 23],
    //   name: 'SF Zoo',
    //   type: 'bar'
    // };

    // var trace2 = {
    //   x: ['giraffes', 'orangutans', 'monkeys'],
    //   y: [12, 18, 29],
    //   name: 'LA Zoo',
    //   type: 'bar'
    // };

    var barData = dataByEntry;

    var barLayout = { barmode: 'stack' };

    Plotly.newPlot('barChart', barData, barLayout);
})
