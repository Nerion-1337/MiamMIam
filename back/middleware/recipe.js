const jwt = require("jsonwebtoken");
const joi = require("joi")
// DATA
const { Links_Server, Regex } = require("../links")
//
//
// JOI
//
//
const validationSchemas = {

  Element_recipe: joi.string()
   .min(4)
   .max(20),

   add_element_recipe: joi.object().pattern(
    joi.string(),
    joi.alternatives(joi.string(), joi.array().items(joi.string()))
  ),

  titre: joi.string()
  .min(3)
  .max(40)
  .pattern(Regex[6].value)
  .pattern(Regex[10].value),
  
  contenu: joi.string()
  .min(20)
  .max(2000)
  .pattern(Regex[10].value),

  description: joi.string()
  .min(20)
  .max(255)
  .pattern(Regex[10].value),

  number: joi.string()
  .pattern(Regex[2].value),

  duree: joi.string()
  .pattern(Regex[11].value),

  element_recipe: joi.string()
  .min(2)
  .max(40)
  .pattern(Regex[6].value)
  .pattern(Regex[10].value),

  full_number: joi.string()
  .pattern(Regex[9].value),

  filter_recipe: joi.string()
  .min(1)
  .max(20),

  cooking_process: joi.string()
  .min(1)
  .max(10)
  .pattern(Regex[9].value),

  };
  
  
//
//
// GET ELEMENT RECIPE
//
//  
exports.element_recipe = (req, res, next) => {
    try {
     if(!req.body) return res.status(401).json("Aucune donnée");
  
     const { error: sujetError, value: sujet } = validationSchemas.Element_recipe.validate(req.headers.element_recipe);
     if (sujetError) {
       return res.status(400).json({ error_sujet: 'Sujet non valide !' });
     }
  
  
     return next();
    } catch(error) {
        res.status(401).json({ error });
    }
  };  
//
//
// ADD INGREDIENT
//
//
 exports.add_ingredient = (req, res, next) => {
  try {
   if(!req.body) return res.status(401).json("Aucune donnée");
//
// TRAITEMENT STRUCTURE GLOBAL DATA
   const { error: addIngredientError, value: sujet } = validationSchemas.add_element_recipe.validate(req.body);
   if (addIngredientError) {
     return res.status(400).json({ error_sujet: addIngredientError.details[0].message });
   }
//
// TITLE
const { error: TitleError, value: title } = validationSchemas.titre.validate(req.body.name);
if (TitleError) {
  return res.status(400).json({ error_title: TitleError.details[0].message });
}
//
// MARQUE
const { error: MarqueError, value: marque } = validationSchemas.titre.validate(req.body.marque);
if (req.body.marque && MarqueError) {
  return res.status(400).json({ error_marque: MarqueError.details[0].message });
}   
//
// DESCRIPTION
const { error: ContenuError, value: description } = validationSchemas.contenu.validate(req.body.description.replace(/[\r\n]+/g, " "));
if (ContenuError) {
  return res.status(400).json({ error_description: ContenuError.details[0].message });
}
//
// CALORIE
const { error: CalorieError, value: calorie } = validationSchemas.number.validate(req.body.calorie);
if (CalorieError) {
  return res.status(400).json({ error_calorie: CalorieError.details[0].message });
}
//
// PROTEINE
const { error:ProteineError, value: proteine } = validationSchemas.number.validate(req.body.proteine);
if (ProteineError) {
  return res.status(400).json({ error_proteine:ProteineError.details[0].message });
}
//
// GLUCIDE
const { error: GlucideError, value: glucide } = validationSchemas.number.validate(req.body.glucide);
if (GlucideError) {
  return res.status(400).json({ error_glucide: GlucideError.details[0].message });
}
//
// LIPIDE
const { error: LipideError, value: lipide } = validationSchemas.number.validate(req.body.lipide);
if (LipideError) {
  return res.status(400).json({ error_lipide: LipideError.details[0].message });
}
//
// TRAITEMENT TYPE
if (Array.isArray(req.body.type)) {
  const Type = req.body.type.map(JSON.parse);
  Type.forEach(({ name }) => {
      const { error: nameError } = validationSchemas.element_recipe.validate(name);
      if (nameError) {
          return res.status(400).json({ error_type: nameError.details[0].message});
      }     
  });
} else if (req.body.type) {
  const { name } = JSON.parse(req.body.type);
  const { error: nameError } = validationSchemas.element_recipe.validate(name);

  if (nameError) {
    return res.status(400).json({ error_type: nameError.details[0].message});
  } 
}
//
// TRAITEMENT VITAMINE MINERAUX
   if (Array.isArray(req.body.vitamine_mineraux)) {
    const vitamineMineraux = req.body.vitamine_mineraux.map(JSON.parse);
    vitamineMineraux.forEach(({ name, quantite }) => {
        const { error: nameError } = validationSchemas.element_recipe.validate(name);
        const { error: quantiteError } = validationSchemas.number.validate(quantite);
        if (nameError || quantiteError) {
            return res.status(400).json({ error_vitamine_mineraux: nameError.details[0].message ||  quantiteError.details[0].message});
        }
    });
} else if (req.body.vitamine_mineraux) {
    const { name, quantite } = JSON.parse(req.body.vitamine_mineraux);
    const { error: nameError } = validationSchemas.element_recipe.validate(name);
    const { error: quantiteError } = validationSchemas.number.validate(quantite);
    if (nameError || quantiteError) {
      return res.status(400).json({ error_vitamine_mineraux: nameError.details[0].message ||  quantiteError.details[0].message});
    } 
}
//
// TRAITEMENT MICRONUTRIMENT
if (Array.isArray(req.body.micronutriment)) {
  const microNutriment = req.body.micronutriment.map(JSON.parse);
  microNutriment.forEach(({ name, quantite }) => {
      const { error: nameError } = validationSchemas.element_recipe.validate(name);
      const { error: quantiteError } = validationSchemas.number.validate(quantite);
      if (nameError || quantiteError) {
          return res.status(400).json({ error_micronutriment: nameError.details[0].message ||  quantiteError.details[0].message});
      }
  });
} else if (req.body.micronutriment) {
  const { name, quantite } = JSON.parse(req.body.micronutriment);
  const { error: nameError } = validationSchemas.element_recipe.validate(name);
  const { error: quantiteError } = validationSchemas.number.validate(quantite);

  if (nameError || quantiteError) {
    return res.status(400).json({ error_micronutriment: nameError.details[0].message ||  quantiteError.details[0].message});
  } 
}

   return next();
  } catch(error) {
      res.status(401).json({ error });
  }
};
//
//
// ADD USTENSIL
//
//
exports.add_ustensil = (req, res, next) => {
  try {
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: addUstensilError, value: sujet } = validationSchemas.add_element_recipe.validate(req.body);
   if (addUstensilError) {
     return res.status(400).json({ error_sujet: addUstensilError.details[0].message });
   }
//
// TITLE
   const { error: TitleError, value: title } = validationSchemas.titre.validate(req.body.name);
   if (TitleError) {
     return res.status(400).json({ error_title: TitleError.details[0].message });
   }
//
// MARQUE
   const { error: MarqueError, value: marque } = validationSchemas.titre.validate(req.body.marque);
   if (req.body.marque && MarqueError) {
     return res.status(400).json({ error_marque: MarqueError.details[0].message });
   }   
//
// DESCRIPTION
   const { error: ContenuError, value: description } = validationSchemas.contenu.validate(req.body.description.replace(/[\r\n]+/g, ""));
   if (ContenuError) {
     return res.status(400).json({ error_description: ContenuError.details[0].message });
   }



   return next();
  } catch(error) {
      res.status(401).json({ error });
  }
};
//
//
// ADD RECETTE
//
//
exports.add_recipe = (req, res, next) => {
  try {
   
   if(!req.body) return res.status(401).json("Aucune donnée");
//
// TRAITEMENT STRUCTURE GLOBAL DATA
  const { error: addIngredientError, value: sujet } = validationSchemas.add_element_recipe.validate(req.body);
   if (addIngredientError) {
     return res.status(400).json({ error_sujet: addIngredientError.details[0].message });
   }
    
//
// TRAITEMENT TITLE
const { error: TitleError, value: title } = validationSchemas.titre.validate(req.body.name);
if (TitleError) {
  console.log(TitleError)
  return res.status(400).json({ error_title: TitleError.details[0].message });
}
//
// TRAITEMENT DESCRIPTION
const { error: ContenuError, value: description } = validationSchemas.description.validate(req.body.description.replace(/[\r\n]+/g, ""));
if (ContenuError) {
  console.log(ContenuError)
  return res.status(400).json({ error_description: ContenuError.details[0].message });
}
//
// TRAITEMENT ETAPE PREPARATION
for (const key in req.body) {
  if (Object.prototype.hasOwnProperty.call(req.body, key) && key.startsWith('etape_preparation')) {
    const value = req.body[key];

const { error: PrepaError, value: preparation } = validationSchemas.contenu.validate(value.replace(/[\r\n]+/g, ""));
  if (PrepaError) {
    console.log(PrepaError)
    return res.status(400).json({ error_stage: PrepaError.details[0].message });
    } 
  }
}
//
// TRAITEMENT DUREE RECETTE
const { error: DureeRecetteError, value: duree_recette
} = validationSchemas.duree.validate(req.body.duree_recette
  );
if (DureeRecetteError) {
  console.log(DureeRecetteError)
  return res.status(400).json({ error_time: DureeRecetteError.details[0].message });
}
//
// TRAITEMENT REPAS
if (Array.isArray(req.body.repas)) {
  const Repas = req.body.repas.map(JSON.parse);
  Repas.forEach(({ name }) => {
      const { error: nameError } = validationSchemas.element_recipe.validate(name);

      if (nameError) {
          return res.status(400).json({ error_repas: nameError.details[0].message});
      }
  });
} else if (req.body.repas) {
  const { name } = JSON.parse(req.body.repas);
  const { error: nameError } = validationSchemas.element_recipe.validate(name);

  if (nameError) {
    return res.status(400).json({ error_repas: nameError.details[0].message});
  } 
}
//
// TRAITEMENT INGREDIENT
   if (Array.isArray(req.body.ingredient)) {
    const Ingredient = req.body.ingredient.map(JSON.parse);
    Ingredient.forEach(({ name, quantite }) => {
        const { error: nameError } = validationSchemas.element_recipe.validate(name);
        const { error: quantiteError } = validationSchemas.number.validate(quantite);

        if (nameError || quantiteError) {
            return res.status(400).json({ error_ingredient: nameError.details[0].message ||  quantiteError.details[0].message});
        }
    });
} else if (req.body.ingredient) {
    const { name, quantite } = JSON.parse(req.body.ingredient);
    const { error: nameError } = validationSchemas.element_recipe.validate(name);
    const { error: quantiteError } = validationSchemas.number.validate(quantite);

    if (nameError || quantiteError) {
      return res.status(400).json({ error_ingredient: nameError.details[0].message ||  quantiteError.details[0].message});
    } 
}
//
// TRAITEMENT USTENSIL
if (Array.isArray(req.body.ustensil)) {
  const Ustensil = req.body.ustensil.map(JSON.parse);
  Ustensil.forEach(({ name, quantite }) => {
      const { error: nameError } = validationSchemas.element_recipe.validate(name);
      const { error: quantiteError } = validationSchemas.number.validate(quantite);

      if (nameError || quantiteError) {
          return res.status(400).json({ error_ustensil: nameError.details[0].message ||  quantiteError.details[0].message});
      }
  });
} else if (req.body.ustensil) {
  const { name, quantite } = JSON.parse(req.body.ustensil);
  const { error: nameError } = validationSchemas.element_recipe.validate(name);
  const { error: quantiteError } = validationSchemas.number.validate(quantite);

  if (nameError || quantiteError) {
    return res.status(400).json({ error_ustensil: nameError.details[0].message ||  quantiteError.details[0].message});
  } 
}

   return next();
  } catch(error) {
      res.status(401).json({ error });
  }
};
//
//
// GET RECIPE
//
//  
exports.get_recipe = (req, res, next) => { 
  try {
    if (!req.body) return res.status(401).json("Aucune donnée");
 
    const errors = {};
 
    for (const [key, value] of Object.entries(req.body.formData)) {
      if (Array.isArray(value)) {
        // Si la valeur est un tableau, itérer sur chaque élément du tableau
        for (let i = 0; i < value.length; i++) {
          const subObj = value[i];
          for (const [subKey, subValue] of Object.entries(subObj)) {
            if (subValue !== undefined) {
              const { error, value: validatedValue } = validationSchemas.filter_recipe.validate(subValue);
              if (error) {
                errors[`${key}[${i}].${subKey}_error`] = `La valeur pour ${subKey} de ${key}[${i}] n'est pas valide : ${error.message}`;
              }
            }
          }
        }
      } else if (typeof value === 'object') {
        // Si la valeur est un objet, itérer sur ses propriétés
        for (const [subKey, subValue] of Object.entries(value)) {
          if (subValue !== undefined) {
            const { error, value: validatedValue } = validationSchemas.filter_recipe.validate(subValue);
            if (error) {
              errors[`${key}.${subKey}_error`] = `La valeur pour ${subKey} de ${key} n'est pas valide : ${error.message}`;
            }
          }
        }
      } else {
        // Si la valeur n'est ni un objet ni un tableau, valider directement la valeur
        if (value !== undefined) {
          const { error, value: validatedValue } = validationSchemas.filter_recipe.validate(value);
          if (error) {
            errors[`${key}_error`] = `La valeur pour ${key} n'est pas valide : ${error.message}`;
          }
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
// GET COOKING PROCESS
//
//
exports.get_cooking_process = (req, res, next) => {
  try {
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: identifiantError, value: identifiant } = validationSchemas.cooking_process.validate(req.headers.id);
   if (identifiantError) {
     return res.status(400).json({ error_identifiant: 'Identifiant non valide ! ' });
   }

   return next();
  } catch(error) {
      res.status(401).json({ error });
  }
};  