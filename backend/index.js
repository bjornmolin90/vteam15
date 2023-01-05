const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');

const port = 1337;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

//const bikeProgramStatus = require('./services/bikeProgram/bikeStatusChecker');
const bikeProgramSimulator = require('./services/bikeProgram/bikeSimulator');

const bike = require('./routes/bike');
const user = require('./routes/user');
const bikeRide = require('./routes/bikeRide');
const city = require('./routes/city');

// Start the bike status checker
//bikeProgramStatus.startBikeProgram();

app.get("/simulation", (req, res) => {
    // Start the simulator adding bikes and user
    bikeProgramSimulator.startSimulator();
    res.json("Simulator started");

})

// Adding routes
app.use('/api/v01/bike', bike);
app.use('/api/v01/bikeride', bikeRide);
app.use('/api/v01/user', user);
app.use('/api/v01/city', city);

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));