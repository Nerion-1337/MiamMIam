// SERVER
const { SQL } = require("../SQL") ;
// DATA
const { Links_Server } = require("../links")
//
//
// ADD CONSOMMATION
//
//
exports.add_consumption = (req, res, next) => {
//    
// VARIABLE
//
    const insert =`INSERT INTO ${Links_Server[16].table} 
    (${Links_Server[16].user_id}, 
     ${Links_Server[16].recette_id}, 
     ${Links_Server[16].pourcentage}) 
     VALUE (?, ?, ?)`
//     
    const value = [req.auth.userId, req.body[Links_Server[16].recette_id], req.body[Links_Server[16].pourcentage]]
//
// REQUETTE
//
SQL.query(insert, value, (err, data)=>{
    if (err) return res.status(500).json(err);
//       
       const select_consumption = `SELECT 
       conso.${Links_Server[16].recette_id},
       conso.${Links_Server[16].pourcentage} AS pourcentage_recette,
       i.${Links_Server[18].name} AS name_ingredient,
       cr.${Links_Server[14].quantite} AS quantite_contenu_recette,
       mm.${Links_Server[17].name} AS name_macro_micro,
       ci.${Links_Server[19].quantite} AS quantite_macro
   
       FROM ${Links_Server[16].table} conso
   
       LEFT JOIN ${Links_Server[14].table} cr ON cr.${Links_Server[14].recette_id} = conso.${Links_Server[16].recette_id} AND cr.${Links_Server[14].element_type_table} = 'ingredient'
   
       LEFT JOIN ${Links_Server[18].table} i ON i.${Links_Server[18].id} = cr.${Links_Server[14].element_id_table} AND cr.${Links_Server[14].element_type_table} = 'ingredient'
   
       LEFT JOIN ${Links_Server[19].table} ci ON ci.${Links_Server[19].ingredient_id} = i.${Links_Server[18].id} AND ci.${Links_Server[19].type} = '${Links_Server[17].table}'
   
       LEFT JOIN ${Links_Server[17].table} mm ON mm.${Links_Server[18].id} = ci.${Links_Server[19].other_table_id} AND ci.${Links_Server[19].type} = '${Links_Server[17].table}'
   
       WHERE conso.${Links_Server[16].id} = ${data.insertId}`;
//
       const return_consumption = {};
//
       let totalProtein = 0;
       let totalCarb = 0;
       let totalFat = 0;     
//
// REQUETTE
//
    SQL.query(select_consumption, (err, data)=>{
        if (err) return res.status(500).json(err);
        if (data.length === 0) {  
            return res.status(201).json({comsuption: "Vous n'avez pas consommer cette recette"});
        }
//    
// BOUCLE POUR REGROUPER LES VALEURS
//
data.forEach(item => {
    const { name_macro_micro, quantite_macro, quantite_contenu_recette, pourcentage_recette } = item;
    const value = parseFloat(quantite_macro) * parseFloat(quantite_contenu_recette) / 100;

    if (return_consumption.hasOwnProperty(name_macro_micro)) {
        return_consumption[name_macro_micro] += value * pourcentage_recette / 100;
    } else {
        return_consumption[name_macro_micro] = value * pourcentage_recette / 100;
    }

// Calcul des calories
    if (name_macro_micro === "proteine") {
        totalProtein += value * pourcentage_recette / 100;
     } else if (name_macro_micro === "glucide") {
        totalCarb += value * pourcentage_recette / 100;
     } else if (name_macro_micro === "lipide") {
         totalFat += value * pourcentage_recette / 100;
    }
});
// Arrondir chaque valeur dans return_consumption à deux chiffres après la virgule
for (const key in return_consumption) {
    if (Object.prototype.hasOwnProperty.call(return_consumption, key)) {
        return_consumption[key] = parseFloat(return_consumption[key].toFixed(2));
    }
}
//
// Calcul des calories totales
//
    const totalCalories = ((totalProtein + totalCarb) * 4 + totalFat * 9);
// Ajout de la clé "calorie" avec la valeur calculée
     return_consumption["calorie"] = parseFloat(totalCalories.toFixed(2));
//
// RETURN IF ALL GOOD
//
        return res.status(201).json( return_consumption);
        })
    })
}
//
//
// EDIT % CONSOMMATION
//
//
exports.edit_consumption = (req, res, next) => {
//
// VARIABLE
//
    const edit =`UPDATE ${Links_Server[16].table} 
    SET ${Links_Server[16].pourcentage} = ?
    WHERE ${Links_Server[16].id} = ?
    AND ${Links_Server[16].date_ajout} = ?
    AND ${Links_Server[16].user_id} = ?`
//    
    const value_edit = [req.body[Links_Server[16].pourcentage], req.body[Links_Server[16].recette_id], req.body[Links_Server[16].date_ajout], req.autg.userId] 
//
// REQUETTE
//
    SQL.query(edit, value_edit, (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(201).json("Bonne appétit !");
        })
    }
//
//
// GET CONSOMMATION
//
//
exports.get_consumption = (req, res, next) => {
//
// TRAITEMENT DYNAMIQUE WHERE
//
const element = req.headers.consumption_time;
let whereClause;
//
// SWITCH
//
switch (element) {
    case "holyday":
        whereClause = `WHERE conso.${Links_Server[16].user_id} = ?
        AND DATE(conso.${Links_Server[16].date_ajout}) = CURDATE()`;
      break;
    case "week":
        whereClause = `WHERE conso.${Links_Server[16].user_id} = ?
        AND WEEK(conso.${Links_Server[16].date_ajout}) = WEEK(CURDATE())`;
      break;  
    case "month":
        whereClause = `WHERE conso.${Links_Server[16].user_id} = ?
        AND MONTH(conso.${Links_Server[16].date_ajout}) = MONTH(CURDATE())`;
      break;
      case "all":
        whereClause = `WHERE conso.${Links_Server[16].user_id} = ?`;
      break;
}   
//    
// VARIABLE
//
       const value_select_consumption = [req.auth.userId];
//       
       const select_consumption = `SELECT 
       conso.${Links_Server[16].recette_id},
       conso.${Links_Server[16].pourcentage} AS pourcentage_recette,
       i.${Links_Server[18].name} AS name_ingredient,
       cr.${Links_Server[14].quantite} AS quantite_contenu_recette,
       mm.${Links_Server[17].name} AS name_macro_micro,
       ci.${Links_Server[19].quantite} AS quantite_macro
   
       FROM ${Links_Server[16].table} conso
   
       LEFT JOIN ${Links_Server[14].table} cr ON cr.${Links_Server[14].recette_id} = conso.${Links_Server[16].recette_id} AND cr.${Links_Server[14].element_type_table} = 'ingredient'
   
       LEFT JOIN ${Links_Server[18].table} i ON i.${Links_Server[18].id} = cr.${Links_Server[14].element_id_table} AND cr.${Links_Server[14].element_type_table} = 'ingredient'
   
       LEFT JOIN ${Links_Server[19].table} ci ON ci.${Links_Server[19].ingredient_id} = i.${Links_Server[18].id} AND ci.${Links_Server[19].type} = '${Links_Server[17].table}'
   
       LEFT JOIN ${Links_Server[17].table} mm ON mm.${Links_Server[18].id} = ci.${Links_Server[19].other_table_id} AND ci.${Links_Server[19].type} = '${Links_Server[17].table}'
   
       ${whereClause}`;
//
       const return_consumption = {};
//
       let totalProtein = 0;
       let totalCarb = 0;
       let totalFat = 0;     
//
// REQUETTE
//
    SQL.query(select_consumption, value_select_consumption, (err, data)=>{
        if (err) return res.status(500).json(err);
        if (data.length === 0) {  
            return res.status(201).json({comsuption: "Vous n'avez pas consommer de recette"});
        }
//    
// BOUCLE POUR REGROUPER LES VALEURS
//
data.forEach(item => {
    const { name_macro_micro, quantite_macro, quantite_contenu_recette, pourcentage_recette } = item;
    const value = parseFloat(quantite_macro) * parseFloat(quantite_contenu_recette) / 100;

    if (return_consumption.hasOwnProperty(name_macro_micro)) {
        return_consumption[name_macro_micro] += value * pourcentage_recette / 100;
    } else {
        return_consumption[name_macro_micro] = value * pourcentage_recette / 100;
    }

// Calcul des calories
    if (name_macro_micro === "proteine") {
        totalProtein += value * pourcentage_recette / 100;
     } else if (name_macro_micro === "glucide") {
        totalCarb += value * pourcentage_recette / 100;
     } else if (name_macro_micro === "lipide") {
         totalFat += value * pourcentage_recette / 100;
    }
});
// Arrondir chaque valeur dans return_consumption à deux chiffres après la virgule
for (const key in return_consumption) {
    if (Object.prototype.hasOwnProperty.call(return_consumption, key)) {
        return_consumption[key] = parseFloat(return_consumption[key].toFixed(2));
    }
}
//
// Calcul des calories totales
//
    const totalCalories = ((totalProtein + totalCarb) * 4 + totalFat * 9);
// Ajout de la clé "calorie" avec la valeur calculée
     return_consumption["calorie"] = parseFloat(totalCalories.toFixed(2));
//
// RETURN IF ALL GOOD
//
        return res.status(201).json(return_consumption);
        })
    }    