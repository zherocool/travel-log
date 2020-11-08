// App imports
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// Environment configuration
require('dotenv').config();

// Project level imports
const middlewares = require('./middlewares');
const logs = require('./api/logs');

// App creation
const app = express();

// Database connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// App configuration
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

// App Routing
app.get('/', (req, res) => {
  res.json({
    message: 'hello',
  });
});

app.use('/api/logs', logs);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// App Starting
const port = process.env.PORT || 1337;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listenting at http://localhost:${port}`);
});
