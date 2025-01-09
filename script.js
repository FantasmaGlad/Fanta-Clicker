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
    window.location.href = "welcome.html";  // Redirection si le pseudo n'existe pas
}

// Affichage du message de bienvenue
document.getElementById("welcomeMessage").innerText = `Bienvenue, ${pseudo} !`;

// Chargement du son de clic
const clickSound = new Audio('sons/clic-souris.mp3');

// Initialisation du score
let score = 0;

// Charger le score sauvegardé lors du chargement
window.onload = function () {
    const savedScore = localStorage.getItem(`score_${pseudo}`);
    if (savedScore) {
        score = parseInt(savedScore);
        document.getElementById("score").innerText = `Score : ${score}`;
    }
};

// Gestion du clic sur le bouton
document.getElementById("clickButton").addEventListener("click", () => {
    score++;
    document.getElementById("score").innerText = `Score : ${score}`;
    clickSound.play();  // Jouer le son

    // Sauvegarder le score localement
    localStorage.setItem(`score_${pseudo}`, score);

    // Mettre à jour le score dans la base de données Firebase
    const playerRef = ref(database, `joueurs/${pseudo}`);
    update(playerRef, {
        pseudo: pseudo,
        score: score,
        lastClick: new Date().toISOString()
    });
});

// Fonction de reset du score
function resetScore() {
    score = 0;
    document.getElementById("score").innerText = `Score : ${score}`;
    localStorage.setItem(`score_${pseudo}`, score);
    const playerRef = ref(database, `joueurs/${pseudo}`);
    update(playerRef, { score: 0 });
}

// Fonction pour sauvegarder le pseudonyme
function savePseudoToDatabase(pseudo) {
    const playerRef = ref(database, `joueurs/${pseudo}`);
    set(playerRef, {
        pseudo: pseudo,
        score: 0,
        dateInscription: new Date().toISOString()
    });
}
