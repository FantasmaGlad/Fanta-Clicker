// Gestion principale du jeu BaaClicker

import {
    calculerProductionTotale,
    mettreAJourUsines,
    usines,
  } from "./usines.js";
  import {
    incrementerProgression,
    chargerQuetes,
    mettreAJourQuetesUI,
  } from "./quetes.js";
  import {
    sauvegarderDonneesUtilisateur,
    synchroniserDonnees,
  } from "./database.js";
  
  // Variables globales
  let points = 0;
  let baamixParSeconde = 0;
  const utilisateurID = "utilisateur_invite"; // Utilisateur par défaut, remplacé par l'auth plus tard
  
  // Fonction pour incrémenter les points lors d'un clic
  function cliquerSurBaamix() {
    points++;
    incrementerProgression(1); // Incrémente la progression de la quête 1
    mettreAJourUI();
  }
  
  // Fonction pour calculer les Baamix par seconde
  function calculerBaamixParSeconde() {
    baamixParSeconde = calculerProductionTotale();
  }
  
  // Fonction pour mettre à jour l'interface utilisateur
  function mettreAJourUI() {
    document.getElementById("compteur-points").innerText = `${points} Baamix`;
    document.getElementById("compteur-par-seconde").innerText = `par seconde : ${baamixParSeconde}`;
    mettreAJourUsines(points);
    mettreAJourQuetesUI();
  }
  
  // Fonction pour générer des Baamix automatiquement
  function genererBaamixAutomatiquement() {
    points += baamixParSeconde;
    mettreAJourUI();
  }
  
  // Initialisation du jeu
  function initialiserJeu() {
    // Charger les quêtes
    chargerQuetes();
  
    // Synchroniser les données si disponible
    const donneesLocales = JSON.parse(localStorage.getItem("baaclicker_donnees")) || {};
    synchroniserDonnees(utilisateurID, donneesLocales);
  
    // Mettre à jour l'interface utilisateur
    mettreAJourUI();
  
    // Lancer le générateur automatique de Baamix
    setInterval(genererBaamixAutomatiquement, 1000);
  
    // Sauvegarder les données toutes les 10 secondes
    setInterval(() => {
      const donneesUtilisateur = {
        points,
        usines,
        quetes,
      };
      localStorage.setItem("baaclicker_donnees", JSON.stringify(donneesUtilisateur));
      sauvegarderDonneesUtilisateur(utilisateurID, donneesUtilisateur);
    }, 10000);
  }
  
  // Gestion des clics sur le bouton principal
  const boutonBaamix = document.getElementById("bouton-baamix");
  boutonBaamix.addEventListener("click", cliquerSurBaamix);
  
  // Initialiser le jeu après le chargement de la page
  window.onload = initialiserJeu;
  
  // Export pour tests ou extensions
  export {
    cliquerSurBaamix,
    mettreAJourUI,
    initialiserJeu,
  };  