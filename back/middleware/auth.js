const jwt = require("jsonwebtoken");
const joi = require("joi")

const validationSchemas = {
    // Schéma pour valider l'identifiant
    Identifier: joi.string()
      .min(4)
      .max(30)
      .pattern(/^(?:(?!(\w)\1{2,}).)*$/)
      .required(),
  
    // Schéma pour valider le mot de passe
    Password: joi.string()
      .min(10)
      .max(40)
      .pattern(/^(?=(?:\D*\d){2})(?=[^A-Z]*[A-Z])/)
      .required(),
  
    // Schéma pour valider l'email
    Email: joi.string()
      .email()
      .required(),

   // Schéma pour valider token
    Token: joi.string()
      .pattern(/^[a-zA-Z0-9]*$/)
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

        const { error: identifiantError, value: identifiant } = validationSchemas.Identifier.validate(req.body.identifiant);
        if (identifiantError) {
          return res.status(400).json({ error_identifiant: 'Identifiant non valide ! ' });
        }
    
        const { error: passwordError, value: password } = validationSchemas.Password.validate(req.body.password);
        if (passwordError) {
          return res.status(400).json({ error_password: 'Mot de passe non valide ! ' });
        }
    
        const { error: emailError, value: email } = validationSchemas.Email.validate(req.body.email);
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

   const { error: identifiantError, value: identifiant } = validationSchemas.Identifier.validate(req.body.email);

   const { error: emailError, value: email } = validationSchemas.Email.validate(req.body.email);

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

   const { error: identifiantError, value: identifiant } = validationSchemas.Identifier.validate(req.body.identifiant);

   const { error: emailError, value: email } = validationSchemas.Email.validate(req.body.identifiant);

   if (identifiantError && emailError) {
     return res.status(400).json({
      error_identifiant: 'Entrez votre pseudo ou email.'
     });
   }

   const { error: passwordError, value: password } = validationSchemas.Password.validate(req.body.password);
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

   const { error: passwordError, value: password } = validationSchemas.Password.validate(req.body.password);
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