const router = require("express").Router();
const passport = require("passport");
const authController = require("./controllers/auth");
const userController = require("./controllers/user");
const mediaController = require("./controllers/media");
const likeController = require("./controllers/like");
const reportController = require("./controllers/report");
const recipeController = require("./controllers/recipe");
const jwt = require("./middleware/token");
const joi_user = require("./middleware/auth");
const joi_report = require("./middleware/report");
const joi_recipe = require("./middleware/recipe");
const multer = require("./middleware/multer");

//
// TOKEN
router.get('/token', jwt.token_valid)
//
// GOOGLE
router.get('/google', passport.authenticate('google'));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/google', failureMessage: true }),
  function(req, res) {
    res.cookie('token_miam_miam', req.user, { httpOnly: false});
    res.redirect(process.env.URL_CLIENT);
  });
//
// AUTH
router.post('/auth/register', joi_user.register, authController.register);
router.post('/auth/confirm_email', joi_user.token, authController.confirm_email);
router.post('/auth/renvoie_email', joi_user.email, authController.renvoie_email);
router.post('/auth/login', joi_user.login, authController.login);
router.post('/auth/reset_password_email', joi_user.email, authController.envoie_email_reset_password);
router.put('/auth/reset_password', joi_user.reset_password, authController.reset_password);
//
// USER
router.get('/user/data_user', jwt.token_all, userController.data_user)
router.put('/user/update_user', jwt.token_all, multer, joi_user.update_user_setting, userController.update_user_setting);
//
// SIGNALEMENT
router.post('/signalement/sitting', jwt.token_all, multer, joi_report.reporting, reportController.report_setting);
//
// RECIPE
router.get('/recipe/element_recipe', jwt.token_all, joi_recipe.element_recipe, recipeController.element_recipe);
router.post('/recipe/add_ingredient', jwt.token_all, multer, joi_recipe.add_ingredient, recipeController.add_ingredient);
router.post('/recipe/add_ustensil', jwt.token_all, multer, joi_recipe.add_ustensil, recipeController.add_ustensil);
router.post('/recipe/add_recipe', jwt.token_all, multer, joi_recipe.add_recipe, recipeController.add_recipe);
//
// IMAGE
router.post('/add_photo', jwt.token_all, multer, mediaController.add_photo);
router.get('/photo/:id', mediaController.photo_id)
//
// LIKE
router.post('/like', jwt.token_all, likeController.like, likeController.compte_like);
//
//
module.exports = router;