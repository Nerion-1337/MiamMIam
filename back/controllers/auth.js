// SERVER
const { SQL } = require("../SQL") ;
// COMPENENT
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// DATA
const { Links_Server } = require("../links")
//
//
// REGISTER
//
//
 exports.register = async (req, res, next) => {
//
// VARIABLE
//  
  const select = `SELECT * FROM ${Links_Server[0].table} WHERE ${Links_Server[0].pseudo} = ? OR ${Links_Server[0].email} = ?`;
  const insert =  `INSERT INTO ${Links_Server[0].table} (${Links_Server[0].pseudo}, ${Links_Server[0].email}, ${Links_Server[0].password}, ${Links_Server[0].check}) VALUE (?)`;
//
// VERIFIE UTILISATEUR EXISTANT
//
  SQL.query(select, [req.body[Links_Server[0].pseudo].trim(), req.body[Links_Server[0].email].trim()], (err, data)=>{
    if (err) return res.status(500).json(err);
    if (data.length) {
      if (data[0][Links_Server[0].pseudo] === req.body.identifiant.trim()) {
        return res.status(409).json("L'utilisateur existe déjà!");
      } else if (data[0][Links_Server[0].email] === req.body.email.trim()) {
        return res.status(409).json("L'email existe déjà!");
      }
    }
//
// CRYPTAGE MDP
//  
  const cryptage = bcrypt.hashSync(req.body[Links_Server[0].password].trim(), 10);
//
// GENERE CODE ALEATOIRE
//
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}
const randomString = generateRandomString(80);
//
// SEND MAIL
//
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "miam.miam.ofc@gmail.com",
    pass: process.env.PASSWORD_GMAIL,
  },
});

const mailOptions = {
  from: "miam.miam.ofc@gmail.com",
  to: req.body.email,
  subject: "Confirmation email",
  html: `<p>Cliquez sur le lien ci-dessous pour confirmer votre e-mail :</p>
  <a href="http://localhost:5173/confirmation/${randomString}">Confirmer l'e-mail</a>`,
};
//
// VALUES SAVE SERVEUR
//    
const values = [req.body[Links_Server[0].pseudo].trim(), req.body[Links_Server[0].email].trim(), cryptage, randomString];
//
// INSERT DATA
//
  SQL.query(insert, [values], (err, data) =>{
    if (err) return res.status(500).json(err);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("E-mail envoyé : " + info.response);
      }
    });
    return res.status(200).json("Utilisateur créé.");
   });
 });
};
//
//
// CONFIRM EMAIL
//
//
 exports.confirm_email = (req, res, next) => {
//
// VARIABLE
//  
  const select = `SELECT * FROM ${Links_Server[0].table} WHERE ${Links_Server[0].check} = ?`;
  const update = `UPDATE ${Links_Server[0].table} SET ${Links_Server[0].valid} = 1 WHERE ${Links_Server[0].email} = ?`;
//
// VERIFIE EMAIL TOKEN
//
  SQL.query(select, [req.body[Links_Server[0].valid].trim()], (err, data)=>{
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("L'utilisateur n'existe pas.");
    if (data[0][Links_Server[0].valid] === 1) return res.status(201).json("Email déjà validé.");
    console.log(data[0][Links_Server[0].email])
//
// INSERT DATA
//
SQL.query(update, [data[0][Links_Server[0].email].trim()], (err, data) =>{
  if (err) return res.status(500).json(err);
  if (data.affectedRows > 0) return res.json("Email Validé !");
  return res.status(403).json("Une erreur sur la table");
 });

 });
};
//
//
// RENVOIE EMAIL
//
//
 exports.renvoie_email = async (req, res, next) => {
//
// VARIABLE
//
const update = `UPDATE ${Links_Server[0].table} SET ${Links_Server[0].check} = ? WHERE ${Links_Server[0].email} = ?`;
//
// GENERE CODE ALEATOIRE
//
  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }
  const randomString = generateRandomString(80);
//
// REQUETTE SQL
//  
SQL.query(update, [randomString, req.body[Links_Server[0].email].trim()], (err, data)=>{
  if (err) return res.status(500).json(err);
  if (data.length === 0) return res.status(404).json({error_identifiant: "L'utilisateur n'existe pas"});
//
// SEND MAIL
//
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "miam.miam.ofc@gmail.com",
      pass: process.env.PASSWORD_GMAIL,
    },
  });
  
  const mailOptions = {
    from: "miam.miam.ofc@gmail.com",
    to: req.body.email,
    subject: "Confirmation email",
    html: `<p>Cliquez sur le lien ci-dessous pour confirmer votre e-mail :</p>
    <a href="http://localhost:5173/confirmation/${randomString}">Confirmer l'e-mail</a>`,
  };
  //
  // INSERT DATA
  //
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("E-mail envoyé : " + info.response);
        }
      });
});
};
//
//
// LOGIN
//
//
exports.login = (req, res, next) => {
//
// VARIABLE
//  
  const select = `SELECT * FROM ${Links_Server[0].table} WHERE ${Links_Server[0].email} = ? OR ${Links_Server[0].pseudo} = ?`;
//
// VERIFIE IDENTIFIANT ET PASSWORD
// 
  SQL.query(select, [req.body[Links_Server[0].pseudo].trim(), req.body[Links_Server[0].pseudo].trim()], (err, data)=>{
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({error_identifiant: "L'utilisateur n'existe pas"});
    if(data[0].confirm_email === 0) return res.status(400).json({error_email: "Vous devez confirmer votre email", email: data[0].email});

    const decryptage = bcrypt.compareSync(req.body[Links_Server[0].password].trim(), data[0][Links_Server[0].password]);

    if(!decryptage) return res.status(400).json({error_password:"Mauvais mot de passe"});

    const token = jwt.sign({ id: data[0].id }, process.env.TOKEN_SECRET, { expiresIn: '72h' });

    return res.status(200).json(token);
 });
};
//
//
// ENVOIE EMAIL RESET PASSWORD
//
//
 exports.envoie_email_reset_password = async (req, res, next) => {
//
// VARIABLE
//
const select = `SELECT * FROM ${Links_Server[0].table} WHERE ${Links_Server[0].email} = ? OR ${Links_Server[0].pseudo} = ?`;
const update = `UPDATE ${Links_Server[0].table} SET ${Links_Server[0].check} = ? WHERE ${Links_Server[0].email} = ?`;
//
// VERIFIE SI IDENTIFIANT EXISTANT
//
SQL.query(select, [req.body[Links_Server[0].email].trim(), req.body[Links_Server[0].email].trim()], (err, data)=>{
  if (err) return res.status(500).json(err);
  if (data.length === 0) return res.status(404).json({error_email: "Mauvais email ou pseudo"});
//
// GENERE CODE ALEATOIRE
//
  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }
  const randomString = generateRandomString(80);
//
// VARIABLE
//
const email_data = data[0].email;
//
// REQUETTE SQL
//  
SQL.query(update, [randomString, email_data], (err, data)=>{
  if (err) return res.status(500).json(err);
  if (data.length === 0) return res.status(404).json({error_identifiant: "L'utilisateur n'existe pas"});
  //
  // SEND MAIL
  //
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "miam.miam.ofc@gmail.com",
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  const mailOptions = {
    from: "miam.miam.ofc@gmail.com",
    to: email_data,
    subject: "Réinitialiser Mot de passe",
    html: `<p>Cliquez sur le lien ci-dessous pour modifier votre mot de passe :</p>
    <a href="http://localhost:5173/reset_password/${randomString}">Reset Password</a>`,
  };
  //
  // INSERT DATA
  //
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("E-mail envoyé : " + info.response);
        }
      });
      
      return res.status(200).json("Email envoyé !");
});
});
  };
//
//
// RESET PASSWORD
//
//
 exports.reset_password = (req, res, next) => {
//
// VARIABLE
//  
  const select = `SELECT * FROM ${Links_Server[0].table} WHERE ${Links_Server[0].check} = ?`;
  const update = `UPDATE ${Links_Server[0].table} SET ${Links_Server[0].password} = ? WHERE ${Links_Server[0].id} = ?`;
//
// VERIFIE EMAIL TOKEN
//
  SQL.query(select, [req.body[Links_Server[0].check].trim()], (err, data)=>{
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({error_token: 'Token non valide ! '});
//
// CRYPTAGE MDP
//  
  const cryptage = bcrypt.hashSync(req.body[Links_Server[0].password].trim(), 10);
//
// INSERT DATA
//
SQL.query(update, [cryptage, data[0][Links_Server[0].id]], (err, data) =>{
  if (err) return res.status(500).json(err);
  if (data.affectedRows > 0) return res.status(200).json("Mot de passe modifié !!");
  return res.status(403).json("Une erreur sur la table");
  
 });
 });
};