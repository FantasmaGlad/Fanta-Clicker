// **database.js** - Gestion des données du jeu Baa-Clicker

// Chargement de la sauvegarde complète du jeu
function chargerDonneesJeu() {
    const sauvegarde = chargerSauvegarde("donneesJeu");
    return sauvegarde || {
        score: 0,
        productionParSeconde: 0,
        ameliorations: {},
        quetes: {}
    };
}

// Sauvegarde complète du jeu
function sauvegarderDonneesJeu(donnees) {
    sauvegarder("donneesJeu", donnees);
}

// Mise à jour des données après une action du joueur (clic ou amélioration)
function mettreAJourDonneesJeu(nouvelleProduction, nouvelleAmelioration) {
    const donnees = chargerDonneesJeu();
    donnees.score += nouvelleProduction || 0;
    if (nouvelleAmelioration) {
        const { nom, cout, gain } = nouvelleAmelioration;
        donnees.ameliorations[nom] = donnees.ameliorations[nom] || { nombre: 0, totalCout: 0 };
        donnees.ameliorations[nom].nombre += 1;
        donnees.ameliorations[nom].totalCout += cout;
        donnees.productionParSeconde += gain;
    }
    sauvegarderDonneesJeu(donnees);
}

// Enregistrement de la progression d'une quête
function enregistrerProgressionQuete(nomQuete, valeur) {
    const donnees = chargerDonneesJeu();
    donnees.quetes[nomQuete] = valeur;
    sauvegarderDonneesJeu(donnees);
}

// Réinitialisation des données du jeu
function reinitialiserDonneesJeu() {
    if (confirm("Voulez-vous vraiment réinitialiser vos données ?")) {
        sauvegarderDonneesJeu({
            score: 0,
            productionParSeconde: 0,
            ameliorations: {},
            quetes: {}
        });
        afficherNotification("Données réinitialisées avec succès.", "warning");
        window.location.reload();
    }
}

// Fonction pour charger le score à l'écran
function afficherScore() {
    const donnees = chargerDonneesJeu();
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
        scoreElement.innerText = formatNombre(donnees.score) + " Baamix";
    }
}

// Fonction pour charger la production par seconde à l'écran
function afficherProductionParSeconde() {
    const donnees = chargerDonneesJeu();
    const productionElement = document.getElementById("production-par-seconde");
    if (productionElement) {
        productionElement.innerText = `Production par seconde : ${formatNombre(donnees.productionParSeconde)} Baamix`;
    }
}

// Gestion de l'auto-sauvegarde toutes les 10 secondes
setInterval(() => {
    const donnees = chargerDonneesJeu();
    sauvegarderDonneesJeu(donnees);
    console.log("Sauvegarde automatique effectuée.");
}, 10000);