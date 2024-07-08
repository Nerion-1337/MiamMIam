const joi = require("joi")
// DATA
const { Links_Server, Regex } = require("../links")
//
//
// JOI
//
//
const validationSchemas = {
    
    recipe_id: joi.string()
        .min(1)
        .max(10)
        .pattern(Regex[9].value)
        .required(),
    
    contenu: joi.string()    
        .min(2)
        .max(2000)
        .pattern(Regex[10].value),

    element_type_table: joi.string()
        .min(4)
        .max(20)
        .pattern(Regex[10].value), 

    };

//
//
// GET COMMENT
//
//
exports.get_comment = (req, res, next) => {
    try {
     if(!req.body) return res.status(401).json("Aucune donnée");

     let key;
     switch(true) {
         case 'recipe' in req.headers:
             key = "recipe"
         break;
     //    
         default:
         break;
     }

     const { error: recipe_id, value: id_recipe } = validationSchemas.recipe_id.validate(req.headers[key]);
     if (recipe_id) {
       return res.status(400).json({ error_recipe_id: 'Id non valide ! ' });
     }
 
     return next();
    } catch(error) {
        res.status(401).json({ error });
    }
 };
//
//
// POST COMMENT
//
// 
exports.add_comment = (req, res, next) => {
    try {
     if(!req.body) return res.status(401).json("Aucune donnée");

     const { error: contneu, value: contenu_comment } = validationSchemas.contenu.validate(req.body[Links_Server[10].contenu]);
     if (contneu) {
       return res.status(400).json({ error_comment_contenu: 'Contenu erroné' });
     }

     const { error: element_type_table, value: element_comment } = validationSchemas.element_type_table.validate(req.body[Links_Server[10].element_type_table]);
     if (element_type_table) {
       return res.status(400).json({ error_comment_type: 'Valeur erroné ' });
     }

     const { error: element_id_table, value: id_recipe } = validationSchemas.recipe_id.validate(req.body[Links_Server[10].element_id_table]);
     if (element_id_table) {
       return res.status(400).json({ error_comment_recipe: 'Id non valide !' });
     }
 
     return next();
    } catch(error) {
        res.status(401).json({ error });
    }
 };