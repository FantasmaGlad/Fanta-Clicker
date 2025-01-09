// Import des fonctions Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, update, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAt4S...",
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
    window.location.href = "welcome.html"; // Redirection si pas de pseudo
}

document.getElementById("welcomeMessage").innerText = `Bienvenue, ${pseudo} !`;

// Chargement du son
const clickSound = new Audio('sons/clic-souris.mp3');

// Initialisation des variables
let score = 0;
let fermeBaamix = 0;
let usineBaamix = 0;
let superMachine = 0;
let fermePrix = 50;
let usinePrix = 200;
let superMachinePrix = 500;

// Charger le score et les améliorations lors du chargement de la page
window.onload = async function () {
    const savedScore = localStorage.getItem(`score_${pseudo}`);
    if (savedScore) {
        score = parseInt(savedScore);
        document.getElementById("score").innerText = `Score : ${score}`;
    }

    // Récupération des améliorations depuis Firebase
    const snapshot = await get(ref(database, `players/${pseudo}`));
    if (snapshot.exists()) {
        const data = snapshot.val();
        fermeBaamix = data.fermeBaamix || 0;
        usineBaamix = data.usineBaamix || 0;
        superMachine = data.superMachine || 0;
        updateUpgradeUI();
    }

    // Production automatique de points
    setInterval(() => {
        const pointsAuto = fermeBaamix * 1 + usineBaamix * 5 + superMachine * 10;
        score += pointsAuto;
        document.getElementById("score").innerText = `Score : ${score}`;
        localStorage.setItem(`score_${pseudo}`, score);

        // Mettre à jour Firebase
        const playerRef = ref(database, `players/${pseudo}`);
        update(playerRef, { score: score });
    }, 1000); // Chaque seconde
};

// Gestion du clic sur le bouton principal
document.getElementById("clickButton").addEventListener("click", () => {
    score++;
    document.getElementById("score").innerText = `Score : ${score}`;
    clickSound.play();
    localStorage.setItem(`score_${pseudo}`, score);

    // Mettre à jour Firebase
    const playerRef = ref(database, `players/${pseudo}`);
    update(playerRef, { score: score });
});

// Gestion des achats d'améliorations
document.getElementById("buyFermeBaamix").addEventListener("click", () => {
    if (score >= fermePrix) {
        score -= fermePrix;
        fermeBaamix++;
        fermePrix = Math.floor(fermePrix * 1.01); // Incrémentation de 1%
        updateUpgradeUI();
        alert("Ferme achetée ! Production améliorée.");
    } else {
        alert("Vous n'avez pas assez de points pour acheter cette amélioration.");
    }
    saveProgress();
});

document.getElementById("buyUsineBaamix").addEventListener("click", () => {
    if (score >= usinePrix) {
        score -= usinePrix;
        usineBaamix++;
        usinePrix = Math.floor(usinePrix * 1.01); // Incrémentation de 1%
        updateUpgradeUI();
        alert("Usine achetée ! Production doublée.");
    } else {
        alert("Vous n'avez pas assez de points pour acheter cette amélioration.");
    }
    saveProgress();
});

document.getElementById("buySuperMachine").addEventListener("click", () => {
    if (score >= superMachinePrix) {
        score -= superMachinePrix;
        superMachine++;
        superMachinePrix = Math.floor(superMachinePrix * 1.01); // Incrémentation de 1%
        updateUpgradeUI();
        alert("Super Machine achetée ! Production maximale.");
    } else {
        alert("Vous n'avez pas assez de points pour acheter cette amélioration.");
    }
    saveProgress();
});

// Mise à jour de l'interface des améliorations
function updateUpgradeUI() {
    document.getElementById("fermeBaamixCount").innerText = `x ${fermeBaamix}`;
    document.getElementById("usineBaamixCount").innerText = `x ${usineBaamix}`;
    document.getElementById("superMachineCount").innerText = `x ${superMachine}`;
    document.getElementById("buyFermeBaamix").innerText = `Acheter pour ${fermePrix} points`;
    document.getElementById("buyUsineBaamix").innerText = `Acheter pour ${usinePrix} points`;
    document.getElementById("buySuperMachine").innerText = `Acheter pour ${superMachinePrix} points`;
}

// Sauvegarder la progression dans Firebase
function saveProgress() {
    const playerRef = ref(database, `players/${pseudo}`);
    update(playerRef, {
        score: score,
        fermeBaamix: fermeBaamix,
        usineBaamix: usineBaamix,
        superMachine: superMachine
    });
}