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

  [Links_Server[4].sujet]: joi.string()
      .min(4)
      .max(40)
      .pattern(Regex[1].value)
      .pattern(Regex[10].value)
      .required(),
  
  [Links_Server[4].contenu]: joi.string()
      .min(20)
      .max(5000)
      .pattern(Regex[10].value)
      .required(),
  
  };   
//
//
// REPORTING
//
//
 exports.reporting = (req, res, next) => {
  try {
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: sujetError, value: sujet } = validationSchemas[Links_Server[4].sujet].validate(req.body[Links_Server[4].sujet]);
   if (sujetError) {
     return res.status(400).json({ error_sujet: 'Sujet non valide !' });
   }

   const { error: contenuError, value: contenu } = validationSchemas[Links_Server[4].contenu].validate(req.body[Links_Server[4].contenu].replace(/[\r\n]+/g, ""));
   if (contenuError) {
     return res.status(400).json({ error_contenu: 'Contenu non valide !' });
   }

   return next();
  } catch(error) {
      res.status(401).json({ error });
  }
};