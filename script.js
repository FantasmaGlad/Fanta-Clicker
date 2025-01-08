// Import des fonctions Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAt4S0P5Jr1roapnPmDVw_MPqQfWtkb_dIk",
    authDomain: "baamix-clicker.firebaseapp.com",
    projectId: "baamix-clicker",
    storageBucket: "baamix-clicker.appspot.com",
    messagingSenderId: "559143757551",
    appId: "1:559143757551:web:c018039d3b34465132edd1a",
    measurementId: "G-X7J216NSD9",
    databaseURL: "https://baamix-clicker-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Récupération du pseudonyme
const pseudo = localStorage.getItem("playerPseudo");
if (!pseudo) {
    window.location.href = "welcome.html"; // Redirection si pas de pseudo
}

// Affichage du message de bienvenue
document.getElementById("welcomeMessage").innerText = `Bienvenue, ${pseudo} !`;

// Chargement du son
const clickSound = new Audio('sons/clic-souris.mp3');

// Initialisation du score
let score = 0;

// Charger le score sauvegardé lors du chargement de la page
window.onload = function () {
    const savedScore = localStorage.getItem(`score_${pseudo}`);
    if (savedScore) {
        score = parseInt(savedScore);
        document.getElementById("score").innerText = `Score : ${score}`;
    }
};

// Fonction de clic sur le bouton
document.getElementById("clickButton").addEventListener("click", () => {
    score++;
    document.getElementById("score").innerText = `Score : ${score}`;
    clickSound.play();  // Jouer le son

    // Sauvegarde locale du score
    localStorage.setItem(`score_${pseudo}`, score);

    // Mise à jour du score dans la base de données Firebase
    const playerRef = ref(database, `players/${pseudo}`);
    update(playerRef, {
        pseudo: pseudo,
        score: score,
        lastClick: new Date().toISOString()
    });
});