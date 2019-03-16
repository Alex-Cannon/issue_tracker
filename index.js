require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');
const api = require('./api/api.js');
let app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"]
  }
}));
app.use(helmet());
app.use(express.static('public'));

// Handle Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/pages/index.html'));
});

// Handle Project page
app.get('/:project_name', (req, res) => {
  res.sendFile(path.join(__dirname, './public/pages/project.html'));
});

// Connect to DB && listen
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {

  // Microservice RESTful api
  app.use('/api', api);

  // "Open" app to the world!
  app.listen(PORT, () => console.log('App Listening on port ' + PORT + '...'));
});
