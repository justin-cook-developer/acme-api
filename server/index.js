const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { connection } = require('./db/index');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('api', require('./api'));

app.use((req, res, next) => {
  res.send('Invalid route.');
});

app.use((e, req, res, next) => {
  console.error(e);
  next(e);
});

connection
  .sync()
  .then(() => app.listen(PORT, () => console.log(`Listening at: ${PORT}`)))
  .catch(console.error);
