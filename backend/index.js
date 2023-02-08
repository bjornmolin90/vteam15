const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');

const port = 1337;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors({
    origin: ['http://localhost:1338', 'http://localhost:1337', 'http://localhost:1339'],
    credentials: true
}));

const bikeProgramSimulator = require('./services/bikeProgram/bikeSimulator');

const bike = require('./routes/bike');
const user = require('./routes/user');
const bikeRide = require('./routes/bikeRide');
const city = require('./routes/city');
const locations = require('./routes/locations');

// Start the bike status checker
//bikeProgramStatus.startBikeProgram();

app.get("/simulation", (req, res) => {
    // Start the simulator adding bikes and user
    bikeProgramSimulator.startSimulator();
    res.json("Simulator started");
})

// Google oauth2
const passport = require('passport');
app.use(passport.initialize());

// Denna delen skapar cookie, som skickas till frontenden vid ett senare tillfälle
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    name: "vteam15",
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(passport.session());

// Öppnar google-oauth
require("./services/oauth")

// google login för kund
app.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// callback för kund
app.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:1338' }),
    (req, res) => {
        res.redirect("http://localhost:1338");
    }
);

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:1338");
    });
});
// Adding routes
app.use('/api/v01/bike', bike);
app.use('/api/v01/bikeride', bikeRide);
app.use('/api/v01/user', user);
app.use('/api/v01/city', city);
app.use('/api/v01/locations', locations);
// Start up server

app.listen(port, () => console.log(`Example API listening on port ${port}!`));