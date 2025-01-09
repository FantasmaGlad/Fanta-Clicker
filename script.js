// Import des fonctions Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAt4S0P...",
    authDomain: "baamix-clicker.firebaseapp.com",
    databaseURL: "https://baamix-clicker-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "baamix-clicker",
    storageBucket: "baamix-clicker.appspot.com",
    messagingSenderId: "559143757551",
    appId: "1:559143757551:web:c018039d3b34465132edd1a",
    measurementId: "G-X7J216NSD9"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Récupération du pseudonyme depuis le localStorage
const pseudo = localStorage.getItem("pseudo");
if (!pseudo) {
    window.location.href = "welcome.html"; // Redirection vers la page d'accueil si pas de pseudo
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

// Fonction pour réinitialiser le score
document.getElementById("resetButton")?.addEventListener("click", () => {
    score = 0;
    document.getElementById("score").innerText = `Score : ${score}`;
    localStorage.setItem(`score_${pseudo}`, score);

    // Réinitialisation du score dans Firebase
    const playerRef = ref(database, `players/${pseudo}`);
    update(playerRef, {
        score: score,
        lastReset: new Date().toISOString()
    });
    alert("Score réinitialisé !");
});