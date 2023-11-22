const multer = require("multer");
const fs = require('fs');
//
//
//
//
//
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
  };
//
//
const maxLimits = {
  user: 1,
  signalement: 10, 
};
//
//
//
//
//
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folderPath = `assets/${file.fieldname}/${req.auth.userId}`;
        fs.access(folderPath, (err) =>{
          if(err){
            fs.mkdirSync(folderPath, { recursive: true });
          }
             callback(null, folderPath);
        })          
    },
    filename: (req, file, callback) => {
      const extension = MIME_TYPES[file.mimetype];  
      const name = file.originalname.split(' ').join('_').split(".");
      if (extension == undefined) {
        callback(new Error('Invalid MIME TYPES'));     
    } else {
        callback(null, name[0] + "." + extension);
    }
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 10000000 // 10Mo
    },
  }).fields([
    { name: "user", maxCount: 1 },
    { name: "signalement", maxCount: 10 } 
  ]);
  
  
  module.exports = (req, res, next) => {
    upload(req, res, (err) =>{
        if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ error_img: `Taille de l'image trop grande` }); 
        } else if (!req.files) {
            return res.status(400).json({ error_img: `Aucune image sélectionnée` });
        } else {
            let hasExceededLimit = false;
            Object.keys(req.files).forEach((fieldName) => {
                if (req.files[fieldName].length > maxLimits[fieldName]) {
                    hasExceededLimit = true;
                    return res.status(400).json({ error_img: `Limite d'images dépassée pour le champ ${fieldName}` });
                }
            });

            if (!hasExceededLimit && err) {
                return res.status(400).json({ error_img: `Une erreur s'est produite` });
            }
        }
        next();
    });
};