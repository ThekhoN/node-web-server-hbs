const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

// define view engine
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('capitalize', (text) => {
  return text.toUpperCase();
});
app.set('view engine', 'hbs');

// middlewares
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log');
    }
  });
  next();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello there, Welcome to the Home page ;)'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
});

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
