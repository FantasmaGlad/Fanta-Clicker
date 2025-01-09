// database.js - Fichier pour gérer les interactions avec Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAt4S8P5J1roapnPmDVw_MPqgfwIKb_dIk",
    authDomain: "baamix-clicker.firebaseapp.com",
    databaseURL: "https://baamix-clicker-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "baamix-clicker",
    storageBucket: "baamix-clicker.appspot.com",
    messagingSenderId: "559143757551",
    appId: "1:559143757551:web:c018039d3b34465132edd1a",
    measurementId: "G-X7J216NSD9"
};

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Enregistre un nouveau joueur dans la base de données avec son pseudo.
 * @param {string} pseudo - Le pseudonyme du joueur.
 */
export function registerPlayer(pseudo) {
    const playerRef = ref(database, `players/${pseudo}`);
    set(playerRef, {
        pseudo: pseudo,
        score: 0,
        upgrades: {
            "Ferme à Baamix": 0,
            "Usine à Baamix": 0,
            "Super Machine": 0
        },
        dateJoined: new Date().toISOString()
    });
}

/**
 * Met à jour le score d'un joueur dans la base de données.
 * @param {string} pseudo - Le pseudonyme du joueur.
 * @param {number} score - Le score actuel du joueur.
 */
export function updatePlayerScore(pseudo, score) {
    const playerRef = ref(database, `players/${pseudo}`);
    update(playerRef, { score: score });
}

/**
 * Met à jour les statistiques d'achat d'améliorations.
 * @param {string} pseudo - Le pseudonyme du joueur.
 * @param {string} upgradeName - Le nom de l'amélioration achetée.
 * @param {number} quantity - La quantité d'améliorations achetées.
 */
export function updatePlayerUpgrades(pseudo, upgradeName, quantity) {
    const upgradesRef = ref(database, `players/${pseudo}/upgrades/${upgradeName}`);
    onValue(upgradesRef, (snapshot) => {
        const currentCount = snapshot.val() || 0;
        update(upgradesRef, { ".value": currentCount + quantity });
    });
}

/**
 * Récupère les données du joueur et exécute une fonction de rappel.
 * @param {string} pseudo - Le pseudonyme du joueur.
 * @param {function} callback - Fonction de rappel pour utiliser les données.
 */
export function getPlayerData(pseudo, callback) {
    const playerRef = ref(database, `players/${pseudo}`);
    onValue(playerRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val());
        } else {
            console.warn(`Aucun joueur trouvé avec le pseudo : ${pseudo}`);
        }
    });
}