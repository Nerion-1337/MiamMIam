// SERVER
const { SQL } = require("../SQL") ;
// DATA
const { Links_Server } = require("../links")
//
//
// REPORT SETTING
//
//
exports.report_setting = async (req, res, next) => {
//
// VARIABLE
//  
      const select = `SELECT * FROM ${Links_Server[4].table} WHERE ${Links_Server[4].user_id} = ?`;
      const insert_report =  `INSERT INTO ${Links_Server[4].table} (${Links_Server[4].user_id}, ${Links_Server[4].sujet}, ${Links_Server[4].contenu}) VALUE (?)`;

      const values_report = [req.auth.userId, req.body[Links_Server[4].sujet], req.body[Links_Server[4].contenu]];

      const insert_img = `INSERT INTO ${Links_Server[3].table} (${Links_Server[3].adress}, ${Links_Server[3].element_id_table}, ${Links_Server[3].element_type_table}) VALUE (?)`;
//
// VERIFIE COMBIEN DE SIGNALEMENT PAS USER
//
      SQL.query(select, [req.auth.userId], (err, data)=>{
        if (err) return res.status(500).json(err);
        if (data.length > 9) return res.status(409).json({ error_report_length: "Vous avez déjà soumis trop de signalement"});

//
// INSERT DATA REPORT
//
      SQL.query(insert_report, [values_report], (err, data) =>{
        if (err) return res.status(500).json(err);
//
// VARIABLE
//
if(req.files.signalement){
const photoUrls = req.files.signalement.map(file => `${req.protocol}://${req.get("host")}/assets/signalement/${req.auth.userId}/${file.filename}`);
//
const insertMultipleImages = photoUrls.map(photoUrl => {
  const valuesImg = [photoUrl, data.insertId, Links_Server[4].table];
  return new Promise((resolve, reject) => {
//
// INSERE IMG REPORT
//    
    SQL.query(insert_img, [valuesImg], (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
});

Promise.all(insertMultipleImages)
  .then(() => res.status(200).json("Signalement enregistré."))
  .catch(err => res.status(500).json(err));
}

return res.status(200).json(true)
       });
     });
    };