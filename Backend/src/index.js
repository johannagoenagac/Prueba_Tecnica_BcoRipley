const express = require('express');
const app = express();
const logger = require('./config/logger/logger')('database');
const cors = require('cors');

require('./database');

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 ,
    credentials: true
};

app.use(cors(corsOptions));


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); 

// app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/index'));

app.listen(3000);
logger.silly('server on port 3000', 3000);

