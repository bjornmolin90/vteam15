const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'vteam'
});

connection.connect();

passport.use(new GoogleStrategy({
    clientID: '1065073167702-jdtotil3acn7693leg7tsl4fs66p8cba.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    const values = { 
        google_id: profile.id, 
        name: profile.displayName, 
        email: profile.emails[0].value
    }
    const query = connection.query('INSERT INTO users SET ?', values, function (error, results, fields) {
        if (error) throw error;
    });
    return cb(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const app = express();
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
