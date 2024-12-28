const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
// Initialisation de l'application
const app = express();
// Import des routes
const AuthRouter = require("./Routes/AuthRouter"); // Auth routes
const predictrouter = require("./Routes/predictRoute"); // Predict routes

// Charger les variables d'environnement
require("dotenv").config();

// Connexion à la base de données MongoDB
mongoose.connect("mongodb+srv://siafomaima5:yz41njOlsSkSasxH@prediction.hynfw.mongodb.net/?retryWrites=true&w=majority&appName=Prediction")
    .then(() => {
        console.log("connect to Database");
        app.use("/api/predict",predictrouter);
        app.use("/api/history",predictrouter);
        app.use("/auth", AuthRouter); // Routes liées à l'authentification

    })
    .catch((err) => {
        console.log(err);
   });


// Middleware pour traiter les données JSON et gérer les CORS
app.use(bodyParser.json());
app.use(cors());

// Configuration de Express-session (nécessaire pour Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialisation de Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Charger la configuration Passport
require("./config/passport");

// Middleware pour vérifier le bon fonctionnement
app.get("/ping", (req, res) => {
  res.send("PONG");
});

// Définir les routes


process.on('uncaughtException', (err) => {
    console.error('error', err);
    process.exit(1);  // Exit with an error code
});
const port = process.env.port||8080;
app.listen(port,()=>{
    console.log(`Listening in port ${port}`);
})
