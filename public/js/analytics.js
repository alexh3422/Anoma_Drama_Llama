fetch('/api/moods/user', {
    methode: "GET"
}).then(res => {
    return res.json()
}).then(userMoodData => {

    const allEmotions = []
    const allDatesData = []
    const allPostIds = []

    userMoodData.moods.forEach(mood => {
        allDatesData.push(dayjs(mood.createdAt))
        if (!allPostIds.includes(mood.postId)) {
            allPostIds.push(mood.postId)
        }
        if (!allEmotions.includes(mood.mood)) {
            allEmotions.push(mood.mood)

        }
    })

    dayjs.extend(window.dayjs_plugin_relativeTime)
    dayjs.extend(window.dayjs_plugin_minMax)
    dayjs.extend(window.dayjs_plugin_weekOfYear)

    class Track {
        constructor(x, y, name, type, marker) {
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
                allDates.push(dayjs(mood.createdAt).format("MMM DD YYY"));
            }
        })
        emotionsAndDates.push(allDates)
    })

    const allValues = []

    emotionsAndDates.forEach(emotion => {
        allValues.push(emotion.length)
    })

    const entries = []

    const allEntryDates = [];

    const byPost = [];
    const hourly = [];
    const daily = [];
    const weekly = [];
    const monthly = [];
    const yearly = [];

    allPostIds.forEach(post => {

        const moods = []
        let timeStamp;
        userMoodData.moods.forEach(mood => {
            if (post == mood.postId) {
                moods.push(mood.mood)
                timeStamp = mood.createdAt
            }
        })
        entries.push({
            timeStamp: timeStamp,
            moods: moods
        })
        allEntryDates.push(dayjs(timeStamp).format("YYYY-MM-DD, HH:mm"));
        byPost.push(dayjs(timeStamp).format("YYYY-MM-DD, HH:mm"));
        hourly.push(dayjs(timeStamp).format("MMM DD YYYY, HH:00"));
        daily.push(dayjs(timeStamp).format("MMM DD YYYY"));
        weekly.push("Week " + dayjs(timeStamp).week());
        monthly.push(dayjs(timeStamp).format("MMMM"));
        yearly.push(dayjs(timeStamp).format("YYYY"));
    })

    let dataByEntry = []

    const byPostData = [];
    const hourlyData = [];
    const dailyData = [];
    const weeklyData = [];
    const monthlyData = [];
    const yearlyData = [];

    const colors = ["#49adb4", "#479b79", "#47c14d", "#a5e23b", "#e1f71e", "#baa72e", "#9a621d", "#6c422a", "#8e1d1d", "#a24676",
        "#9f2d7b", "#842d9f", "#622d9f", "#3c236f", "#2d5b9f", "#2d709f"]

    let colorPosition = colors.length - 1;

    allEmotions.forEach(mood => {
        const yArr = [];
        entries.forEach(entry => {
            if (entry.moods.includes(mood)) {
                yArr.push(1)
            } else {
                yArr.push(0)
            }
        })
        dataByEntry.push(new Track(allEntryDates, yArr, mood, "bar", { color: colors[colorPosition] }));
        byPostData.push(new Track(byPost, yArr, mood, "bar", { color: colors[colorPosition] }));
        hourlyData.push(new Track(hourly, yArr, mood, "bar", { color: colors[colorPosition] }));
        dailyData.push(new Track(daily, yArr, mood, "bar", { color: colors[colorPosition] }));
        weeklyData.push(new Track(weekly, yArr, mood, "bar", { color: colors[colorPosition] }));
        monthlyData.push(new Track(monthly, yArr, mood, "bar", { color: colors[colorPosition] }));
        yearlyData.push(new Track(yearly, yArr, mood, "bar", { color: colors[colorPosition] }));
        colorPosition--

    })

    var pieData = [{
        values: allValues,
        labels: allEmotions,
        type: 'pie',
        marker: {
            colors: colors.reverse()
        },
        textinfo: "label+percent",
        textposition: "inside",
    }];

    var layout = {
        showlegend: false
    }

const config2 = { responsive: true, scrollZoom: true }
Plotly.newPlot('pieChart', pieData, layout, config2);

var config = { responsive: true, scrollZoom: true }

var barLayout = {
    barmode: 'stack',
    legend: {
        "orientation": "h",
        // x: 1,
        y: 2
    }
};

Plotly.newPlot('barChart', dataByEntry, barLayout, config);

const orderBy = document.querySelector("#orderData")

orderBy.addEventListener("change", () => {

    document.querySelector(".plot-container").remove()
    if (orderBy.value === "post") {
        Plotly.newPlot('barChart', byPostData, barLayout, config);
    } else if (orderBy.value === "hourly") {
        Plotly.newPlot('barChart', hourlyData, barLayout, config);
    } else if (orderBy.value === "daily") {
        Plotly.newPlot('barChart', dailyData, barLayout, config);
    } else if (orderBy.value === "weekly") {
        Plotly.newPlot('barChart', weeklyData, barLayout, config);
    } else if (orderBy.value === "monthly") {
        Plotly.newPlot('barChart', monthlyData, barLayout, config);
    } else if (orderBy.value === "yearly") {
        Plotly.newPlot('barChart', yearlyData, barLayout, config);
    }
})
})
