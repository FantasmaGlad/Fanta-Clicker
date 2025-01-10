// **quete3.js** - Script pour la quête "Produire 1000 Baamix"

const idQuete3 = "quete3";

// Fonction de vérification de la quête
function verifierQuete3() {
    const donnees = chargerDonneesJeu();

    if (donnees.scoreTotal >= 1000 && !donnees.quetesTerminees[idQuete3]) {
        afficherNotification("Incroyable ! Vous avez produit 1000 Baamix !", "success");
        jouerSon("amelio"); // Son de réussite
        donnees.quetesTerminees[idQuete3] = true;
        enregistrerDonneesJeu(donnees);
        mettreAJourInterfaceScore();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setInterval(verifierQuete3, 1000); // Vérifie la quête toutes les secondes
});