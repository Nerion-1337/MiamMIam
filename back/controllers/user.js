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
//
// REQUETTE SQL
//
  SQL.query(select, [req.auth.userId], (err, data) =>{
    if (err) return res.status(500).json(err);
//
// VARIABLE
//    
const user = {
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