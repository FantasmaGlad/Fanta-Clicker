// **amelioration1.js** - Script pour la "Ferme à Baamix"

// ID de l'amélioration
const idAmelioration1 = "usine1";

// Fonction d'achat spécifique à la Ferme à Baamix
function acheterFermeBaamix() {
    const donnees = chargerDonneesJeu();
    const amelioration = {
        id: idAmelioration1,
        nom: "Ferme à Baamix",
        cout: 10,
        production: 1
    };

    if (donnees.score >= amelioration.cout) {
        donnees.score -= amelioration.cout;
        donnees.productionParSeconde += amelioration.production;
        donnees.ameliorations[idAmelioration1] = (donnees.ameliorations[idAmelioration1] || 0) + 1;

        // Augmenter le coût de 10 %
        amelioration.cout = Math.ceil(amelioration.cout * 1.1);

        enregistrerDonneesJeu(donnees);
        afficherNotification(`Vous avez acheté une ${amelioration.nom} !`, "success");
        jouerSon("amelio");
        afficherAmeliorations(); // Met à jour l'affichage des améliorations
        mettreAJourInterfaceScore(); // Met à jour le score et la production
    } else {
        afficherNotification("Vous n'avez pas assez de Baamix pour acheter cette amélioration !", "error");
    }
}

// Ajout d'un événement à l'élément correspondant
document.addEventListener("DOMContentLoaded", () => {
    const boutonFerme = document.getElementById(`${idAmelioration1}-bouton`);
    if (boutonFerme) {
        boutonFerme.addEventListener("click", acheterFermeBaamix);
    }
});