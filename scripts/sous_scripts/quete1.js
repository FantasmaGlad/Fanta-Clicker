// **quete1.js** - Script pour la quête "Produire 10 Baamix"

// ID de la quête
const idQuete1 = "quete1";

// Fonction de vérification de la quête
function verifierQuete1() {
    const donnees = chargerDonneesJeu();

    if (donnees.scoreTotal >= 10 && !donnees.quetesTerminees[idQuete1]) {
        afficherNotification("Bravo ! Vous avez complété la quête : Produire 10 Baamix !", "success");
        jouerSon("amelio"); // Son de réussite
        donnees.quetesTerminees[idQuete1] = true;
        enregistrerDonneesJeu(donnees);
        mettreAJourInterfaceScore(); // Actualise l'affichage
    }
}

// Ajout de l'événement
document.addEventListener("DOMContentLoaded", () => {
    setInterval(verifierQuete1, 1000); // Vérifie la quête toutes les secondes
});