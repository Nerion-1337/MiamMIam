const router = require("express").Router();
const passport = require("passport");
const authController = require("./controllers/auth");
const userController = require("./controllers/user");
const mediaController = require("./controllers/media");
const like_followController = require("./controllers/like_follow");
const reportController = require("./controllers/report");
const recipeController = require("./controllers/recipe");
const consumptionController = require("./controllers/consumption");
const commentController = require("./controllers/comment");
const tchatController = require("./controllers/tchat");
const jwt = require("./middleware/token");
const joi_user = require("./middleware/auth");
const joi_report = require("./middleware/report");
const joi_recipe = require("./middleware/recipe");
const joi_like_follow = require("./middleware/like_follow");
const joi_consumption = require("./middleware/consumption");
const joi_comment = require("./middleware/comment");
const joi_conversation = require("./middleware/conversation");
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
router.get('/user/my_data', jwt.token_all, userController.data_user)
router.get('/user/all_user', jwt.token_all, userController.all_user);
router.get('/user/data_user', userController.data_user);
router.get('/user/verify_like_follow', jwt.token_all, like_followController.verify_like_follow_user);
router.post('/user/follow_user', jwt.token_all, joi_like_follow.follow_user, like_followController.follow_user);
router.put('/user/my_update', jwt.token_all, multer, joi_user.update_user_setting, userController.update_user_setting);
//
// SIGNALEMENT
router.post('/signalement/sitting', jwt.token_all, multer, joi_report.reporting, reportController.report_setting);
//
// RECIPE
router.get('/recipe/verify_like_follow', jwt.token_all, like_followController.verify_like_follow_recipe);
router.get('/recipe/cooking_process', joi_recipe.get_cooking_process, recipeController.cooking_process);
router.get('/recipe/element_recipe', joi_recipe.element_recipe, recipeController.element_recipe);
router.post('/recipe/all_recipe', recipeController.all_recipe); 
router.post('/recipe/all_recipe/user', jwt.token_all, joi_recipe.get_recipe, recipeController.all_recipe); 
router.post('/recipe/like_follow', jwt.token_all, joi_like_follow.like_follow_recipe, like_followController.like_follow_recipe)
router.post('/recipe/add_ingredient', jwt.token_all, multer, joi_recipe.add_ingredient, recipeController.add_ingredient);
router.post('/recipe/add_ustensil', jwt.token_all, multer, joi_recipe.add_ustensil, recipeController.add_ustensil);
router.post('/recipe/add_recipe', jwt.token_all, multer, joi_recipe.add_recipe, recipeController.add_recipe);
//
// CONSUMPTION
router.get('/consumption/user', jwt.token_all, joi_consumption.get_consumption, consumptionController.get_consumption);
router.post('/consumption/add', jwt.token_all, joi_consumption.add_consumption, consumptionController.add_consumption);
router.post('/consumption/edit', jwt.token_all, consumptionController.edit_consumption);
//
// COMMENT
router.get('/comment/recipe', joi_comment.get_comment, commentController.get_comment);
router.get('/comment/verify_like', jwt.token_all, like_followController.verify_like_comment);
router.post('/comment/add', jwt.token_all, multer, joi_comment.add_comment, commentController.post_comment);
router.post('/comment/like', jwt.token_all, joi_like_follow.like_follow_recipe, like_followController.like_comment)
//
// TCHAT
router.post('/tchat/get_conversation', jwt.token_all, joi_conversation.get_conversation, tchatController.all_conversation);
router.post('/tchat/new_conversation', jwt.token_all, joi_conversation.add_conversation, tchatController.add_conversation);
router.post('/tchat/update_option_conversation', jwt.token_all, joi_conversation.option_conversation, tchatController.update_option_conversation);
router.post('/tchat/hidden_conversation', jwt.token_all, joi_conversation.hidden_conversation, tchatController.hidden_conversation);
router.post('/tchat/all_message', jwt.token_all, joi_conversation.get_message, tchatController.all_message);
router.post('/tchat/add_message', jwt.token_all, multer, joi_conversation.post_message, tchatController.post_message);
//
// IMAGE
router.get('/photo/:id', mediaController.photo_id)
router.post('/add_photo', jwt.token_all, multer, mediaController.add_photo);
//
//
module.exports = router;