// ------------------------------
// PROTOCOLE BAAMIX database.js Version 1.0
// ------------------------------

// Importer Firebase et le module de base de données
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, set, get, update, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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
const db = getDatabase(app);

/**
 * Sauvegarder les données du joueur dans Firebase.
 * @param {string} userId - L'ID unique du joueur.
 * @param {object} data - Les données à sauvegarder.
 */
export function savePlayerData(userId, data) {
    const playerRef = ref(db, 'players/' + userId);
    set(playerRef, data)
        .then(() => console.log("Données sauvegardées avec succès dans Firebase."))
        .catch((error) => console.error("Erreur lors de la sauvegarde des données :", error));
}

/**
 * Récupérer les données du joueur depuis Firebase.
 * @param {string} userId - L'ID unique du joueur.
 * @param {function} callback - Fonction callback pour gérer les données récupérées.
 */
export function getPlayerData(userId, callback) {
    const playerRef = ref(db, 'players/' + userId);
    get(playerRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val());
            } else {
                console.warn("Aucune donnée trouvée pour l'utilisateur :", userId);
                callback(null);
            }
        })
        .catch((error) => console.error("Erreur lors de la récupération des données :", error));
}

/**
 * Mettre à jour partiellement les données du joueur.
 * @param {string} userId - L'ID unique du joueur.
 * @param {object} updates - Les données à mettre à jour.
 */
export function updatePlayerData(userId, updates) {
    const playerRef = ref(db, 'players/' + userId);
    update(playerRef, updates)
        .then(() => console.log("Données mises à jour avec succès."))
        .catch((error) => console.error("Erreur lors de la mise à jour des données :", error));
}

/**
 * Écouter les changements en temps réel pour un joueur.
 * @param {string} userId - L'ID unique du joueur.
 * @param {function} callback - Fonction callback appelée à chaque mise à jour.
 */
export function listenToPlayerData(userId, callback) {
    const playerRef = ref(db, 'players/' + userId);
    onValue(playerRef, (snapshot) => {
        callback(snapshot.val());
    }, (error) => console.error("Erreur lors de l'écoute des données :", error));
}