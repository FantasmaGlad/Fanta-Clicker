// Import des fonctions Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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

// Récupération du pseudo
const pseudo = localStorage.getItem("playerPseudo");
if (!pseudo) {
    window.location.href = "welcome.html";  // Redirection si pas de pseudo
}

document.getElementById("welcomeMessage").innerText = `Bienvenue, ${pseudo} !`;

// Chargement du son
const clickSound = new Audio('sons/clic-souris.mp3');

// Initialisation du score
let score = 0;
let farmsOwned = 0;
let factoriesOwned = 0;
let machinesOwned = 0;

// Chargement du score sauvegardé lors du chargement de la page
window.onload = function () {
    const savedScore = localStorage.getItem(`score_${pseudo}`);
    if (savedScore) {
        score = parseInt(savedScore);
        document.getElementById("score").innerText = `Score : ${score}`;
    }
    farmsOwned = parseInt(localStorage.getItem("farmsOwned")) || 0;
    factoriesOwned = parseInt(localStorage.getItem("factoriesOwned")) || 0;
    machinesOwned = parseInt(localStorage.getItem("machinesOwned")) || 0;
};

// Fonction de clic sur le bouton
document.getElementById("clickButton").addEventListener("click", () => {
    score++;
    document.getElementById("score").innerText = `Score : ${score}`;
    clickSound.play();  // Jouer le son

    // Sauvegarde locale du score
    localStorage.setItem(`score_${pseudo}`, score);

    // Mise à jour du score dans Firebase
    const playerRef = ref(database, `players/${pseudo}`);
    update(playerRef, {
        score: score,
        lastClick: new Date().toISOString()
    });
});

// Génération automatique des points
setInterval(() => {
    if (farmsOwned > 0) score += farmsOwned;  // Ferme génère 1 point/seconde
    if (factoriesOwned > 0) score += factoriesOwned * 2;  // Usine génère 2 points/seconde
    if (machinesOwned > 0) score += machinesOwned * 5;  // Super machine génère 5 points/seconde

    document.getElementById("score").innerText = `Score : ${score}`;
    localStorage.setItem(`score_${pseudo}`, score);

    const playerRef = ref(database, `players/${pseudo}`);
    update(playerRef, {
        score: score
    });
}, 1000);

// Fonction pour acheter des améliorations
const purchaseUpgrade = (type, cost) => {
    if (score >= cost) {
        score -= cost;
        if (type === "farm") farmsOwned++;
        if (type === "factory") factoriesOwned++;
        if (type === "machine") machinesOwned++;

        localStorage.setItem(`score_${pseudo}`, score);
        localStorage.setItem("farmsOwned", farmsOwned);
        localStorage.setItem("factoriesOwned", factoriesOwned);
        localStorage.setItem("machinesOwned", machinesOwned);

        alert(`Amélioration achetée : ${type.toUpperCase()} !`);
    } else {
        alert("Score insuffisant pour cette amélioration.");
    }
};

// Associer les boutons aux achats
document.getElementById("buyFarm").addEventListener("click", () => purchaseUpgrade("farm", 50));
document.getElementById("buyFactory").addEventListener("click", () => purchaseUpgrade("factory", 200));
document.getElementById("buyMachine").addEventListener("click", () => purchaseUpgrade("machine", 500));