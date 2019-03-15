const express = require('express');
const helmet = require('helmet');
const path = require('path');
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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/pages/index.html'));
});

app.listen(PORT, () => console.log('App Listening on port ' + PORT + '...'));
