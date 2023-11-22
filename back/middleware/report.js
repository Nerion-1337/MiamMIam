const jwt = require("jsonwebtoken");
const joi = require("joi")
// DATA
const { Links_Server } = require("../links")
//
//
// JOI
//
//
const validationSchemas = {

  [Links_Server[4].sujet]: joi.string()
      .min(4)
      .max(40)
      .pattern( /^[a-zA-Z0-9 ]*$/)
      .required(),
  
  [Links_Server[4].contenu]: joi.string()
      .min(20)
      .max(1000)
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

   const { error: contenuError, value: contenu } = validationSchemas[Links_Server[4].contenu].validate(req.body[Links_Server[4].contenu]);
   if (contenuError) {
     return res.status(400).json({ error_contenu: 'Sujet non valide !' });
   }

   return next();
  } catch(error) {
      res.status(401).json({ error });
  }
};