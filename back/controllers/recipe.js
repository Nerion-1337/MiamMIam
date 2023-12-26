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
    const value_select = [req.body[Links_Server[12].name].trim().toLowerCase(), req.auth.userId]
    const insert = `INSERT INTO ${Links_Server[12].table} 
    (${Links_Server[12].user_id}, 
     ${Links_Server[12].name}, 
     ${Links_Server[12].description}, 
     ${Links_Server[12].duree_recette}, 
     ${Links_Server[12].etat_validation}) 
        VALUE (?)`;
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
    // VARIABLE ID RECETTE
    //
    let id_recipe = data.insertId
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
    // VARIABLE ETAPE PREPARATION
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
    // VARIABLE REPAS / INGREDIENT / USTENSIL
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
        setValues.forEach(({ table, recette_id, type_recette_edit_delet, name, type, quantite }) => {
    //
    // VARIABLE
    //         
    let select_id = `SELECT id FROM ${table} WHERE name = ?`;
    //
    // REQUETTE RECHERCHE ID
    //
            SQL.query(select_id, [name], (err, data) => {
            if (err) return res.status(560).json("err");
    //
    // VARIABLE
    //    
    const insert_contenu_recipe = `INSERT INTO ${Links_Server[14].table} (${Links_Server[14].recette_id}, ${Links_Server[14].type}, ${Links_Server[14].element_id_table}, ${Links_Server[14].element_type_table}, ${Links_Server[14].quantite}) VALUE (?)`
    const value_contenu_recipe = [recette_id, type_recette_edit_delet, data[0].id, type, parseFloat(quantite)]
    //
    // REQUETTE INSERT CONTENU_RECETTE
    //
    SQL.query(insert_contenu_recipe, [value_contenu_recipe], (err, data) => {
        if (err) return res.status(570).json({error_contenu: "Les elements de la recette n'ont pas été enregistrés"});
            });
        });
     });
    })
    //
    // RETURN ALL GOOD
    //
    return res.status(201).json("Recette ajouté !");
    })
    }