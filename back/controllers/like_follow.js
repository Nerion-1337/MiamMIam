// SERVER
const { SQL } = require("../SQL");
// DATA
const { Links_Server } = require("../links")
//
//
// FOLLOW  USER
//
//
exports.follow_user = (req, res, next) => {
//
// VARIABLE
//
const select = `SELECT ${Links_Server[5].id} FROM ${Links_Server[5].table} WHERE 
${Links_Server[5].element_id_table} = ${req.body.user_follow} AND 
${Links_Server[5].user_id} = ${req.auth.userId} AND
${Links_Server[5].element_type_table} = 'user'`
//                         
const delet_like_follow = `DELETE FROM ${Links_Server[5].table} WHERE
${Links_Server[5].id} = ?`
//                         
const delet_recipe=`UPDATE ${Links_Server[0].table} SET
${Links_Server[0].follower_total} = ${Links_Server[0].follower_total} - 1
WHERE ${Links_Server[0].id} = ${req.body.user_follow}`
//                         
const add_like_follow=`INSERT INTO ${Links_Server[5].table} (
${Links_Server[5].element_id_table},
${Links_Server[5].user_id},
${Links_Server[5].element_type_table}
) VALUE (${req.body.user_follow}, ${req.auth.userId}, 'user')`
//    
const add_recipe=`UPDATE ${Links_Server[0].table} SET
${Links_Server[0].follower_total} = ${Links_Server[0].follower_total} + 1
WHERE ${Links_Server[0].id} = ${req.body.user_follow}`
//
// VERIFIE SI L'UTILISATEUR A DEJA LIKE
//
    SQL.query(select, (err, data)=>{
        if (err) return res.status(510).json(err);
        // Si déjà présent enlever
        if (data.length){
            SQL.query(delet_like_follow, data[0].id, (err, data)=>{
                if (err) return res.status(510).json(err);
                // enlève -1 a la valeur contenu dans la table recette
                SQL.query(delet_recipe, (err, data)=>{
                    if (err) return res.status(510).json(err);
                    return res.status(200).json(-1);
                })
                })
        } else if (!data.length){
        // Si non présent ajouter
        SQL.query(add_like_follow, (err, data)=>{
            if (err) return res.status(510).json(err);
            // ajoute +1 a la valeur contenu dans la table recette
            SQL.query(add_recipe, (err, data)=>{
                if (err) return res.status(510).json(err);
                return res.status(200).json(+1);
            })
            })
        }
    })
        }  
//
//
// VERIFY LIKE FOLLOW USER
//
//
exports.verify_like_follow_user = (req, res, next) => {
  //
  // VARIABLE
  //  
  const select = `SELECT ${Links_Server[5].element_id_table} AS follow
   FROM ${Links_Server[5].table} 
   WHERE ${Links_Server[5].user_id} = ? 
   AND ${Links_Server[5].element_type_table} = 'user';
                  `;                
//
// REQUETTE
//
  SQL.query(select, req.auth.userId, (err, data)=>{
      if (err) return res.status(510).json(err);
      res.status(201).json({data: data, element: "user"});
  })                
        }        
//
//
// LIKE & FOLLOW RECIPE
//
//
exports.like_follow_recipe = (req, res, next) => {
//
// VARIABLE
//
  let select = "";
  let delet_like_follow = "";
  let delet_recipe = "";
  let add_like_follow = "";
  let add_recipe = "";
  let type_like_follow;
  let id_recipe;
//
// BOUCLE POUR ADAPTER REQUETTE SI LIKE / FOLLOW
//
  for (const [key, value] of Object.entries(req.body.formData)) {
//
  type_like_follow = key;
  id_recipe = value;
      switch (key){
//        
          case "like_total":
              select = `SELECT ${Links_Server[5].id} FROM ${Links_Server[6].table} WHERE 
                     ${Links_Server[6].element_id_table} = ${value} AND 
                     ${Links_Server[6].user_id} = ${req.auth.userId} AND
                     ${Links_Server[6].element_type_table} = 'recette'`;
              delet_like_follow = `DELETE FROM ${Links_Server[6].table} WHERE
                     ${Links_Server[6].id} = ?`
              delet_recipe=`UPDATE ${Links_Server[12].table} SET
                     ${Links_Server[12].like_total} = ${Links_Server[12].like_total} - 1
                     WHERE ${Links_Server[12].id} = ${value}`                   
              add_like_follow=`INSERT INTO ${Links_Server[6].table} (
                     ${Links_Server[6].element_id_table},
                     ${Links_Server[6].user_id},
                     ${Links_Server[6].element_type_table}
                     ) VALUE (${value}, ${req.auth.userId}, 'recette')`
              add_recipe=`UPDATE ${Links_Server[12].table} SET
                     ${Links_Server[12].like_total} = ${Links_Server[12].like_total} + 1
                     WHERE ${Links_Server[12].id} = ${value}`
          break;
//        
          case  "follower_total":
              select = `SELECT ${Links_Server[5].id} FROM ${Links_Server[5].table} WHERE 
                     ${Links_Server[5].element_id_table} = ${value} AND 
                     ${Links_Server[5].user_id} = ${req.auth.userId} AND
                     ${Links_Server[5].element_type_table} = 'recette'`
              delet_like_follow = `DELETE FROM ${Links_Server[5].table} WHERE
                     ${Links_Server[5].id} = ?`
              delet_recipe=`UPDATE ${Links_Server[12].table} SET
                     ${Links_Server[12].follower_total} = ${Links_Server[12].follower_total} - 1
                     WHERE ${Links_Server[12].id} = ${value}`
              add_like_follow=`INSERT INTO ${Links_Server[5].table} (
                     ${Links_Server[5].element_id_table},
                     ${Links_Server[5].user_id},
                     ${Links_Server[5].element_type_table}
                     ) VALUE (${value}, ${req.auth.userId}, 'recette')`
              add_recipe=`UPDATE ${Links_Server[12].table} SET
                     ${Links_Server[12].follower_total} = ${Links_Server[12].follower_total} + 1
                     WHERE ${Links_Server[12].id} = ${value}`
          break;
          default: break;    
      }
  }
//
// VERIFIE SI L'UTILISATEUR A DEJA LIKE
//
  SQL.query(select, (err, data)=>{
      if (err) return res.status(510).json(err);
      // Si déjà présent enlever
      if (data.length){
          SQL.query(delet_like_follow, data[0].id, (err, data)=>{
              if (err) return res.status(510).json(err);
              // enlève -1 a la valeur contenu dans la table recette
              SQL.query(delet_recipe, (err, data)=>{
                  if (err) return res.status(510).json(err);
                  return res.status(200).json([{type: type_like_follow}, {id: id_recipe}, {value: -1}]);
              })
              })
      } else if (!data.length){
      // Si non présent ajouter
      SQL.query(add_like_follow, (err, data)=>{
          if (err) return res.status(510).json(err);
          // ajoute +1 a la valeur contenu dans la table recette
          SQL.query(add_recipe, (err, data)=>{
              if (err) return res.status(510).json(err);
              return res.status(200).json([{type: type_like_follow}, {id: id_recipe}, {value: +1}]);
          })
          })
      }
  })
      }
//
//
// VERIFY LIKE FOLLOW RECIPE
//
//
exports.verify_like_follow_recipe = (req, res, next) => {
//
// VARIABLE
//  
const select = `SELECT 
(SELECT ${Links_Server[5].element_id_table} 
 FROM ${Links_Server[5].table} 
 WHERE ${Links_Server[5].user_id} = ? 
 AND ${Links_Server[5].element_type_table} = 'recette') AS follow,
 
(SELECT ${Links_Server[6].element_id_table} 
 FROM ${Links_Server[6].table} 
 WHERE ${Links_Server[6].user_id} = ? 
 AND ${Links_Server[6].element_type_table} = 'recette') AS likes;
                `;                
//
// REQUETTE
//
SQL.query(select, [req.auth.userId, req.auth.userId], (err, data)=>{
    if (err) return res.status(510).json(err);
    res.status(201).json({data: data, element: "recipe"});
})                
      }
//
//
// LIKE  COMMENT
//
//
exports.like_comment = (req, res, next) => {
//
// VARIABLE
//
let comment_id = parseInt(req.body.formData.like_total)
let key = Object.keys(req.body.formData)[0];
//
const select = `SELECT ${Links_Server[6].id} FROM ${Links_Server[6].table} WHERE 
${Links_Server[6].element_id_table} = ${comment_id} AND 
${Links_Server[6].user_id} = ${req.auth.userId} AND
${Links_Server[6].element_type_table} = 'comment'`
//                         
const delet_like = `DELETE FROM ${Links_Server[6].table} WHERE
${Links_Server[6].id} = ?`
//                         
const delet_like_comment=`UPDATE ${Links_Server[10].table} 
SET ${Links_Server[10].like_total} = ${Links_Server[10].like_total} - 1
WHERE ${Links_Server[10].id} = ${comment_id}`
//                         
const add_like=`INSERT INTO ${Links_Server[6].table} (
${Links_Server[6].element_id_table},
${Links_Server[6].user_id},
${Links_Server[6].element_type_table}
) VALUE (${comment_id}, ${req.auth.userId}, 'comment')`
//    
const add_like_comment=`UPDATE ${Links_Server[10].table} 
SET ${Links_Server[10].like_total} = ${Links_Server[10].like_total} + 1
WHERE ${Links_Server[10].id} = ${comment_id}`
//
// VERIFIE SI L'UTILISATEUR A DEJA LIKE
//
        SQL.query(select, (err, data)=>{
            if (err) return res.status(510).json(err);
            // Si déjà présent enlever
            if (data.length){
                SQL.query(delet_like, data[0].id, (err, data)=>{
                    if (err) return res.status(510).json(err);
                    // enlève -1 a la valeur contenu dans la table recette
                    SQL.query(delet_like_comment, (err, data)=>{
                        if (err) return res.status(510).json(err);
                        return res.status(200).json([{type: key}, {id: comment_id}, {value: -1}]);
                    })
                    })
            } else if (!data.length){
            // Si non présent ajouter
            SQL.query(add_like, (err, data)=>{
                if (err) return res.status(510).json(err);
                // ajoute +1 a la valeur contenu dans la table recette
                SQL.query(add_like_comment, (err, data)=>{
                    if (err) return res.status(510).json(err);
                    return res.status(200).json([{type: key}, {id: comment_id}, {value: +1}]);
                })
                })
            }
        })
     }  
//
//
// VERIFY LIKE COMMENT
//
//
exports.verify_like_comment = (req, res, next) => {
      //
      // VARIABLE
      //  
      const select = `SELECT ${Links_Server[6].element_id_table} AS likes
       FROM ${Links_Server[6].table} 
       WHERE ${Links_Server[6].user_id} = ? 
       AND ${Links_Server[6].element_type_table} = 'comment';
                      `;                
    //
    // REQUETTE
    //
      SQL.query(select, req.auth.userId, (err, data)=>{
          if (err) return res.status(510).json(err);
          res.status(201).json({data: data, element: "comment"});
      })                
    }   
