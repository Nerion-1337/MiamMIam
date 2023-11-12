// SERVER
const { SQL } = require("../SQL") ;
// COMPENENT
const fs = require("fs");
// DATA
const { Links_Server } = require("../links")
//
//
//
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
  [Links_Server[0].name]: data[0][Links_Server[0].name],
  [Links_Server[0].photo_profil]: data[0][Links_Server[0].photo_profil],
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
  //
  exports.update_avatar = (req, res, next) => {
    const update = "UPDATE users SET `portrait`=? WHERE id=?";
    const urlImg = `${req.protocol}://${req.get("host")}/assets/avatar/${req.files['avatar'][0].filename}`;
    const select = "SELECT portrait FROM users WHERE id = ?";
  
    SQL.query(select, [req.auth.userId], (err, data)=>{
      if (err) return res.status(500).json(err);
      
      if(data[0].avatar){
        const filename = data[0].avatar.split("/avatar/")[1];
        fs.unlink(`assets/avatar/${filename}`, () =>{})
      } 
  
    SQL.query(update, [urlImg, req.auth.userId], (err, data)=>{
      if (err) return res.status(500).json("err");
      if (data.affectedRows > 0) return res.json("Mise à Jour");
      return res.status(403).json("Vous ne pouvez modifier que votre profil");
   });
  });
  };