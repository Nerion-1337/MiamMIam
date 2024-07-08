// SERVER
const { SQL } = require("../SQL") ;
// DATA
const { Links_Server } = require("../links")
//
//
// GET CONVERSATION
//
//
exports.all_conversation = (req, res, next) => {
//
//
// TRAITEMENT DYNAMIQUE
//
//
let whereClause = "";
if(req.body.option_conversation != "tout"){
    whereClause = `AND user_con.${Links_Server[8].option} = "${req.body.option_conversation}"`
}
//
//    
// VARIABLE
//
//
const select_conversation = `SELECT
    conv.${Links_Server[7].id},
    user.${Links_Server[0].id} AS user_id,
    user.${Links_Server[0].pseudo},
    user.${Links_Server[0].photo_profil},
    mes.${Links_Server[9].contenu},
    mes.${Links_Server[9].date_ajout},
    user_mes.${Links_Server[0].pseudo} AS auteur,
    user_mes.${Links_Server[0].id} AS auteur_id,
    user_con_auth.${Links_Server[8].option},
    user_con_auth.${Links_Server[8].classification}


    FROM ${Links_Server[7].table} conv

    LEFT JOIN ${Links_Server[8].table} user_con 
        ON user_con.${Links_Server[8].conversation_id} = conv.${Links_Server[7].id} 
        AND user_con.${Links_Server[8].user_id} != ${req.auth.userId}

    LEFT JOIN ${Links_Server[9].table} mes
        ON mes.${Links_Server[9].id} = (
            SELECT MAX(mes_sub.${Links_Server[9].id})
            FROM ${Links_Server[9].table} mes_sub
            WHERE mes_sub.${Links_Server[9].conversation_id} = conv.${Links_Server[7].id})

    LEFT JOIN ${Links_Server[0].table} user 
    ON user.${Links_Server[0].id} = user_con.${Links_Server[9].user_id}

    LEFT JOIN ${Links_Server[0].table} user_mes 
    ON user_mes.${Links_Server[0].id} = mes.${Links_Server[9].user_id}

    LEFT JOIN ${Links_Server[8].table} user_con_auth 
    ON user_con_auth.${Links_Server[8].user_id} = ${req.auth.userId}
    AND user_con_auth.${Links_Server[8].conversation_id} = conv.${Links_Server[7].id}

    WHERE conv.${Links_Server[7].id} IN (
        SELECT user_con.${Links_Server[8].conversation_id}
        FROM ${Links_Server[8].table} user_con
        WHERE user_con.${Links_Server[8].user_id} = ${req.auth.userId}
        AND user_con.${Links_Server[8].classification} = "valide"
        ${whereClause})`
//
//
// REQUETTE SQL
//
//
SQL.query(select_conversation, (err, conversation_data)=>{
    if (err) return res.status(510).json(err);
//
//    
// VARIABLE
//
//
const mergedData = [];
const tempoData = {};
//
//
// FUNCTION
//
//
// Boucle pour fusionner id conversation identique
conversation_data.forEach(conversation => {
    // Vérifier si l'identifiant existe déjà dans les données temporaires
    if (tempoData.hasOwnProperty(conversation.id)) {
        // Si l'identifiant existe déjà, vérifier si pseudo est déjà un tableau
        if (Array.isArray(tempoData[conversation.id].pseudo)) {
            // Si pseudo est déjà un tableau, ajouter le pseudo à la liste existante
            tempoData[conversation.id].pseudo.push(conversation.pseudo);
        } else {
            // Si pseudo n'est pas un tableau, le convertir en tableau et ajouter les valeurs existantes
            tempoData[conversation.id].pseudo = [tempoData[conversation.id].pseudo, conversation.pseudo];
        }
        // Marquer l'élément comme faisant partie d'un groupe
        tempoData[conversation.id].groupe = true;
    } else {
        // Si l'identifiant n'existe pas encore, créer une nouvelle entrée
        tempoData[conversation.id] = conversation;
    }
});
// Convertir l'objet temporaire en tableau pour obtenir les données fusionnées
for (const key in tempoData) {
    if (tempoData.hasOwnProperty(key)) {
        mergedData.push(tempoData[key]);
    }
}
// TRIE DESC
mergedData.sort((a, b) => {
    const dateA = new Date(a.date_ajout);
    const dateB = new Date(b.date_ajout);
    return dateB - dateA;
});
//
//
// RETURN
//
//
    return res.status(200).json(mergedData);
})
};
//
//
// ADD CONVERSATION
//
//
exports.add_conversation = (req, res, next) => {
//
//
// TRAITEMENT DYNAMIQUE
//
//
const currentUser = req.auth.userId;
const otherUsers  = req.body.formData.map(obj => obj.value);
const users = [currentUser, ...otherUsers];
//
//    
// VARIABLE
//
//
const select = `SELECT
    conv.${Links_Server[7].id},
    MAX(CASE WHEN user_c.${Links_Server[8].user_id} = ${currentUser} THEN user_c.${Links_Server[8].classification} ELSE NULL END) AS classification

FROM ${Links_Server[7].table} conv

LEFT JOIN ${Links_Server[8].table} user_c ON conv.${Links_Server[7].id} = user_c.${Links_Server[8].conversation_id}

WHERE user_c.${Links_Server[8].user_id} IN (${users.join(',')})
AND NOT EXISTS (
    SELECT 1
    FROM ${Links_Server[8].table} user_c_inner
    WHERE user_c_inner.${Links_Server[8].conversation_id} = conv.${Links_Server[7].id}
    AND user_c_inner.${Links_Server[8].user_id} NOT IN (${users.join(',')})
)

GROUP BY conv.${Links_Server[7].id}

HAVING COUNT(DISTINCT user_c.${Links_Server[8].user_id}) = ${users.length}`
//
//
// REQUETTE SQL
//
//
SQL.query(select, (err, data_select) =>{
    if (err) return res.status(500).json(err);
    if(data_select.length > 0){
        if(data_select[0].classification === "valide"){
          return res.status(200).json({conversation: data_select[0].id});     
        }
//
//
// VARIABLE
//
//
const update = `UPDATE ${Links_Server[8].table}
SET ${Links_Server[8].classification} = "valide"
WHERE ${Links_Server[8].conversation_id} = ${data_select[0].id} 
AND ${Links_Server[8].user_id} = ${req.auth.userId}`
//
//
// REQUETTE SQL
//
//        
        SQL.query(update, (err, data_update) =>{
            if (err) return res.status(500).json(err);
            return res.status(200).json({conversation: data_select[0].id});
            })
//                      
} else if(data_select.length = 0){  
//
//
// VARIABLE
//
//
const insert_convers = `INSERT INTO ${Links_Server[7].table} 
(${Links_Server[7].etat_validation}) 
VALUES ("valide")`
//
const insert_user = `INSERT INTO ${Links_Server[8].table}
( ${Links_Server[8].user_id},
  ${Links_Server[8].conversation_id})
VALUES ?`
//
//
// REQUETTE SQL
//
//
SQL.query(insert_convers, (err, data_convers) =>{
    console.log(err)
    if (err) return res.status(500).json(err);
//
//
// VARIABLE
//
//
const values = users.map(userId => [userId, data_convers.insertId]);
//
//
// REQUETTE SQL
//
//
SQL.query(insert_user, [values], (err, data_user) =>{
    if (err) return res.status(500).json(err);
    return res.status(200).json({conversation: data_convers.insertId});
})
})
}
  })
};
//
//
// UPDATE OPTION CONVERSATION
//
//
exports.update_option_conversation = (req, res, next) => {
//
//    
// VARIABLE
//
//
const update = `UPDATE ${Links_Server[8].table}
SET ${Links_Server[8].option} = "${req.body.option_conversation}"
WHERE ${Links_Server[8].conversation_id} = ${req.body.conversation_id} 
AND ${Links_Server[8].user_id} = ${req.auth.userId}`
//
//
// REQUETTE SQL
//
//
SQL.query(update, (err, data_update) =>{
    if (err) return res.status(500).json(err);
    return res.status(200).json([{id: req.body.conversation_id}, {option_update: req.body.option_conversation}]);
    })
};
//
//
// BLOQUER CONVERSATION
//
//
exports.hidden_conversation = (req, res, next) => {
//
//    
// VARIABLE
//
//
const update = `UPDATE ${Links_Server[8].table}
    SET ${Links_Server[8].classification} = "bloquer"
    WHERE ${Links_Server[8].conversation_id} = ${req.body.conversation_id} 
    AND ${Links_Server[8].user_id} = ${req.auth.userId}`
//
//
// REQUETTE SQL
//
//
SQL.query(update, (err, data_update) =>{
    if (err) return res.status(500).json(err);
    return res.status(200).json([{id: req.body.conversation_id}, {classification: "bloquer"}]);
    })
};
//
//
// GET ALL MESSAGE
//
//
exports.all_message = (req, res, next) => {
//
//    
// VARIABLE
//
//
const select_message = `SELECT
    mes.${Links_Server[9].id},
    mes.${Links_Server[9].conversation_id},
    mes.${Links_Server[9].user_id},
    user.${Links_Server[0].pseudo},
    user.${Links_Server[0].photo_profil},
    mes.${Links_Server[9].contenu},
    DATE_FORMAT(mes.${Links_Server[9].date_ajout}, '%H:%i') as date_ajout,
    DATE_FORMAT(mes.${Links_Server[9].date_ajout}, '%d/%m/%y') as full_date

    FROM ${Links_Server[8].table} user_con

    LEFT JOIN ${Links_Server[9].table} mes ON mes.${Links_Server[9].conversation_id} = user_con.${Links_Server[8].conversation_id}

    LEFT JOIN ${Links_Server[0].table} user ON user.${Links_Server[0].id} = mes.${Links_Server[9].user_id}

    WHERE user_con.${Links_Server[8].conversation_id} = ${req.body.conversation_id} AND user_con.${Links_Server[8].user_id} = ${req.auth.userId}
    
    ORDER BY mes.${Links_Server[9].id} ASC`
//
//
// REQUETTE SQL
//
//
SQL.query(select_message, (err, data)=>{
    if (err) return res.status(510).json(err);
    return res.status(200).json(data);
})
};
//
//
// POST message RECIPE
//
//
exports.post_message = (req, res, next) => {   
//
//    
// VARIABLE
//
//
    const select_message =`SELECT *
                           FROM ${Links_Server[9].table}
                           WHERE ${Links_Server[9].user_id} = ${req.auth.userId} 
                           AND ${Links_Server[9].conversation_id} = ${req.body[Links_Server[9].conversation_id]}
                           AND DATE(${Links_Server[9].date_ajout}) = CURDATE() 
                           AND HOUR(${Links_Server[9].date_ajout}) = HOUR(NOW())`
//
    const insert_message = `INSERT INTO ${Links_Server[9].table}
        (${Links_Server[9].user_id},
         ${Links_Server[9].conversation_id},
         ${Links_Server[9].contenu})
         VALUE (?)`
//
    const value_insert = [
        req.auth.userId , 
        req.body[Links_Server[9].conversation_id].trim(), 
        req.body[Links_Server[9].contenu].trim()]
//
    const select_user = `SELECT
    user.${Links_Server[0].pseudo},
    user.${Links_Server[0].photo_profil}
    
    FROM ${Links_Server[0].table} user
    
    WHERE ${Links_Server[0].id} = ?`
    //
    //
    // REQUETTE SQL VERIFIER NOMBRE DE message PUBLIER USER
    //
    //
    SQL.query(select_message, (err, publish)=>{
        if (err) return res.status(510).json(err);
        if (publish.length > 100) {  
            return res.status(201).json({publish_message: "Vous avez déjà publiez trop de message en peu de temps."});
        }
    //    
    //
    //
    // REQUETTE SQL ADD message
    //
    //
        SQL.query(insert_message, [value_insert],(err, message)=>{
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
    const data_message = {
        id: message.insertId,
        conversation_id: req.body[Links_Server[9].conversation_id],
        user_id: req.auth.userId,
        contenu: req.body[Links_Server[9].contenu],
        pseudo: data[0].pseudo,
        photo_profil: data[0].photo_profil,
        date_ajout: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        full_date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })
    }
    //
    // RETURN
    //
        return res.status(200).json(data_message);
    })      
      })
        })
}    