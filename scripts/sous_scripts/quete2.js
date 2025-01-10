// **quete2.js** - Script pour la quête "Acheter 10 Ferme à Baamix"

const idQuete2 = "quete2";

// Fonction de vérification de la quête
function verifierQuete2() {
    const donnees = chargerDonneesJeu();
    const nbUsinesAchetees = donnees.ameliorations["usine1"] || 0;

    if (nbUsinesAchetees >= 10 && !donnees.quetesTerminees[idQuete2]) {
        afficherNotification("Félicitations ! Vous avez acheté 10 Ferme à Baamix !", "success");
        jouerSon("amelio"); // Son de réussite
        donnees.quetesTerminees[idQuete2] = true;
        enregistrerDonneesJeu(donnees);
        mettreAJourInterfaceScore();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setInterval(verifierQuete2, 1000); // Vérifie la quête toutes les secondes
});