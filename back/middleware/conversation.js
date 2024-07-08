const joi = require("joi")
// DATA
const { Links_Server, Regex } = require("../links")
//
//
// JOI
//
//
const validationSchemas = {

  pseudo: joi.string()
  .min(4)
  .max(30)
  .pattern(Regex[4].value)
  .pattern(Regex[10].value)
  .required(),

  number: joi.number(),

  [Links_Server[8].option]: joi.string()
  .valid("invitation", "principal", "tout")
  .required(),

  contenu: joi.string()    
  .min(2)
  .max(2000)
  .pattern(Regex[10].value),

  };
//
//
// ADD CONVERSATION
//
//
exports.add_conversation = (req, res, next) => {
  try {
   
   if(!req.body) return res.status(401).json("Aucune donnée");

if (Array.isArray(req.body.formData)) {
  const conv = req.body.formData;
 conv.forEach(({ name, value }) => {
      const { error: nameError } = validationSchemas.pseudo.validate(name);
      const { error: valueError } = validationSchemas.number.validate(value);

      if (nameError || valueError) {
        return res.status(400).json({ error_ingredient: nameError.details[0].message ||  valueError.details[0].message});
      }
  });
}

   return next();
  } catch(error) {
    console.log(error)
      res.status(401).json({ error });
  }
};
//
//
// ADD CONVERSATION
//
//
exports.get_conversation = (req, res, next) => {
  try {
   
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: option_conversationError, value: option_conversation } = validationSchemas[Links_Server[8].option].validate(req.body.option_conversation);
   if (option_conversationError) {
     return res.status(400).json({ error_option_conversation: 'Option non valide ! ' });
   }

   return next();
  } catch(error) {
    console.log(error)
      res.status(401).json({ error });
  }
};
//
//
// OPTION CONVERSATION
//
//
exports.option_conversation = (req, res, next) => {
  try {
   
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: option_conversationError, value: option_conversation } = validationSchemas[Links_Server[8].option].validate(req.body.option_conversation);
   if (option_conversationError) {
     return res.status(400).json({ error_option_conversation: 'Option non valide ! ' });
   }

   const { error: id_conversationError, value: id_conversation } = validationSchemas.number.validate(req.body.conversation_id);
   if (id_conversationError) {
     return res.status(400).json({ error_id_conversation: 'Id non valide ! ' });
   }

   return next();
  } catch(error) {
    console.log(error)
      res.status(401).json({ error });
  }
};
//
//
// BLOQUER CONVERSATION
//
//
exports.hidden_conversation = (req, res, next) => {
  try {
   
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: id_conversationError, value: id_conversation } = validationSchemas.number.validate(req.body.conversation_id);
   if (id_conversationError) {
     return res.status(400).json({ error_id_conversation: 'Id non valide ! ' });
   }

   return next();
  } catch(error) {
    console.log(error)
      res.status(401).json({ error });
  }
};
//
//
// GET MESSAGES
//
//
exports.get_message = (req, res, next) => {
  try {
   
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: id_conversationError, value: id_conversation } = validationSchemas.number.validate(req.body.conversation_id);
   if (id_conversationError) {
     return res.status(400).json({ error_id_conversation: 'Id non valide ! ' });
   }

   return next();
  } catch(error) {
    console.log(error)
      res.status(401).json({ error });
  }
};
//
//
// POST MESSAGES
//
//
exports.post_message = (req, res, next) => {
  try {
   
   if(!req.body) return res.status(401).json("Aucune donnée");

   const { error: id_messageError, value: id_message } = validationSchemas.number.validate(req.body[Links_Server[9].conversation_id]);
   if (id_messageError) {
     return res.status(400).json({ error_id_message: 'Id non valide ! ' });
   }

  const { error: contenu_messageError, value: contenu_message } = validationSchemas.contenu.validate(req.body[Links_Server[9].contenu]);
   if (contenu_messageError) {
     return res.status(400).json({ error_contenu_message: 'Id non valide ! ' });
   } 

   return next();
  } catch(error) {
    console.log(error)
      res.status(401).json({ error });
  }
};