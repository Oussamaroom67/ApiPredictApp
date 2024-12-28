const passport = require("passport");
const { signup, login, googleAuthCallback } = require('../controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

// Route pour la connexion
router.post('/login', loginValidation, login);

// Route pour l'inscription
router.post('/signup', signupValidation, signup);

// Route pour démarrer l'authentification Google
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
  
// Route de callback après l'authentification Google
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleAuthCallback // Appel du contrôleur pour gérer la logique
);

// Route pour la déconnexion
router.get("/logout", (req, res) => {
  req.logout((err) => {
      if (err) {
          return res.status(500).send("Erreur de déconnexion");
      }
      res.redirect("/login"); // Redirection après la déconnexion
  });
});

module.exports = router;
