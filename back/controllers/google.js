// SERVER
const { SQL } = require("../SQL") ;
// COMPENENT
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// DATA
const { Links_Server } = require("../links")
// GOOGLE
const passport = require("passport");
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
//
//
//
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.ID_CLIENT_GOOGLE,
        clientSecret: process.env.CODE_SECREY_GOOGLE,
        callbackURL: 'http://localhost:5000/api/auth/google/callback',
        scope: [ 'profile', "email" ],
        state: true
      },
      (accessToken, refreshToken, profile, done) =>{
//
// VARIABLE
//         
    const select = `SELECT * FROM ${Links_Server[0].table} WHERE ${Links_Server[0].email} = ?`;
    const insert =  `INSERT INTO ${Links_Server[0].table} (${Links_Server[0].pseudo}, ${Links_Server[0].email}, ${Links_Server[0].password}, ${Links_Server[0].valid}) VALUE (?)`;
    const email = profile.emails ? profile.emails[0].value : null;
//
// VERIFIE UTILISATEUR EXISTANT
//    
    SQL.query(select, [email], (err, data)=>{
        if (err) return done(err);
        if (data.length) {
    const token = jwt.sign({ id: data[0].id }, process.env.TOKEN_SECRET, { expiresIn: '72h' });
    return done(null, token);
            }
//
// CRYPTAGE MDP
//  
  const cryptage = bcrypt.hashSync(process.env.PASSWORD_DEFAULT, 10);
//
// VALUES SAVE SERVEUR
//    
   const values = [profile.displayName, email, cryptage, 1];
//
 // INSERT DATA
//
    SQL.query(insert, [values], (err, data) =>{
    if (err) return done(err);
    const token = jwt.sign({ id: data.insertId }, process.env.TOKEN_SECRET, { expiresIn: '72h' });
    return done(null, token);
    });
});
      }
    )
  );


  passport.serializeUser(function(token, done) {
    done(null, token);
  });
  
  passport.deserializeUser(function(token, done) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      done(null, decoded);
    } catch (err) {
      done(err);
    }
  });