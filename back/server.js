// SECURITE
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// FRAMEWORK
const express = require("express");
const http = require("http");
require("dotenv").config({ path: "./.env" });
const app = express();
const cors = require("cors");
const path = require("path");
//GOOGLE
const passport = require("passport");
const session = require('express-session');
require("./controllers/google")
//
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(cors({ origin: process.env.URL_CLIENT }));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5000, // Limitez chaque adresse IP à 5000 requêtes par "fenêtre" (ici, par tranche de 15 minutes)
	standardHeaders: true, // Renvoyer les informations de limite de taux dans les en-têtes
	legacyHeaders: false, // Désactiver les en-têtes `X-RateLimit-*`
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(session({
  secret: process.env.TOKEN_SECRET,
  resave: true,
  saveUninitialized: true
}));
// Initialiser Passport
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use("/api", require("./routes"));
app.use("/assets/user", express.static(path.join(__dirname, "assets", "user")));
app.use("/assets/recette", express.static(path.join(__dirname, "assets", "recette")));
app.use("/assets/commentaire", express.static(path.join(__dirname, "assets", "commentaire")));
app.use("/assets/ingredient", express.static(path.join(__dirname, "assets", "ingredient")));
app.use("/assets/ustensil", express.static(path.join(__dirname, "assets", "ustensil")));
app.use("/assets/message", express.static(path.join(__dirname, "assets", "message")));
app.use("/assets/signalement", express.static(path.join(__dirname, "assets", "signalement")));

//vérifie que le port est correct
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT);
app.set("port", port);

const server = http.createServer(app);

server.listen(port);

//contrôle erreur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//  écouter les événements du serveur
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});