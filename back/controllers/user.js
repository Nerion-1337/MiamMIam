// SERVER
const { SQL } = require("../SQL") ;
// COMPENENT
const fs = require("fs");
// DATA
const { Links_Server } = require("../links")
//
//
// GET USER
//
//
exports.data_user = (req, res, next) =>{
//
// VARIABLE
//  
  const select = `SELECT * FROM ${Links_Server[0].table} WHERE ${Links_Server[0].id} = ?`;
  let value;
//
//
//
if(req.headers.id_user){
  value = req.headers.id_user;
} else {
  value = req.auth.userId;
}
//
// REQUETTE SQL
//
  SQL.query(select, [value], (err, data) =>{
    if (err) return res.status(500).json(err);
//
// VARIABLE
//    
let user;

if(req.headers.id_user){
user = {
  [Links_Server[0].id]: data[0][Links_Server[0].id],
  [Links_Server[0].pseudo]: data[0][Links_Server[0].pseudo],
  [Links_Server[0].photo_profil]: data[0][Links_Server[0].photo_profil],
  [Links_Server[0].follower_total]: data[0][Links_Server[0].follower_total],
} 
} else {
//  
// DETERMINER L'AGE P/R A SA DATE DE NAISSANCE
//
  const dateParts = data[0][Links_Server[0].age].split('/');
  const jour = parseInt(dateParts[0]);
  const mois = parseInt(dateParts[1]) - 1; 
  const annee = parseInt(dateParts[2]);
  const dateNaissanceObj = new Date(annee, mois, jour);
// DATE DU JOUR
  const dateActuelle = new Date();
// CALCULE ENTRE DATE NAISSANCE ET HOLYDAY
  let age_value = dateActuelle.getFullYear() - dateNaissanceObj.getFullYear();
// CONTRÔLE SI LA DATE D'ANNIVERSAIRE EST PASSE
  const anniversairePasse = (dateActuelle.getMonth() > mois) || (dateActuelle.getMonth() === mois && dateActuelle.getDate() >= jour);
  if (!anniversairePasse) {
    age_value--;
  }
//
// DETERMINE VALEUR SEULON SEXE
//
let sexe_value;
if(data[0][Links_Server[0].sexe] === "Homme"){
  sexe_value = 370;
} else{
  sexe_value = 328;
}
//
// DETERMINER BESOINS CALORIQUE
//
const formule = process.env.FORMULE_CALORIE;
const masse_value = data[0][Links_Server[0].poids];
const mg_value = data[0][Links_Server[0].masse_grasse]
const majFormule = eval(formule.replace(/SEXE/g, sexe_value).replace(/MASSE/g, masse_value).replace(/MG/g, mg_value).replace(/AGE/g, age_value)).toFixed(2);
//
//
//
user= {
  [Links_Server[0].pseudo]: data[0][Links_Server[0].pseudo],
  [Links_Server[0].email]: data[0][Links_Server[0].email],
  [Links_Server[0].first_name]: data[0][Links_Server[0].first_name],
  [Links_Server[0].last_name]: data[0][Links_Server[0].last_name],
  [Links_Server[0].photo_profil]: data[0][Links_Server[0].photo_profil],
  [Links_Server[0].sexe]: data[0][Links_Server[0].sexe],
  [Links_Server[0].age]: data[0][Links_Server[0].age],
  [Links_Server[0].taille]: data[0][Links_Server[0].taille],
  [Links_Server[0].poids]: data[0][Links_Server[0].poids],
  [Links_Server[0].masse_grasse]: data[0][Links_Server[0].masse_grasse],
  [Links_Server[0].objectif]: data[0][Links_Server[0].objectif],
  [Links_Server[0].follower_total]: data[0][Links_Server[0].follower_total],
  besoins_calorie: parseFloat(majFormule),
}  
}
//
// RENDER FINAL
//
    return res.status(200).json(user);
  })
}
//
//
// UPDATE USER
//
//
exports.update_user_setting = (req, res, next) => { 
//
// VARIABLE
//
const select = `SELECT ${Links_Server[0].photo_profil} FROM ${Links_Server[0].table} WHERE id = ?`;   
 //
 // REQUETTE ADAPTER AUX DONNÉES RETOURNÉES
 //   
    let update = `UPDATE ${Links_Server[0].table} SET `;
    let setValues = [];
//
//
for (const [key, value] of Object.entries(req.body)) {
  if (value !== undefined) {
    setValues.push(`${key} = '${value}'`);
  }
}
// AJOUTE REQUETTE IMG
if (req.files && req.files.user && req.files.user.length > 0) {
  const photoUrl = `${req.protocol}://${req.get("host")}/assets/user/${req.auth.userId}/${req.files.user[0].filename}`;
  setValues.push(`${Links_Server[0].photo_profil} = '${photoUrl}'`);
//
// REQUETTE EFFACER PHOTO PR
//
  SQL.query(select, [req.auth.userId], (err, data)=>{
    if (err) return res.status(500).json(err);
    
    if(data[0][Links_Server[0].photo_profil] && data[0][Links_Server[0].photo_profil] != `${req.protocol}://${req.get("host")}/assets/user/default_avatar.jpg`){
      const filename = data[0][Links_Server[0].photo_profil].split("/user/")[1];
      fs.unlink(`assets/user/${filename}`, () =>{})
    } 
  })
}
//
update += setValues.join(', ');
update += ` WHERE id = ?`;
//
// REQUETTE
//  
    SQL.query(update, [req.auth.userId], (err, data)=>{
      if (err) return res.status(500).json("err");
      if (data.affectedRows > 0) return res.json("Mise à Jour");
      return res.status(403).json("Vous ne pouvez modifier que votre profil");
   });
  };
//
//
// GET ALL USER
//
//
exports.all_user = (req, res, next) =>{
  //
  // VARIABLE
  //  
    const select = `SELECT ${Links_Server[0].id},
                           ${Links_Server[0].pseudo},
                           ${Links_Server[0].photo_profil}
                      FROM ${Links_Server[0].table}
                      WHERE ${Links_Server[0].id} != ${req.auth.userId}`;
                    
  //
  // REQUETTE SQL
  //
    SQL.query(select, (err, data) =>{
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    })
  }