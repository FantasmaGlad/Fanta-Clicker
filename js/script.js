// ------------------------------
// PROTOCOLE BAAMIX script.js Version 1.0
// ------------------------------

import { savePlayerData, getPlayerData, updatePlayerData } from "./database.js";

// État global du jeu
let playerData = {
    score: 0,
    factories: [] // Tableau contenant les usines débloquées
};

// Configurations des usines
const factoryConfig = [
    { id: 1, name: "AtomeBaamix", cost: 100, production: 1, image: "./assets/images/AtomeBaamix.png", shadow: "./assets/images/AtomeBaamixOmbre.png" },
    { id: 2, name: "BaamixTrouNoir", cost: 500, production: 5, image: "./assets/images/BaamixTrouNoir.png", shadow: "./assets/images/BaamixTrouNoirOmbre.png" },
    { id: 3, name: "FermeBaamix", cost: 1000, production: 10, image: "./assets/images/FermeBaamix.png", shadow: "./assets/images/FermeBaamixOmbre.png" },
    { id: 4, name: "FuseeBaamix", cost: 5000, production: 50, image: "./assets/images/FuseeBaamix.png", shadow: "./assets/images/FuseeBaamixOmbre.png" },
    { id: 5, name: "UsineBaamix", cost: 10000, production: 100, image: "./assets/images/UsineBaamix.png", shadow: "./assets/images/UsineBaamixOmbre.png" }
];

// DOM Elements
const scoreDisplay = document.getElementById("score");
const factoryContainer = document.getElementById("factory-container");
const clickButton = document.getElementById("click-button");

/**
 * Met à jour l'affichage du score
 */
function updateScoreDisplay() {
    scoreDisplay.textContent = `Score : ${playerData.score}`;
}

/**
 * Génère l'affichage des usines
 */
function renderFactories() {
    factoryContainer.innerHTML = ""; // Réinitialiser le contenu

    factoryConfig.forEach((factory, index) => {
        const unlocked = playerData.factories.includes(factory.id);

        const factoryElement = document.createElement("div");
        factoryElement.className = "factory";

        const factoryImage = document.createElement("img");
        factoryImage.src = unlocked || index <= playerData.factories.length
            ? factory.image
            : factory.shadow;

        const factoryDetails = document.createElement("div");
        factoryDetails.className = "factory-details";
        factoryDetails.innerHTML = `
            <p>${factory.name}</p>
            <p>Coût : ${factory.cost}</p>
            <p>Production : ${factory.production}/s</p>
        `;

        const buyButton = document.createElement("button");
        buyButton.textContent = "Acheter";
        buyButton.disabled = !unlocked && index > playerData.factories.length;
        buyButton.addEventListener("click", () => purchaseFactory(factory));

        factoryElement.appendChild(factoryImage);
        factoryElement.appendChild(factoryDetails);
        factoryElement.appendChild(buyButton);

        factoryContainer.appendChild(factoryElement);
    });
}

/**
 * Achat d'une usine
 * @param {object} factory - L'usine achetée
 */
function purchaseFactory(factory) {
    if (playerData.score >= factory.cost) {
        playerData.score -= factory.cost;
        factory.cost = Math.ceil(factory.cost * 1.1); // Augmenter le coût
        playerData.factories.push(factory.id);
        updateScoreDisplay();
        renderFactories();
        savePlayerDataToFirebase();
    } else {
        alert("Vous n'avez pas assez de points pour acheter cette usine.");
    }
}

/**
 * Gestion du clic sur le bouton principal
 */
clickButton.addEventListener("click", () => {
    playerData.score += 1;
    updateScoreDisplay();
});

/**
 * Sauvegarde les données du joueur dans Firebase
 */
function savePlayerDataToFirebase() {
    updatePlayerData(playerData.uid, {
        score: playerData.score,
        factories: playerData.factories
    });
}

/**
 * Charge les données du joueur depuis Firebase
 */
function loadPlayerDataFromFirebase(userId) {
    getPlayerData(userId, (data) => {
        if (data) {
            playerData = data;
        }
        updateScoreDisplay();
        renderFactories();
    });
}

// Initialisation du jeu
window.onload = () => {
    const userId = "test-user"; // Remplacer par l'UID de l'utilisateur connecté
    loadPlayerDataFromFirebase(userId);
    renderFactories();
};