const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const routes = require('./routers');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(`Ошибка: ${err.message}`);
  res.status(500).json({ error: 'Ошибка сервера' });
});


module.exports = app;