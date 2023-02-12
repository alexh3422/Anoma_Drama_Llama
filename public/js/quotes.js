const APIKey= "+75hN0+XAdl4H2GVLy4zow==7126drTfAlvPR88W";
const request= require('request');

//happy & calm
function happiness() {
  request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=happiness',
  headers: {
    'X-API-KEY': APIKey
  }
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
  }
)};

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
function mischievous() {
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