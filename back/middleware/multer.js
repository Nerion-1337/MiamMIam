const multer = require("multer");
const fs = require('fs');
//
//
// VARIABLE
//
//
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
  };
//
const maxLimits = {
  user: 1,
  signalement: 10,
  ingredient: 1,
  recette_presentation: 1,
  recette_media: 10,
  ustensil: 5, 
};
//
// DEFINIE OU SERA STOCKER LE FICHIER
//
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    let folderPath;
    const name_file = req.body.name.toLowerCase().normalize('NFD').replace(/[^a-z\s]/gi, '').split(' ').join('_');
      if(file.fieldname === "ingredient" || file.fieldname === "ustensil"){
        folderPath = `assets/${file.fieldname}/${name_file}`;
      } else if(file.fieldname === "recette_presentation" || file.fieldname === "recette_media") {  
        folderPath = `assets/recette/${name_file}`;
      } else {
        folderPath = `assets/${file.fieldname}/${req.auth.userId}`;
      }
        fs.access(folderPath, (err) =>{
          if(err){
            fs.mkdirSync(folderPath, { recursive: true });
          }
             callback(null, folderPath);
        })          
    },
 //
 // RENOME LE FICHIER
 //   
    filename: (req, file, callback) => {
      const extension = MIME_TYPES[file.mimetype];
      const trie =  file.originalname.split(".")
      const name = trie[0].toLowerCase().normalize('NFD').replace(/[^a-z\s]/gi, '').split(' ').join('_');
      if (extension == undefined) {
        callback(new Error('Invalid MIME TYPES'));     
    } else {
        callback(null, name + "." + extension);
    }
    }
  });
  //
  // DETERMINE TAILLE ET NOMBRE DE FICHIER
  //
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 10000000 // 10Mo
    },
  }).fields([
    { name: "user", maxCount: 1 },
    { name: "signalement", maxCount: 10 },
    { name: "ingredient", maxCount: 1 },
    { name: "recette_presentation", maxCount: 10 },
    { name: "recette_media", maxCount: 1 },
    { name: "ustensil", maxCount: 5 },
  ]);
//
//
// FONCTION
//
//  
  module.exports = (req, res, next) => {
    upload(req, res, (err) =>{
        if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ error_img: `Taille de l'image trop grande, maximum 10Mo` }); 
        } else if (!req.files) {
            return res.status(400).json({ error_img: `Aucune image sélectionnée` });
        } else {
            let hasExceededLimit = false;
            Object.keys(req.files).forEach((fieldName) => {
                if (req.files[fieldName].length > maxLimits[fieldName]) {
                    hasExceededLimit = true;
                    return res.status(400).json({ error_img: `Limite nombre d'images dépassée pour le champ ${fieldName}` });
                }
            });

            if (!hasExceededLimit && err) {
                return res.status(400).json({ error_img: `Une erreur s'est produite` });
            }
        }
        next();
    });
};