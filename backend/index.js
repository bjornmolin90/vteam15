const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser')

const app = express();
const port = 1337;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

const bike = require('./routes/bike');
const user = require('./routes/user');

// Adding routes
app.use('/api/v01/bike', bike);
app.use('/api/v01/user', user);

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));