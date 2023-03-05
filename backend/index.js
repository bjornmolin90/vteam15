const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');

const port = 1337;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors({
    origin: ['http://localhost:1338', 'http://localhost:1337', 'http://localhost:1339', 'http://localhost:1340'],
    credentials: true
}));

const bikeProgramSimulator = require('./services/bikeProgram/bikeSimulator');

const bike = require('./routes/bike');
const user = require('./routes/user');
const bikeRide = require('./routes/bikeRide');
const city = require('./routes/city');
const locations = require('./routes/locations');
const payment = require('./routes/payment');

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

//let redirectUrl;
// Öppnar google-oauth
require("./services/oauth")

// google login för kund
app.get('/login', (req, res, next) => {
    let redirectUrl = req.query.origin;
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: redirectUrl
    })(req, res, next);
});

let mysql = require('./config/db')
// callback för kund
app.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:1338' }),
   async (req, res) => {
        let redirectUrl = req.query.state;
        // Här sätter man user till admin om redirectUrl är 1338.
        if (redirectUrl == "1338") {
            let sql = `UPDATE users SET u_type = 'admin' WHERE user_id = ${req.user.user_id};`;
            await mysql.connection.promise().query(sql)
        }
        
        // spara session att det är admin eller user
        req.user.user_type = redirectUrl == ("1339"||"1340") ? "kund": "admin";
        req.user.origin = redirectUrl;
        // ------------------------------------------------------
        switch (redirectUrl) {
            case '1338':
                res.redirect("http://localhost:1338");
                break;
            case '1339':
                res.redirect("http://localhost:1339");
                break;
            case '1340':
                res.redirect("http://localhost:1340");
                break;
            default:
                res.redirect("http://localhost:1338");
                break;
        }
    }
);

app.get('/logout', (req, res) => {
    let redirectUrl = req.user.origin
    req.logout(() => {
        console.log(redirectUrl);
        switch (redirectUrl) {
            case '1338':
                res.redirect("http://localhost:1338");
                break;
            case '1339':
                res.redirect("http://localhost:1339");
                break;
            case '1340':
                res.redirect("http://localhost:1340");
                break;
            default:
                res.redirect("http://localhost:1338");
                break;
        }
    });
});
// Adding routes
app.use('/api/v01/bike', bike);
app.use('/api/v01/bikeride', bikeRide);
app.use('/api/v01/user', user);
app.use('/api/v01/city', city);
app.use('/api/v01/locations', locations);
app.use('/api/v01/payment', payment);

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));