// Import des modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Récupération du pseudo depuis le localStorage
const pseudo = localStorage.getItem("playerPseudo");
if (!pseudo) {
    window.location.href = "welcome.html"; // Redirection si aucun pseudo n'a été défini
}

document.getElementById("welcomeMessage").innerText = `Bienvenue, ${pseudo} !`;

// Variables globales
let score = 0;
let fermeCount = 0;
let usineCount = 0;
let superMachineCount = 0;

// Chargement des données au démarrage
window.onload = function () {
    const savedScore = localStorage.getItem(`score_${pseudo}`);
    if (savedScore) {
        score = parseInt(savedScore);
        document.getElementById("score").innerText = `Score : ${score}`;
    }

    const savedFermes = localStorage.getItem(`ferme_${pseudo}`);
    if (savedFermes) {
        fermeCount = parseInt(savedFermes);
        document.getElementById("ferme-count").innerText = `${fermeCount} achetée(s)`;
    }

    const savedUsines = localStorage.getItem(`usine_${pseudo}`);
    if (savedUsines) {
        usineCount = parseInt(savedUsines);
        document.getElementById("usine-count").innerText = `${usineCount} achetée(s)`;
    }

    const savedSuperMachines = localStorage.getItem(`superMachine_${pseudo}`);
    if (savedSuperMachines) {
        superMachineCount = parseInt(savedSuperMachines);
        document.getElementById("super-machine-count").innerText = `${superMachineCount} achetée(s)`;
    }
};

// Fonction du bouton de clic
document.getElementById("clickButton").addEventListener("click", () => {
    score++;
    document.getElementById("score").innerText = `Score : ${score}`;
    localStorage.setItem(`score_${pseudo}`, score);

    const playerRef = ref(database, `players/${pseudo}`);
    update(playerRef, {
        score: score
    });
});

// Fonction pour gérer les achats d'améliorations
function acheterAmelioration(type) {
    let cost = 0;
    let count = 0;
    let increment = 1;

    switch (type) {
        case 'ferme':
            cost = 50 + Math.floor(fermeCount * 0.01 * 50);
            count = fermeCount;
            increment = 1;
            break;
        case 'usine':
            cost = 200 + Math.floor(usineCount * 0.01 * 200);
            count = usineCount;
            increment = 5;
            break;
        case 'superMachine':
            cost = 500 + Math.floor(superMachineCount * 0.01 * 500);
            count = superMachineCount;
            increment = 10;
            break;
    }

    if (score >= cost) {
        score -= cost;
        document.getElementById("score").innerText = `Score : ${score}`;
        localStorage.setItem(`score_${pseudo}`, score);

        if (type === 'ferme') {
            fermeCount++;
            localStorage.setItem(`ferme_${pseudo}`, fermeCount);
            document.getElementById("ferme-count").innerText = `${fermeCount} achetée(s)`;
        } else if (type === 'usine') {
            usineCount++;
            localStorage.setItem(`usine_${pseudo}`, usineCount);
            document.getElementById("usine-count").innerText = `${usineCount} achetée(s)`;
        } else if (type === 'superMachine') {
            superMachineCount++;
            localStorage.setItem(`superMachine_${pseudo}`, superMachineCount);
            document.getElementById("super-machine-count").innerText = `${superMachineCount} achetée(s)`;
        }

        const playerRef = ref(database, `players/${pseudo}`);
        update(playerRef, {
            score: score,
            fermes: fermeCount,
            usines: usineCount,
            superMachines: superMachineCount
        });
    }
}

// Production automatique de points par seconde
setInterval(() => {
    const totalAutoPoints = (fermeCount * 1) + (usineCount * 5) + (superMachineCount * 10);
    score += totalAutoPoints;
    document.getElementById("score").innerText = `Score : ${score}`;
    localStorage.setItem(`score_${pseudo}`, score);

    const playerRef = ref(database, `players/${pseudo}`);
    update(playerRef, {
        score: score
    });
}, 1000); // Intervalle de 1 seconde