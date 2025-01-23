// Gestion de la page Bonjour (connexion ou invité)

import { sauvegarderDonneesUtilisateur, synchroniserDonnees } from "./database.js";

// Variables globales
const utilisateurID = localStorage.getItem("baaclicker_utilisateur") || null;

// Fonction pour générer un pseudo aléatoire pour le mode invité
function genererPseudoInvite() {
  const pseudo = `BaamixLover${Math.floor(Math.random() * 10000)}`;
  localStorage.setItem("baaclicker_utilisateur", pseudo);
  return pseudo;
}

// Gestion du bouton "Jouer en tant qu'invité"
const boutonInvite = document.getElementById("bouton-invite");
boutonInvite.addEventListener("click", () => {
  const pseudo = genererPseudoInvite();
  const donneesInitiales = {
    points: 0,
    usines: [],
    quetes: [],
  };

  localStorage.setItem("baaclicker_donnees", JSON.stringify(donneesInitiales));
  sauvegarderDonneesUtilisateur(pseudo, donneesInitiales);

  // Redirection vers la page principale
  window.location.href = "index.html";
});

// Gestion du bouton "Se connecter avec Google"
const boutonGoogle = document.getElementById("bouton-google");
boutonGoogle.addEventListener("click", () => {
  // Logique pour lancer l'authentification Google
  // Cette fonctionnalité repose sur le fichier auth.js
  import("./auth.js").then((authModule) => {
    authModule.connexionGoogle().then((utilisateur) => {
      localStorage.setItem("baaclicker_utilisateur", utilisateur.uid);

      // Synchroniser les données de l'utilisateur après connexion
      const donneesLocales = JSON.parse(localStorage.getItem("baaclicker_donnees")) || {};
      synchroniserDonnees(utilisateur.uid, donneesLocales);

      // Redirection vers la page principale
      window.location.href = "index.html";
    });
  });
});

// Initialisation de la page Bonjour
function initialiserPageBonjour() {
  if (utilisateurID) {
    // Si l'utilisateur est déjà connecté ou invité, redirection automatique
    window.location.href = "index.html";
  }
}

// Charger l'initialisation après le chargement de la page
window.onload = initialiserPageBonjour;

// Export des fonctions (utile pour tests)
export {
  initialiserPageBonjour,
  genererPseudoInvite,
};