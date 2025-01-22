// ------------------------------
// PROTOCOLE BAAMIX auth.js Version 1.0
// ------------------------------

// Importer Firebase et le module d'authentification
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Charger les variables d'environnement
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

/**
 * Connecte l'utilisateur via Google OAuth.
 */
export function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("Connexion réussie :", user);

            // Sauvegarder les données de base dans Firebase
            saveUserData(user.uid, {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL
            });
        })
        .catch((error) => {
            console.error("Erreur lors de la connexion :", error);
        });
}

/**
 * Déconnecte l'utilisateur.
 */
export function signOutUser() {
    signOut(auth)
        .then(() => console.log("Déconnexion réussie"))
        .catch((error) => console.error("Erreur lors de la déconnexion :", error));
}

/**
 * Sauvegarde les données de l'utilisateur dans Firebase.
 * @param {string} userId - L'ID utilisateur unique.
 * @param {object} data - Les données à sauvegarder.
 */
function saveUserData(userId, data) {
    const userRef = ref(db, 'users/' + userId);
    set(userRef, data)
        .then(() => console.log("Données utilisateur sauvegardées."))
        .catch((error) => console.error("Erreur lors de la sauvegarde :", error));
}