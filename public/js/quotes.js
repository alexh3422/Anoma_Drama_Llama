const APIKey= "+75hN0+XAdl4H2GVLy4zow==7126drTfAlvPR88W";
// const request= require('request');
const currentMood= document.querySelector('moodText')


//happy & calm
function happiness() {
  var category = 'happiness'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
    headers: { 'X-Api-Key': APIKey},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
};

//sad and frustrated
function sad() {
  request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=inspirational',
  headers: {
    'X-API-KEY': APIKey
  }
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
  }
)};

//annoyed
function annoyed() {
  request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=attitude',
  headers: {
    'X-API-KEY': APIKey
  }
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
  }
)};

//embarrassed
function embarrassed() {
  request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=knowledge',
  headers: {
    'X-API-KEY': APIKey
  }
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
  }
)};

//tired and anxious
function tired() {
  request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=dreams',
  headers: {
    'X-API-KEY': APIKey
  }
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
  }
)};

//bored and silly
function bored() {
  request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=funny',
  headers: {
    'X-API-KEY': APIKey
  }
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
  }
)};

//disappointed and angry
function disappointed() {
  request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=good',
  headers: {
    'X-API-KEY': APIKey
  }
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
  }
)};

//mischievous
function misch() {
  request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=cool',
  headers: {
    'X-API-KEY': APIKey
  }
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
  }
)};

//flirty
function flirty() {
  request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=love',
  headers: {
    'X-API-KEY': APIKey
  }
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
  }
)};

//scared and shocked
function scared() {
  request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=fear',
  headers: {
    'X-API-KEY': APIKey
  }
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
  }
)};

function quotes() {
  console.log(currentMood)
  switch (currentMood) {
    case 'happy':
      happiness();
      break;
    case 'calm':
      happiness();
      break;
    case 'sad':
      sad();
      break;
    case 'frustrated':
      sad();
      break;
    case 'annoyed':
      annoyed();
      break;
    case 'embarrassed':
      embarrassed();
      break;
    case 'tired':
      tired();
      break;
    case 'anxious':
      tired();
      break;
    case 'bored':
      bored();
      break;
    case 'silly':
      bored();
      break;
    case 'disappointed':
      disappointed();
      break;
    case 'angry':
      disappointed();
      break;
    case 'michievous':
      misch();
      break;
    case 'flirty':
      flirty();
      break;
    case 'scared':
      scared();
      break;
    case 'shocked':
      scared();
      break;
  }
}

quotes();