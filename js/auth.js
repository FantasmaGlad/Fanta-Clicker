// Gestion de l'authentification utilisateur avec Google

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_AUTH_DOMAIN",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_STORAGE_BUCKET",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID",
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Fonction de connexion via Google
function connexionGoogle() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const utilisateur = result.user;
      console.log("Utilisateur connecté :", utilisateur);
      return utilisateur;
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion Google :", error);
      throw error;
    });
}

// Fonction pour déconnecter l'utilisateur
function deconnexionUtilisateur() {
  return auth
    .signOut()
    .then(() => {
      console.log("Utilisateur déconnecté.");
    })
    .catch((error) => {
      console.error("Erreur lors de la déconnexion :", error);
    });
}

// Export des fonctions pour utilisation
export {
  connexionGoogle,
  deconnexionUtilisateur,
};