require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const control = require('./controllers');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Menangani routing scraping web
app.use('/api/indexing', routes.scrape);

// Menangani routing CRUD Kurs
app.use('/api/kurs', routes.kurs);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(control.error);

const port = process.env.PORT || 7000;

if (require.main === module) {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
