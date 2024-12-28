const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback',
    scope: ['profile', 'email'],  // Ajoutez les scopes ici
},
(accessToken, refreshToken, profile, done) => {
    // On retourne directement le profil utilisateur de Google
    return done(null, profile);
}));

// Sérialisation de l'utilisateur dans la session
passport.serializeUser((user, done) => {
    // Ici, nous stockons tout l'objet `user` (c'est-à-dire `profile`) dans la session
    done(null, user);
});

// Désérialisation de l'utilisateur
passport.deserializeUser((user, done) => {
    // Comme on a stocké tout l'objet `user`, on le retourne directement ici
    done(null, user);
});