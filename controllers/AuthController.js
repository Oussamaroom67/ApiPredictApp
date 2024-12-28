const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


// Signup (inscription classique)
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}


// Login (connexion classique)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed, email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
};


// Méthode pour gérer la réponse de l'authentification via Google
const googleAuthCallback = async (req, res) => {
    try {
        const { id, displayName, emails } = req.user; // Profil retourné par Google
        const email = emails[0].value; // Récupérer l'email à partir du profil Google
        
        console.log("Google User Profile:", req.user); // Log pour vérifier
        
        // Vérifiez si l'utilisateur existe déjà dans la base de données
        let user = await UserModel.findOne({ googleId: id });

        if (!user) {
            // Si l'utilisateur n'existe pas, le créer
            user = new UserModel({
                googleId: id,
                name: displayName, // Assurez-vous d'utiliser displayName pour le champ 'name'
                email,
            });

            await user.save();  // Sauvegarder l'utilisateur dans la base de données
        }

        // Générer un token JWT
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Rediriger avec le token ou renvoyer une réponse JSON
        res.redirect(`http://localhost:3000/home?token=${jwtToken}`); // Exemple de redirection après succès
    } catch (err) {
        console.error('Google Auth Error:', err);
        res.status(500).json({
            message: "Google authentication failed",
            success: false
        });
    }
};



module.exports = {
    signup,
    login,
    googleAuthCallback // Export de la méthode pour le callback Google
};
