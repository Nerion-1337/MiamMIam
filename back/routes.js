const router = require("express").Router();
const passport = require("passport");
const authController = require("./controllers/auth");
const userController = require("./controllers/user");
const mediaController = require("./controllers/media");
const likeController = require("./controllers/like");
const jwt = require("./middleware/token");
const joi = require("./middleware/auth");
const multer = require("./middleware/multer");

//
// GOOGLE
router.get('/login', passport.authenticate('google'));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/login', failureMessage: true }),
  function(req, res) {
    res.cookie('token_miam_miam', req.user, { httpOnly: false});
    res.redirect(process.env.URL_CLIENT);
  });
//
// AUTH
router.post('/auth/register', joi.register, authController.register);
router.post('/auth/confirm_email', joi.token, authController.confirm_email);
router.post('/auth/renvoie_email', joi.email, authController.renvoie_email);
router.post('/auth/login', joi.login, authController.login);
router.post('/auth/reset_password_email', joi.email, authController.envoie_email_reset_password);
router.put('/auth/reset_password', joi.reset_password, authController.reset_password);
//
// USER
router.get('/user/data_user', jwt, userController.data_user)
router.put('/edit/update_avatar', jwt, multer, userController.update_avatar);
//
// IMAGE
router.post('/add_photo', jwt, multer, mediaController.add_photo);
router.get('/photo/:id', mediaController.photo_id)
//
// LIKE
router.post('/like', jwt, likeController.like, likeController.compte_like);
//
//
module.exports = router;