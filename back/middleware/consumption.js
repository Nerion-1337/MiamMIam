const joi = require("joi")
// DATA
const { Links_Server, Regex } = require("../links")
//
//
// JOI
//
//
const validationSchemas = {

    get_consumption: joi.string()
        .min(1)
        .max(10)
        .pattern(Regex[0].value)
        .required(),
    
    like_follow_recipe: joi.number()
        .min(1)
        .max(10)
        .required(),

    number: joi.number(),

    };
//
//
// GET CONSOMMATION
//
//
exports.get_consumption = (req, res, next) => {
    try {
     if(!req.body) return res.status(401).json("Aucune donnée");

     const { error: identifiantError, value: identifiant } = validationSchemas.get_consumption.validate(req.headers.consumption_time);
     if (identifiantError) {
       return res.status(400).json({ error_identifiant: 'Identifiant non valide ! ' });
     }
 
     return next();
    } catch(error) {
        res.status(401).json({ error });
    }
 };
//
//
// LIKE & FOLLOW RECIPE
//
//
exports.like_follow_recipe = (req, res, next) => {
    try {
        if(!req.body && !req.files) return res.status(401).json("Aucune donnée");
     
        const errors = {};
     
        for (const [key, value] of Object.entries(req.body.formData)) {

          if (value !== undefined) {
            const { error, value: validatedValue } = validationSchemas.like_follow_recipe.validate(value);
            if (error) {
              errors[`${key}_error`] = `La valeur pour ${key} n'est pas valide : ${error.message}`;
            }
          }
        }
     
        if (Object.keys(errors).length !== 0) {
          return res.status(400).json(errors);
        }
     
        return next();
       } catch(error) {
           res.status(401).json({ error });
       }
     };
//
//
// ADD CONSOMMATION
//
//
exports.add_consumption = (req, res, next) => {
  try {
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: recipeIdError, value: recipeId } = validationSchemas.number.validate(req.body[Links_Server[16].recette_id]);
   if (recipeIdError) {
     return res.status(400).json({ error_recipeId: 'RecipeId non valide ! ' });
   }

   const { error: pourcentageError, value: pourcentage } = validationSchemas.number.validate(req.body[Links_Server[16].pourcentage]);
   if (pourcentageError) {
     return res.status(400).json({ error_pourcentage: 'Pourcentage non valide ! ' });
   } 

   return next();
  } catch(error) {
      res.status(401).json({ error });
  }
};     