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

  [Links_Server[0].pseudo]: joi.string()
      .min(4)
      .max(30)
      .pattern(Regex[4].value)
      .pattern(Regex[10].value)
      .required(),
  
  [Links_Server[0].password]: joi.string()
      .min(10)
      .max(40)
      .pattern(Regex[5].value)
      .required(),
  
  [Links_Server[0].email]: joi.string()
      .email()
      .required(),

  Token: joi.string()
      .pattern(Regex[3].value)
      .pattern(Regex[10].value)
      .required(),  
  
  [Links_Server[0].first_name]: joi.string()
    .min(3)
    .max(30)
    .pattern(Regex[6].value)
    .pattern(Regex[10].value)
    .required(),

  [Links_Server[0].last_name]: joi.string()
    .min(3)
    .max(30)
    .pattern(Regex[6].value)
    .pattern(Regex[10].value)
    .required(),

  [Links_Server[0].sexe]: joi.string()
    .valid("Homme", "Femme")
    .required(),

  [Links_Server[0].age]: joi.string()
    .pattern(Regex[7].value)
    .pattern(Regex[8].value)
    .required(),

  [Links_Server[0].taille]: joi.string()
    .pattern(Regex[9].value)
    .min(2)
    .max(3)
    .required(),

  [Links_Server[0].poids]: joi.string()
    .pattern(Regex[9].value)
    .min(2)
    .max(3)
    .required(),

  [Links_Server[0].masse_grasse]: joi.string()
    .pattern(Regex[9].value)
    .min(1)
    .max(2)
    .required(),
  };   
//
//
// REGISTER USER
//
//
 exports.register = (req, res, next) => {
       try {
        if(!req.body) return res.status(401).json("Aucune donnée");

        const { error: identifiantError, value: identifiant } = validationSchemas.pseudo.validate(req.body.identifiant);
        if (identifiantError) {
          return res.status(400).json({ error_identifiant: 'Identifiant non valide ! ' });
        }
    
        const { error: passwordError, value: password } = validationSchemas.password.validate(req.body.password);
        if (passwordError) {
          return res.status(400).json({ error_password: 'Mot de passe non valide ! ' });
        }
    
        const { error: emailError, value: email } = validationSchemas.email.validate(req.body.email);
        if (emailError) {
          return res.status(400).json({ error_email: 'Email non valide ! ' });
        }

        return next();
       } catch(error) {
           res.status(401).json({ error });
       }
    };
//
//
// TOKEN
//
//
 exports.token = (req, res, next) => {
  try {
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: tokenError, value: token } = validationSchemas.Token.validate(req.body.token);
   if (tokenError) {
     return res.status(400).json({ error_token: 'Token non valide ! ' });
   }

   return next();
  } catch(error) {
      res.status(401).json({ error });
  }
};
//
//
// EMAIL
//
//
 exports.email = (req, res, next) => {
  try {
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: identifiantError, value: identifiant } = validationSchemas.pseudo.validate(req.body.email);

   const { error: emailError, value: email } = validationSchemas.email.validate(req.body.email);

   if (identifiantError && emailError) {
     return res.status(400).json({
      error_email: 'Entrez votre pseudo ou email.'
     });
   }

   return next();
  } catch(error) {
      res.status(401).json({ error });
  }
};
//
//
// LOGIN
//
//
 exports.login = (req, res, next) => {
  try {
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: identifiantError, value: identifiant } = validationSchemas.pseudo.validate(req.body[Links_Server[0].pseudo]);

   const { error: emailError, value: email } = validationSchemas.email.validate(req.body[Links_Server[0].pseudo]);

   if (identifiantError && emailError) {
     return res.status(400).json({
      error_identifiant: 'Entrez votre pseudo ou email.'
     });
   }

   const { error: passwordError, value: password } = validationSchemas.password.validate(req.body[Links_Server[0].password]);
   if (passwordError) {
     return res.status(400).json({ error_password: 'Erreur dans le mot de passe'});
   }

   return next();
  } catch(error) {
      res.status(401).json({ error });
  }
};
//
//
// RESET PASSWORD
//
//
 exports.reset_password = (req, res, next) => {
  try {
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: passwordError, value: password } = validationSchemas.password.validate(req.body.password);
   if (passwordError) {
     return res.status(400).json({ error_password: 'Mot de passe non valide !' });
   }

   const { error: tokenError, value: token } = validationSchemas.Token.validate(req.body.token);
   if (tokenError) {
     return res.status(400).json({ error_token: 'Token non valide ! ' });
   }

   return next();
  } catch(error) {
      res.status(401).json({ error });
  }
};
//
//
// UPDATE USER SETTING
//
//
exports.update_user_setting = (req, res, next) => {
  try {
   if(!req.body && !req.files) return res.status(401).json("Aucune donnée");


   const errors = {};

   for (const [key, value] of Object.entries(req.body)) {
     if (value !== undefined) {
       const { error, value: validatedValue } = validationSchemas[key].validate(value);
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