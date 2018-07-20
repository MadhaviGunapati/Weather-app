const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
const apiKey = '19d8f3bef99aab5547a9b69de50ebf6c';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});
/*
app.post('/', function (req, res) {
  console.log(req.body.city);
  res.render('index');  
});*/
app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body);
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  });

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});