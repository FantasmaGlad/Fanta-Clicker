// Import des fonctions Firebase
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { playClickSound } from "./util.js";

// Référence à la base de données
const database = getDatabase();

// Liste des améliorations
const upgrades = [
  {
    id: "ferme",
    name: "Ferme à Baamix",
    cost: 50,
    increment: 1,
    cps: 1, // Clic par seconde
    description: "Produit automatiquement des points toutes les secondes."
  },
  {
    id: "usine",
    name: "Usine à Baamix",
    cost: 200,
    increment: 2,
    cps: 5,
    description: "Double votre production de points."
  },
  {
    id: "super-machine",
    name: "Super Machine",
    cost: 500,
    increment: 10,
    cps: 10,
    description: "Génère des gains massifs toutes les secondes."
  }
];

// Chargement des améliorations dans la page
function loadUpgrades() {
  const upgradesContainer = document.getElementById("upgradesContainer");

  upgrades.forEach(upgrade => {
    const upgradeElement = document.createElement("div");
    upgradeElement.className = "upgrade-item";

    upgradeElement.innerHTML = `
      <h3>${upgrade.name}</h3>
      <p>${upgrade.description}</p>
      <button id="buy-${upgrade.id}">Acheter pour ${upgrade.cost} points</button>
      <span id="count-${upgrade.id}">0 achetée(s)</span>
    `;

    upgradesContainer.appendChild(upgradeElement);

    // Gestionnaire d'événement d'achat
    document.getElementById(`buy-${upgrade.id}`).addEventListener("click", () => {
      purchaseUpgrade(upgrade);
    });
  });
}

// Fonction pour gérer l'achat d'une amélioration
function purchaseUpgrade(upgrade) {
  let score = parseInt(localStorage.getItem("score")) || 0;
  const pseudo = localStorage.getItem("playerPseudo");

  if (score >= upgrade.cost) {
    score -= upgrade.cost;
    const upgradeCountKey = `${upgrade.id}-count`;
    let upgradeCount = parseInt(localStorage.getItem(upgradeCountKey)) || 0;
    upgradeCount++;

    // Augmentation du coût de 10 % après chaque achat
    upgrade.cost = Math.floor(upgrade.cost * 1.1);
    
    // Sauvegarde locale
    localStorage.setItem("score", score);
    localStorage.setItem(upgradeCountKey, upgradeCount);

    document.getElementById(`count-${upgrade.id}`).innerText = `${upgradeCount} achetée(s)`;
    document.getElementById(`buy-${upgrade.id}`).innerText = `Acheter pour ${upgrade.cost} points`;

    // Production automatique
    setInterval(() => {
      let currentScore = parseInt(localStorage.getItem("score")) || 0;
      currentScore += upgrade.cps;
      localStorage.setItem("score", currentScore);
      document.getElementById("score").innerText = `Score : ${currentScore}`;
    }, 1000);

    // Mise à jour dans Firebase
    const playerRef = ref(database, `players/${pseudo}`);
    update(playerRef, {
      score: score,
      [upgrade.id]: upgradeCount
    });

    playClickSound();
  } else {
    console.log("Pas assez de points pour acheter cette amélioration.");
  }
}

// Initialisation des améliorations
window.onload = function () {
  loadUpgrades();
};