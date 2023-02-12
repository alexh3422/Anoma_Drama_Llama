//happy
//sad
//annoyed
//embarrassed
//tired
//calm
//bored
//disappointed
//mischievous
//angry
//flirty
//anxious
//silly
//scared
//frustrated
//shocked

function llamaQuotes(mood) {
  fetch(`https://api.api-ninjas.com/v1/quotes?category=${mood}`).then (function(res) {
    return res.json();
  }).then
}