// **amelioration2.js** - Script pour l'"Usine de Baamix"

const idAmelioration2 = "usine2";

// Fonction d'achat spécifique à l'Usine de Baamix
function acheterUsineBaamix() {
    const donnees = chargerDonneesJeu();
    const amelioration = {
        id: idAmelioration2,
        nom: "Usine de Baamix",
        cout: 150,
        production: 20
    };

    if (donnees.score >= amelioration.cout) {
        donnees.score -= amelioration.cout;
        donnees.productionParSeconde += amelioration.production;
        donnees.ameliorations[idAmelioration2] = (donnees.ameliorations[idAmelioration2] || 0) + 1;

        amelioration.cout = Math.ceil(amelioration.cout * 1.1);
        enregistrerDonneesJeu(donnees);
        afficherNotification(`Vous avez acheté une ${amelioration.nom} !`, "success");
        jouerSon("amelio");
        afficherAmeliorations();
        mettreAJourInterfaceScore();
    } else {
        afficherNotification("Vous n'avez pas assez de Baamix pour acheter cette amélioration !", "error");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const boutonUsine = document.getElementById(`${idAmelioration2}-bouton`);
    if (boutonUsine) {
        boutonUsine.addEventListener("click", acheterUsineBaamix);
    }
});