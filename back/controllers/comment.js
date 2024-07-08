// SERVER
const { SQL } = require("../SQL") ;
// DATA
const { Links_Server } = require("../links")
//
//
// GET COMMENT
//
//
exports.get_comment = (req, res, next) => {
//
//
// SWITCH
//
//
let key;
switch(true) {
    case 'recipe' in req.headers:
        key = "recipe"
    break;
//    
    default:
    break;
}
//
//    
// VARIABLE
//
//
const select_comment = `SELECT
    com.${Links_Server[10].id},
    com.${Links_Server[10].user_id},
    com.${Links_Server[10].contenu},
    com.${Links_Server[10].like_total},
    DATE_FORMAT(com.${Links_Server[10].date_ajout}, '%d %b') as date_ajout,
    DATE_FORMAT(com.${Links_Server[10].date_ajout}, '%d/%m/%y %H:%i') as full_date,
    user.${Links_Server[0].pseudo},
    user.${Links_Server[0].photo_profil}

FROM ${Links_Server[10].table} com

LEFT JOIN ${Links_Server[0].table} user ON com.${Links_Server[10].user_id} = user.${Links_Server[0].id}

WHERE com.${Links_Server[10].element_id_table} = ? AND com.${Links_Server[10].element_type_table} = ? `
//
const value = [parseInt(req.headers.recipe), key]
//
//
// REQUETTE SQL
//
//
SQL.query(select_comment, value,(err, data)=>{
    if (err) return res.status(510).json(err);
    return res.status(200).json(data);
})
}
//
//
// POST COMMENT RECIPE
//
//
exports.post_comment = (req, res, next) => {   
//
//    
// VARIABLE
//
//
const select_comment =`SELECT *
                       FROM ${Links_Server[10].table}
                       WHERE ${Links_Server[10].user_id} = ${req.auth.userId}
                       AND DATE(${Links_Server[10].date_ajout}) = CURDATE() 
                       AND HOUR(${Links_Server[10].date_ajout}) = HOUR(NOW())`
//
const insert_comment = `INSERT INTO ${Links_Server[10].table}
    (${Links_Server[10].user_id},
     ${Links_Server[10].contenu},
     ${Links_Server[10].element_type_table},
     ${Links_Server[10].element_id_table})
     VALUE (?)`
//
const value_insert = [
    req.auth.userId , 
    req.body[Links_Server[10].contenu].trim(), 
    req.body[Links_Server[10].element_type_table].trim(),
    parseInt(req.body[Links_Server[10].element_id_table])]
//
const select_user = `SELECT
user.${Links_Server[0].pseudo},
user.${Links_Server[0].photo_profil}

FROM ${Links_Server[0].table} user

WHERE ${Links_Server[0].id} = ?`
//
//
// REQUETTE SQL VERIFIER NOMBRE DE COMMENT PUBLIER USER
//
//
SQL.query(select_comment, (err, publish)=>{
    if (err) return res.status(510).json(err);
    if (publish.length > 4) {  
        return res.status(201).json({publish_comment: "Vous avez déjà publiez trop de commentaire en peu de temps."});
    }
//    
//
//
// REQUETTE SQL ADD COMMENT
//
//
    SQL.query(insert_comment, [value_insert],(err, comment)=>{
        if (err) return res.status(510).json(err);
//    
//
//
// REQUETTE SQL RECUPE DATA USER
//
//
        SQL.query(select_user, [req.auth.userId],(err, data)=>{
            if (err) return res.status(510).json(err);
//
// VARIABLE RETURN
//
const data_comment = {
    id: comment.insertId,
    user_id: req.auth.userId,
    contenu: req.body[Links_Server[10].contenu],
    like_total: 0,
    pseudo: data[0].pseudo,
    photo_profil: data[0].photo_profil,
    date_ajout: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    full_date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })
}
//
// RETURN
//
    return res.status(200).json(data_comment);
})      
  })
    })
    }
