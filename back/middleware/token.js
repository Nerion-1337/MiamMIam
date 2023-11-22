const jwt = require("jsonwebtoken");

exports.token_all = (req, res, next) => {
       try {
        if(!req.headers.authorization) return res.status(401).json({ error_token: "Aucun Token"});
           const token = req.headers.authorization;

           const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
           const userId = decodedToken.id;
           req.auth = {
               userId: userId
           };     
        return next();
       } catch(error) {
           res.status(401).json({ error_token: error });
       }
    };

    exports.token_valid = (req, res, next) => {
        try {
         if(!req.headers.authorization) return res.status(401).json({ error_token: "Aucun Token"});
            const token = req.headers.authorization;
 
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            const userId = decodedToken.id;
            req.auth = {
                userId: userId
            };
   
         return res.status(200).json({token: "valide"})
        } catch(error) {
            res.status(401).json({ error_token: error });
        }
     };