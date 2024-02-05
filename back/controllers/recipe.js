// SERVER
const { SQL } = require("../SQL") ;
// DATA
const { Links_Server } = require("../links")
//
//
// GET ELEMENT RECIPE
//
//
exports.element_recipe = (req, res, next) => {
//    
// VARIABLE
//
const element = req.headers.element_recipe
let elementType = "";
//
// SWITCH
//
switch (element) {
    case "ingredient":
        elementType = `SELECT ${Links_Server[18].name}, ${Links_Server[18].marque} FROM ${Links_Server[18].table}`;
      break;
    case "ustensil":
        elementType = `SELECT ${Links_Server[20].name} FROM ${Links_Server[20].table}`;
      break;  
    case "repas":
        elementType = `SELECT ${Links_Server[21].name} FROM ${Links_Server[21].table}`;
      break;
    case "macro_micro":
        elementType = `SELECT ${Links_Server[17].name}, ${Links_Server[17].abreviation}, ${Links_Server[17].type} FROM ${Links_Server[17].table}`;
      break;
    case "type":
        elementType = `SELECT ${Links_Server[22].name}, ${Links_Server[22].abreviation} FROM ${Links_Server[22].table}`;
      break;
    case "pseudo":
        elementType = `SELECT DISTINCT ${Links_Server[0].pseudo} AS name FROM ${Links_Server[12].table} r 
        JOIN ${Links_Server[0].table} u ON r.${Links_Server[12].user_id} = u.${Links_Server[0].id}`;
      break;
}
//
// REQUETTE SQL
//
SQL.query(elementType, (err, data) => {
    if (err) return res.status(500).json(err);
//
// TRIE DONNE A à Z
//
    const data_trie = () => {
      data.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0; 
      });
      return data; 
    };
//
//  
    const dataTrie = data_trie();
//
//  
    return res.status(200).json({ data: dataTrie, element: element });
  });    
    }
//
//
// ADD INGREDIENT
//
//
exports.add_ingredient = (req, res, next) => {
//    
// VARIABLE
//
const select = `SELECT * FROM ${Links_Server[18].table} WHERE ${Links_Server[18].name} = ? AND ${Links_Server[18].marque} = ?`;
const insert =`INSERT INTO ${Links_Server[18].table} 
(${Links_Server[18].user_id}, 
 ${Links_Server[18].name}, 
 ${Links_Server[18].description}, 
 ${Links_Server[18].calorie}, 
 ${Links_Server[18].marque}) 
 VALUE (?)`
let value;
let search;
//
if(req.body.marque){
    value = [req.auth.userId , 
        req.body[Links_Server[18].name].trim().toLowerCase(), 
        req.body[Links_Server[18].description].trim(), 
        req.body[Links_Server[18].calorie].trim(), 
        req.body[Links_Server[18].marque].trim().toLowerCase()]
    search = [req.body[Links_Server[18].name].trim(), req.body[Links_Server[18].marque].trim()]  
} else {
    value = [req.auth.userId , 
        req.body[Links_Server[18].name].trim().toLowerCase(), 
        req.body[Links_Server[18].description].trim(), 
        req.body[Links_Server[18].calorie].trim(),
        "natif"]
    search = [req.body[Links_Server[18].name].trim(), "natif"]
}
//
// VERIFIE INGREDIENT EXISTANT
//
SQL.query(select, search, (err, data)=>{
    if (err) return res.status(500).json(err);
    if (data.length) {  
        return res.status(409).json({error_duplicate: "L'ingredient existe déjà!"});
    }
//
// REQUETTE INSERT INGREDIENT
//  
SQL.query(insert, [value], (err, data)=>{
    if (err) return res.status(500).json("err");     
//    
// VARIABLE
//
let id_ingredient = data.insertId
let setValues =[
    {type: Links_Server[17].table, name: "proteine", quantite: req.body.proteine},
    {type: Links_Server[17].table, name: "glucide", quantite: req.body.glucide},
    {type: Links_Server[17].table, name: "lipide", quantite: req.body.lipide}
];
//
const name_file = req.body.name.toLowerCase().normalize('NFD').replace(/[^a-z\s]/gi, '').split(' ').join('_');
const linkImg = `${req.protocol}://${req.get("host")}/assets/ingredient/${name_file}/${req.files.ingredient[0].filename}`;
const insert_img = `INSERT INTO ${Links_Server[3].table} 
(${Links_Server[3].adress}, 
 ${Links_Server[3].element_id_table}, 
 ${Links_Server[3].element_type_table}) 
 VALUE (?)`
const value_img = [linkImg, id_ingredient, Links_Server[18].table]
//
// REQUETTE SI IMAGE
//
if (req.files && req.files.ingredient && req.files.ingredient.length > 0) {
    SQL.query(insert_img, [value_img], (err, data)=>{
        if (err) return res.status(500).json({error_img: "L'image n'a put être enregistré."});
    })  
}
//
// BOUCLE
//
if (Array.isArray(req.body.type)) {
    const Type = req.body.type.map(JSON.parse);
    Type.forEach(({ name }) => {
        setValues.push({
            type: Links_Server[22].table,
            name,
            quantite: "1"
        });
    });
} else if (req.body.type) {
    const { name } = JSON.parse(req.body.type);
    setValues.push({
        type: Links_Server[22].table,
        name,
        quantite: "1"
    });
}
//
if (Array.isArray(req.body.vitamine_mineraux)) {
    const vitamineMineraux = req.body.vitamine_mineraux.map(JSON.parse);
    vitamineMineraux.forEach(({ name, quantite }) => {
        setValues.push({
            type: Links_Server[17].table,
            name,
            quantite
        });
    });
} else if (req.body.vitamine_mineraux) {
    const { name, quantite } = JSON.parse(req.body.vitamine_mineraux);
    setValues.push({
        type:Links_Server[17].table,
        name,
        quantite
    });
}
// 
if (Array.isArray(req.body.micronutriment)) {
    const microNutriment = req.body.micronutriment.map(JSON.parse);
    microNutriment.forEach(({ name, quantite }) => {
        setValues.push({
            type: Links_Server[17].table,
            name,
            quantite
        });
    });
} else if (req.body.micronutriment) {
    const { name, quantite } = JSON.parse(req.body.micronutriment);
    setValues.push({
        type: Links_Server[17].table,
        name,
        quantite
    });
}
//
// BOUCLE REQUETE ID ET INSERT
//
    setValues.forEach(({ type, name, quantite }) => {
//
// VARIABLE
//         
let select_id = `SELECT id FROM ${type} WHERE name = ?`;
//
// REQUETTE RECHERCHE ID
//
        SQL.query(select_id, [name], (err, data) => {
        if (err) return res.status(500).json("err");
//
// VARIABLE
//    
const insert_contenu = `INSERT INTO ${Links_Server[19].table} (${Links_Server[19].other_table_id}, ${Links_Server[19].type}, ${Links_Server[19].ingredient_id}, ${Links_Server[19].quantite}) VALUE (?)`
const value_contenu = [data[0].id, type, id_ingredient, parseFloat(quantite)]
//
// REQUETTE INSERT CONTENU_INGREDIENT
//
SQL.query(insert_contenu, [value_contenu], (err, data) => {
    if (err) return res.status(500).json("err");
        });
    });
 });
})
//
// RETURN ALL GOOD
//
return res.status(201).json("Ingredient ajouté !");
})
}
//
//
// ADD USTENSIL
//
//
exports.add_ustensil = (req, res, next) => {
    //    
    // VARIABLE
    //
    const select = `SELECT * FROM ${Links_Server[20].table} WHERE ${Links_Server[20].name} = ? AND ${Links_Server[20].marque} = ?`;
    const insert = `INSERT INTO ${Links_Server[20].table} (
                                ${Links_Server[20].user_id}, 
                                ${Links_Server[20].name}, 
                                ${Links_Server[20].description},  
                                ${Links_Server[20].marque}) 
                     VALUE (?)`;
    let search;
    let value;
    if(req.body.marque){
        value = [req.auth.userId , 
                 req.body[Links_Server[20].name].trim().toLowerCase(), 
                 req.body[Links_Server[20].description].trim(),  
                 req.body[Links_Server[20].marque].trim()];
        search = [req.body[Links_Server[20].name].trim().toLowerCase(),
                  req.body[Links_Server[20].marque].trim().toLowerCase()]
    } else{
        value = [req.auth.userId , 
                 req.body[Links_Server[20].name].trim().toLowerCase(), 
                 req.body[Links_Server[20].description].trim(),
                 "natif"]
        search = [req.body[Links_Server[20].name].trim().toLowerCase(), "natif"]
    }
    //
    // VERIFIE USTENSIL EXISTANT
    //
    SQL.query(select, search, (err, data)=>{
        if (err) return res.status(500).json(err);
        if (data.length) {
          if (data[0][Links_Server[20].name] === req.body[Links_Server[20].name].trim()) {
            return res.status(409).json({error_duplicate: "L'ustensil existe déjà!"});
          }
        }
    //
    // REQUETTE INSERT USTENSIL
    //  
    SQL.query(insert, [value], (err, data)=>{
        if (err) return res.status(500).json("err");     
    //    
    // VARIABLE
    //
    const name_file = req.body.name.toLowerCase().normalize('NFD').replace(/[^a-z\s]/gi, '').split(' ').join('_');
    let id_ustensil = data.insertId
     const linkImg = `${req.protocol}://${req.get("host")}/assets/ustensil/${name_file}/${req.files.ustensil[0].filename}`;
    const insert_img = `INSERT INTO ${Links_Server[3].table} 
    (${Links_Server[3].adress}, 
     ${Links_Server[3].element_id_table}, 
     ${Links_Server[3].element_type_table}) 
     VALUE (?)`
    const value_img = [linkImg, id_ustensil, Links_Server[20].table]
    //
    // REQUETTE SI IMAGE
    //
    if (req.files && req.files.ustensil && req.files.ustensil.length > 0) {
        SQL.query(insert_img, [value_img], (err, data)=>{
            if (err) return res.status(500).json("err");
        })  
    }
    //
    // RETURN ALL GOOD
    //
    return res.status(201).json("Ustensil ajouté !");
    })
    })
}
//
//
// ADD RECETTE
//
//
exports.add_recipe = (req, res, next) => {
    //    
    // VARIABLE
    //
    const select = `SELECT * FROM ${Links_Server[12].table} WHERE ${Links_Server[12].name} = ? AND ${Links_Server[12].user_id} = ?`;
    //
    const value_select = [req.body[Links_Server[12].name].trim().toLowerCase(), req.auth.userId]
    //
    const insert = `INSERT INTO ${Links_Server[12].table} 
    (${Links_Server[12].user_id}, 
     ${Links_Server[12].name}, 
     ${Links_Server[12].description}, 
     ${Links_Server[12].duree_recette}, 
     ${Links_Server[12].etat_validation}) 
        VALUE (?)`;
    //    
    const value_insert = [req.auth.userId , 
            req.body[Links_Server[12].name].trim().toLowerCase(), 
            req.body[Links_Server[12].description].trim(), 
            req.body[Links_Server[12].duree_recette].trim(),
            "traitement"]
    //
    // VERIFIE RECETTE EXISTANT
    //
    SQL.query(select, value_select, (err, data)=>{
        if (err) return res.status(510).json(err);
        if (data.length > 5) {
            return res.status(409).json({error_duplicate: "Vous avez déjà créer trop de version de cette recette !"});
        }
        
    //
    // REQUETTE INSERT RECETTE
    //  
    SQL.query(insert, [value_insert], (err, data)=>{
        if (err) return res.status(520).json("err");   
    //    
    // VARIABLE ID RECETTE & CALORIE
    //
    let id_recipe = data.insertId
    let calorie_recipe;
    //
    //
    // VARIABLE IMG
    //
    //
    const insert_img = `INSERT INTO ${Links_Server[3].table} 
    (${Links_Server[3].adress}, 
     ${Links_Server[3].element_id_table}, 
     ${Links_Server[3].element_type_table},
     ${Links_Server[3].specifique}) 
     VALUE (?)`
    //
    const name_file = req.body.name.toLowerCase().normalize('NFD').replace(/[^a-z\s]/gi, '').split(' ').join('_');
    //     
    const link_Img_presentation = `${req.protocol}://${req.get("host")}/assets/recette/${name_file}/${req.files.recette_presentation[0].filename}`;
    //
    const value_img_presentation = [link_Img_presentation, id_recipe, Links_Server[12].table, "presentation"]
    //
    // REQUETTE IMG PRESENTATION
    //
    SQL.query(insert_img, [value_img_presentation], (err, data)=>{
        if (err) return res.status(530).json({error_img: "L'image n'a put être enregistré."});
    })  
    //
    // SI PRESENT IMG RECETTE_MEDIA
    //
    if (req.files && req.files.recette_media && req.files.recette_media.length > 0) {
    //
    // VARIABLE
    //
    const photoUrls = req.files.recette_media.map(file => `${req.protocol}://${req.get("host")}/assets/recette/${name_file}/${file.filename}`);
    //
    // BOUCLE REQUETTE IMG
    //    
    photoUrls.forEach((file) => {
    //
    // VARIABLE IMG
    //    
        const value_img_media = [file, id_recipe, Links_Server[13].table, "media"]
    //
    // REQUETTE INSERT IMG
    //    
        SQL.query(insert_img, [value_img_media], (err, data)=>{
            if (err) return res.status(540).json({error_img: "L'image n'a put être enregistré."});
        })  
    })
    }
    //
    //
    // VARIABLE ETAPE PREPARATION
    //
    //
    let setValuesStore =[];
    //
    // BOUCLE ETAPE PREPARATION
    //
    for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key) && key.startsWith('etape_preparation')) {
          setValuesStore.push({
            value: req.body[key],
            number: key.split("_")[2],
          })
        }
      }
    //
    // BOUCLE REQUETE INSERT ETAPE PREPARATION
    //
    setValuesStore.forEach(({value, number}) => {
    //
    // VARIABLE
    //    
    const insert_contenu_prepa = `INSERT INTO ${Links_Server[15].table} 
    (${Links_Server[15].recette_id}, 
     ${Links_Server[15].type}, 
     ${Links_Server[15].contenu}, 
     ${Links_Server[15].num_etape}) 
     VALUE (?)`
    const value_contenu_prepa = [id_recipe, "recette", value, number] 
    //
    // REQUETTE ETAPE PREPARATION
    //
    SQL.query(insert_contenu_prepa, [value_contenu_prepa], (err, data) => {
        if (err) return res.status(550).json({error_prepa: "Les étapes de préparations n'ont put être enregistrer."});
    })      
  })
    //
    //
    // VARIABLE REPAS / INGREDIENT / USTENSIL
    //
    //
    let setValues =[];
    //
    // BOUCLE REPAS / INGREDIENT / USTENSIL
    //
    if (Array.isArray(req.body.repas)) {
        const Repas = req.body.repas.map(JSON.parse);
        Repas.forEach(({ name }) => {
            setValues.push({
                table: Links_Server[21].table,
                recette_id: id_recipe,
                type_recette_edit_delet: "recette",
                name,
                type: "repas",
                quantite: "1"
            });
        });
    } else if (req.body.type) {
        const { name } = JSON.parse(req.body.type);
        setValues.push({
            table: Links_Server[21].table,
            recette_id: id_recipe,
            type_recette_edit_delet: "recette",
            name,
            type: "repas",
            quantite: "1"
        });
    }
    //
    if (Array.isArray(req.body.ingredient)) {
        const Ingredient = req.body.ingredient.map(JSON.parse);
        Ingredient.forEach(({ name, quantite }) => {
            setValues.push({
                table: Links_Server[18].table,
                recette_id: id_recipe,
                type_recette_edit_delet: "recette",
                name,
                type: "ingredient",
                quantite
            });
        });
    } else if (req.body.ingredient) {
        const { name, quantite } = JSON.parse(req.body.ingredient);
        setValues.push({
            table: Links_Server[18].table,
            recette_id: id_recipe,
            type_recette_edit_delet: "recette",
            name,
            type: "ingredient",
            quantite
        });
    }
    // 
    if (Array.isArray(req.body.ustensil)) {
        const Ustensil = req.body.ustensil.map(JSON.parse);
        Ustensil.forEach(({ name, quantite }) => {
            setValues.push({
                table: Links_Server[20].table,
                recette_id: id_recipe,
                type_recette_edit_delet: "recette",
                name,
                type: "ustensil",
                quantite
            });
        });
    } else if (req.body.ustensil) {
        const { name, quantite } = JSON.parse(req.body.ustensil);
        setValues.push({
            table: Links_Server[20].table,
            recette_id: id_recipe,
            type_recette_edit_delet: "recette",
            name,
            type: "ustensil",
            quantite
        });
    }
    //
    // BOUCLE REQUETE ID ET INSERT REPAS / INGREDIENT / USTENSIL
    //
    const promises = setValues.forEach(({ table, recette_id, type_recette_edit_delet, name, type, quantite }) => {
        return new Promise((resolve, reject) => {
    //
    // VARIABLE
    //         
    let select_id = `SELECT id FROM ${table} WHERE name = ?`
    const quantite_parse = parseFloat(quantite);
    //
    // REQUETTE RECHERCHE ID
    //
            SQL.query(select_id, [name], (err, data) => {
            if (err) return res.status(560).json("err");
    //
    // VARIABLE
    //    
    const insert_contenu_recipe = `INSERT INTO ${Links_Server[14].table} 
    (${Links_Server[14].recette_id}, 
     ${Links_Server[14].type}, 
     ${Links_Server[14].element_id_table}, 
     ${Links_Server[14].element_type_table}, 
     ${Links_Server[14].quantite}) 
     VALUE (?)`
    const value_contenu_recipe = 
    [recette_id, 
     type_recette_edit_delet, 
     data[0].id, 
     type, 
     quantite_parse]
    //
    // REQUETTE INSERT CONTENU_RECETTE
    //
    SQL.query(insert_contenu_recipe, [value_contenu_recipe], (err, data) => {
        if (err) return res.status(570).json({error_contenu: "Les elements de la recette n'ont pas été enregistrés"});
            });
    //
    //
    // CONDITION POUR RECUPE MACRO INGREDIENT
    //
    //
    if(type_recette_edit_delet = "ingredient"){
    //
    // VARIABLE
    //    
       const select_ingredient = `SELECT 
       ${Links_Server[19].quantite}, 
       FROM ${Links_Server[19].table} 
       WHERE 
       ${Links_Server[19].ingredient_id} = ? AND 
       ${Links_Server[19].type} = 18_macro_micro AND 
       ${Links_Server[19].other_table_id} IN (1, 2, 3)`
    //
    // REQUETTE
    //   
    SQL.query(select_ingredient, data[0].id, (err, data) => {
        if (err) return res.status(570).json({error_contenu: "Les elements de l'ingredient n'ont pas été trouvés"});
    //    
        calorie_recipe += (data[0].quantite * quantite_parse * 4 + 
                           data[1].quantite * quantite_parse * 4 +
                           data[2].quantite * quantite_parse * 9)

            });
     } 
     resolve();                       
        });
     });
    });
    })
//
//
// PROMISE
//
//    
Promise.all(promises)
.then(() =>{ 
//
//
// VARIANT TOTAL CALORIE
//
//
const insert_calorie = `INSERT INTO ${Links_Server[12].table} ${Links_Server[12].calorie} VALUE ?`;
//
// REQUETTE INSERT CALORIE
//    
SQL.query(insert_calorie, calroie_recipe, (err, data)=>{
    if (err) return res.status(510).json(err);
//
//
// RETURN GOOD
//
//   
    res.status(201).json("Recette ajouté !");
})
}) 
.catch((error) => res.status(500).json({ error_promise: "Une erreur s'est produite lors de la construction de la réponse." }));
    })
    }
//
//
// GET CARD RECIPE
//
//
exports.all_recipe = (req, res, next) => {
//
//
// TRAITEMENT DYNAMIQUE DES FILTRES DU FRONT
//
//
let whereConditions = [];
let values_recipe = [];
let orderBy = "";
for (const [key, value] of Object.entries(req.body.formData)) {
    switch (key) {
        case "nutri_score":
            if(Array.isArray(value) && value.length > 0 && typeof value[0] === 'object'){
                const nutriValues = value.map((data) => data.name);
                const nutriScore = value.map((data) => {
                    return `r.${Links_Server[12].nutri_score} = ?`
                    });
    
                whereConditions.push(`(${nutriScore.join(' OR ')})`);
                values_recipe.push(...nutriValues);
                }
            break; 
//
        case "duree_recette":
          // Verifie que value contient bien des données si existant  
            if(Array.isArray(value) && value.length > 0 && typeof value[0] === 'object'){
          // Créer un tableau de valeur
            const chefValues = value.map((data) => data.name);
          // Créer une sous-requête pour chaque value  
            const data = value.map((data) => {
              return`r.${Links_Server[12].duree_recette} = ?`;
    })
        // Ajouter la sous-requête principale avec une condition OR
            whereConditions.push(`(${data.join(' OR ')})`);
        // Ajouter les valeurs correspondantes dans le tableau values_recipe
            values_recipe.push(...chefValues);
}
            break;  
//
        case "calorie":
        if(Array.isArray(value) && value.length > 0 && typeof value[0] === 'object'){
            const calorieValues = [];
            value.forEach(range => {
                const cleanedRangeName = range.name.replace(/\s*cal\s*/g, '');
                const [minCalories, maxCalories] = cleanedRangeName.split('-');
                calorieValues.push(parseFloat(minCalories), parseFloat(maxCalories));
            });

        const calorie = value.map((data)=> {
            return `r.${Links_Server[12].calorie} BETWEEN ? AND ?`
        })

        whereConditions.push(`(${calorie.join(' OR ')})`);
        values_recipe.push(...calorieValues);
    }
        break;
//
        case "research":
            if(value.length > 0){
            const research =  `r.${Links_Server[12].name} LIKE ? OR 
                r.${Links_Server[12].description} LIKE ? OR
                r.${Links_Server[12].user_id} IN (
                   SELECT user.${Links_Server[0].id} 
                   FROM ${Links_Server[0].table} user 
                   WHERE user.${Links_Server[0].pseudo} LIKE ?) OR
               r.${Links_Server[12].id} IN (
                   SELECT cr.${Links_Server[14].recette_id} 
                   FROM ${Links_Server[14].table} cr 
                   WHERE cr.${Links_Server[14].element_id_table} IN (
                       SELECT u.${Links_Server[20].id} 
                       FROM ${Links_Server[20].table} u 
                       WHERE u.${Links_Server[20].name} LIKE ?) 
                   AND cr.${Links_Server[14].element_type_table} = "ustensil") OR
               r.${Links_Server[12].id} IN (
                   SELECT cr.${Links_Server[14].recette_id} 
                   FROM ${Links_Server[14].table} cr 
                   WHERE cr.${Links_Server[14].element_id_table} IN (
                       SELECT i.${Links_Server[18].id} 
                       FROM ${Links_Server[18].table} i 
                       WHERE i.${Links_Server[18].name} LIKE ?) 
                   AND cr.${Links_Server[14].element_type_table} = "ingredient") OR
               r.${Links_Server[12].id} IN (
                   SELECT cr.${Links_Server[14].recette_id} 
                   FROM ${Links_Server[14].table} cr 
                   WHERE cr.${Links_Server[14].element_id_table} IN (
                       SELECT rep.${Links_Server[21].id} 
                       FROM ${Links_Server[21].table} rep 
                       WHERE rep.${Links_Server[21].name} LIKE ?) 
                   AND cr.${Links_Server[14].element_type_table} = "repas"
                   )`

            whereConditions.push(`(${research})`);

            for (let i = 0; i < 6; i++) { values_recipe.push(`%${value}%`); }
        }
            break;
//
        case "chef":
            if(Array.isArray(value) && value.length > 0 && typeof value[0] === 'object'){
            const chefValues = value.map((data) => data.name);
            const chef = value.map((chef) => {
                return `r.${Links_Server[12].user_id} IN (
                    SELECT user.${Links_Server[0].id} 
                    FROM ${Links_Server[0].table} user 
                    WHERE user.${Links_Server[0].pseudo} = ?)`
                });

            whereConditions.push(`(${chef.join(' OR ')})`);
            values_recipe.push(...chefValues);
            }
            break;  
//                     
        case "repas":
            if(Array.isArray(value) && value.length > 0 && typeof value[0] === 'object'){
            const repasValues = value.map((data) => data.name);
            const repas = value.map((repas) => {
                return `r.${Links_Server[12].id} IN (
                    SELECT cr.${Links_Server[14].recette_id}
                    FROM ${Links_Server[14].table} cr
                    WHERE cr.${Links_Server[14].element_id_table} IN (
                        SELECT rep.${Links_Server[21].id}
                        FROM ${Links_Server[21].table} rep
                        WHERE rep.${Links_Server[21].name} = ?
                    )
                    AND cr.${Links_Server[14].element_type_table} = "repas"
                )`;  
            });
            whereConditions.push(`(${repas.join(' OR ')})`);
            values_recipe.push(...repasValues);
        }
            break; 
//                       
        case "ingredient":

            const ingredients = value.map((ingredient) => {
                return `r.${Links_Server[12].id} IN (
                    SELECT ci.${Links_Server[14].recette_id}
                    FROM ${Links_Server[14].table} cr
                    WHERE cr.${Links_Server[14].element_id_table} IN (
                        SELECT i.${Links_Server[18].id}
                        FROM ${Links_Server[18].table} i
                        WHERE i.${Links_Server[18].name} = ?
                    )
                    AND cr.${Links_Server[14].element_type_table} = "ingredient"
                )`;
            });           

            whereConditions.push(`(${ingredients.join(' OR ')})`);  

            values_recipe.push(...value);
            break;
//            
        case "ustensil":
            // Créer une sous-requête pour chaque ustensil
            const unstensils = value.map((ustensil) => {
                return `r.${Links_Server[12].id} IN (
                    SELECT ci.${Links_Server[14].recette_id}
                    FROM ${Links_Server[14].table} cr
                    WHERE cr.${Links_Server[14].element_id_table} IN (
                        SELECT i.${Links_Server[20].id}
                        FROM ${Links_Server[20].table} i
                        WHERE i.${Links_Server[20].name} = ?
                    )
                    AND cr.${Links_Server[14].element_type_table} = "ustensil"
                )`;
            });
            // Ajouter la sous-requête principale avec une condition OR
            whereConditions.push(`(${unstensils.join(' OR ')})`);
            // Ajouter les valeurs correspondantes dans le tableau values_recipe
            values_recipe.push(...value);
            break;
//
        case "trier":
            
           const DescAsc =  req.body.formData.ordre === "true" ? "ASC" : "DESC";
           orderBy = `ORDER BY r.${Links_Server[12][value]} ${DescAsc}`
            break;
//            
        default:
            break;
    }
}
// Construction de where
const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
// AJOUTE DANS VALUES LIMIT & OFFSET
values_recipe.push(parseInt(req.body.formData.page[0].quantite_max, 10), parseInt(req.body.formData.page[0].quantite_min, 10));
//
//
// VARIABLE
//
//
const count = `SELECT COUNT(*) AS Number_Recipe FROM ${Links_Server[12].table} r
LEFT JOIN ${Links_Server[3].table} m ON r.${Links_Server[12].id} = m.${Links_Server[3].element_id_table} AND m.${Links_Server[3].element_type_table} = '${Links_Server[12].table}' AND m.${Links_Server[3].specifique} = 'presentation'
LEFT JOIN ${Links_Server[0].table} user ON r.${Links_Server[12].user_id} = user.${Links_Server[0].id}
${whereClause}`
//
const select_recipe = `SELECT
    r.${Links_Server[12].id},
    r.${Links_Server[12].user_id},
    r.${Links_Server[12].name},
    r.${Links_Server[12].description},
    r.${Links_Server[12].duree_recette},
    r.${Links_Server[12].nutri_score},
    r.${Links_Server[12].like_total},
    r.${Links_Server[12].follower_total},
    m.${Links_Server[3].adress} AS img_presentation,
    user.${Links_Server[0].pseudo},
    user.${Links_Server[0].photo_profil}

FROM ${Links_Server[12].table} r

LEFT JOIN ${Links_Server[3].table} m ON r.${Links_Server[12].id} = m.${Links_Server[3].element_id_table} AND m.${Links_Server[3].element_type_table} = '${Links_Server[12].table}' AND m.${Links_Server[3].specifique} = 'presentation'

LEFT JOIN ${Links_Server[0].table} user ON r.${Links_Server[12].user_id} = user.${Links_Server[0].id}

${whereClause}

${orderBy}

LIMIT ? OFFSET ?`;
//
const select_element_recipe = `SELECT 
i.${Links_Server[18].name} AS name_ingredient,
cr.${Links_Server[14].quantite} AS quantite_contenu_recette,
i.${Links_Server[18].calorie},
mm.${Links_Server[17].name} AS name_macro_micro,
ci.${Links_Server[19].quantite} AS quantite_macro,
mm.${Links_Server[17].type},
tp.${Links_Server[22].name} AS name_type,
u.${Links_Server[20].name} AS name_ustensil,
rep.${Links_Server[21].name} AS name_repas

FROM ${Links_Server[14].table} cr

LEFT JOIN ${Links_Server[18].table} i ON i.${Links_Server[18].id} = cr.${Links_Server[14].element_id_table} AND cr.${Links_Server[14].element_type_table} = 'ingredient'

LEFT JOIN ${Links_Server[19].table} ci ON ci.${Links_Server[19].ingredient_id} = i.${Links_Server[18].id}

LEFT JOIN ${Links_Server[17].table} mm ON mm.${Links_Server[18].id} = ci.${Links_Server[19].other_table_id} AND ci.${Links_Server[19].type} = '${Links_Server[17].table}'

LEFT JOIN ${Links_Server[22].table} tp ON tp.${Links_Server[22].id} = ci.${Links_Server[19].other_table_id} AND ci.${Links_Server[19].type} = '${Links_Server[22].table}'

LEFT JOIN ${Links_Server[20].table} u ON u.${Links_Server[20].id} = cr.${Links_Server[14].element_id_table} AND cr.${Links_Server[14].element_type_table} = 'ustensil'

LEFT JOIN ${Links_Server[21].table} rep ON rep.${Links_Server[21].id} = cr.${Links_Server[14].element_id_table} AND cr.${Links_Server[14].element_type_table} = 'repas'

WHERE cr.${Links_Server[14].recette_id} = ? AND cr.${Links_Server[14].type} = 'recette'`;
//
const return_recipe = [];
//
// REQUETTE CALCULE TOTAL RECETTE
//
SQL.query(count, values_recipe,(err, data)=>{
    if (err) return res.status(510).json(err);
    return_recipe.push({ total_recipe: data[0].Number_Recipe });
})
//
// REQUETE RECHERCHE RECETTE
//
SQL.query(select_recipe, values_recipe,(err, data)=>{ 
        if (err) return res.status(520).json(err);     
//
// BOUCLE
//
         const promises = data.map((recipe) => {
            return new Promise((resolve, reject) => {
//            
// VARIABLE
//
            const recipeDetails = {};
            //
            // Boucle pour ajouter tous les informations de recette
            //
            for (const [key, value] of Object.entries(recipe)) {
                recipeDetails[key] = value;
            }
            //
            recipeDetails.calorie = 0;
            recipeDetails.proteine = 0;
            recipeDetails.glucide = 0;
            recipeDetails.lipide = 0;
            recipeDetails.ingredient = [];
            recipeDetails.ustensil = [];
            recipeDetails.repas = [];
            // 
            // Pour chaque recette, obtenir les détails des éléments
            //
            SQL.query(select_element_recipe, [recipe.id], (err, elementData) => {
                if (err) return res.status(530).json(err);
    
                elementData.forEach((element) => {

                    const elementDetails_ingredient = {
                        name: element.name_ingredient,
                        quantite: element.quantite_contenu_recette,
                        calorie: element.calorie
                    };
        
                    if (element.name_ingredient) {
                        //
                        // Vérifier si l'élément existe déjà dans les ingrédients
                        //
                        const existingIngredient = recipeDetails.ingredient.find((ing) => ing.name === elementDetails_ingredient.name);
        
                        if (existingIngredient) {
                            if (element.name_macro_micro) {
                                const cleanedKey = element.name_macro_micro.normalize('NFD').replace(/[^a-z\s]/gi, '').split(' ').join('_');
                                //
                                // Ajouter les détails de name_macro_micro et quantite_macro
                                //
                                existingIngredient[cleanedKey] = element.quantite_macro;
                            } else if (element.name_type) {
                                //
                                // Vérifier et ajouter dans le tableau type si name_macro_micro est null
                                //
                                if (!existingIngredient.type) {
                                    existingIngredient.type = [];
                                }
                                existingIngredient.type.push(element.name_type);
                            }
                        } else {                 
                              //               
                              // Créer un nouvel objet pour l'ingrédient et ajouter au tableau
                              //
                            const newIngredient = { ...elementDetails_ingredient };
                            
                            if (element.name_macro_micro) {
                                const cleanedKey = element.name_macro_micro.normalize('NFD').replace(/[^a-z\s]/gi, '').split(' ').join('_');
                                  newIngredient[cleanedKey] = element.quantite_macro;
                            } else if (element.name_type) {
                                newIngredient.type = [element.name_type];
                            }
                            recipeDetails.ingredient.push(newIngredient);
                        }
                    } else if (element.name_ustensil) {
                        const elementDetails_ustensil = {
                            name: element.name_ustensil,
                            quantite: element.quantite_contenu_recette,
                        };
                        recipeDetails.ustensil.push(elementDetails_ustensil);
                    } else if (element.name_repas) {
                        recipeDetails.repas.push(element.name_repas);
                    }                  
                }); 
//
// CALCULE                          
// 
recipeDetails.ingredient.forEach((ingredient) => {

    const proteineCalculee = ingredient.quantite * (ingredient.proteine / 100);
    const glucideCalculee = ingredient.quantite * (ingredient.glucide / 100);
    const lipideCalculee = ingredient.quantite * (ingredient.lipide / 100);

    // Additionner les résultats aux totaux
    recipeDetails.proteine += proteineCalculee;
    recipeDetails.glucide += glucideCalculee;
    recipeDetails.lipide += lipideCalculee;
});
// Arrondir les resultat après la boucle forEach
recipeDetails.proteine = parseFloat(recipeDetails.proteine.toFixed(2));
recipeDetails.glucide = parseFloat(recipeDetails.glucide.toFixed(2));
recipeDetails.lipide = parseFloat(recipeDetails.lipide.toFixed(2));
//
// CALCULE CALORIE TOTAL
const calorie = Math.round((recipeDetails.proteine + recipeDetails.glucide) * 4 + (recipeDetails.lipide * 9))
if(recipeDetails.calorie != calorie){ 
    recipeDetails.calorie = calorie
//
const update_calorie = `UPDATE ${Links_Server[12].table} SET ${Links_Server[12].calorie} = ${calorie} WHERE id = ${recipe.id}`
//
    SQL.query(update_calorie, (err, data)=>{
        if (err) return res.status(510).json(err); 
    })
}
//
// RETURN
//
                return_recipe.push(recipeDetails);
                resolve();
            });
        });      
    });
//
// PROMISE
//    
    Promise.all(promises)
    .then(() => res.status(201).json(return_recipe))
    .catch((error) => res.status(500).json({ error_promise: "Une erreur s'est produite lors de la construction de la réponse." }));
})
    }
//
//
// POST LIKE & FOLLOW RECIPE
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