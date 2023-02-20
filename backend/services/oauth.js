const passport = require('passport');
const { getUserByEmail, createUser } = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const mysql = require('mysql');
let con = require('./../config/db')

passport.use(new GoogleStrategy({
  /* clientID: '1065073167702-jdtotil3acn7693leg7tsl4fs66p8cba.apps.googleusercontent.com',
   clientSecret: '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',
   callbackURL: 'http://localhost:3000/auth/google/callback'
 */
  clientID: '54683269931-o02rpbmmph41h85c44atmqndpsc0s2ht.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:1337/google/callback'
},
  async function (accessToken, refreshToken, profile, cb) {
    //console.log(accessToken);
    // kollar om google användare redan finns i databasen, om användare inte finns så skapas en ny 
    let sql = `SELECT * FROM users WHERE u_email = '${profile.emails[0].value}'`;
    let result = await con.connection.promise().query(sql);
    result = result[0]
    
    if (result.length > 0) {
      let user_id = await getUserByEmail(profile.emails[0].value);
      profile.user_id = user_id[0].user_id;
      console.log("Värdet finns redan i databasen och då loggas man in!");
      return cb(null, profile);
    } else {
      console.log("Värdet finns inte i databasen, skapar ny användare");
      // Skapa ny användare här.
      const values = {
        username: profile.name.givenName.toString(),
        u_type: "kund",
        u_password: profile.id,
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        adress: "a",
        postcode: "444",
        city: "a",
        saldo: 0,
        u_email: profile.emails[0].value
      }
      await createUser(values);
      let user_id = await getUserByEmail(profile.emails[0].value);
      profile.user_id = user_id[0].user_id;
      return cb(null, profile);
    }

  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
