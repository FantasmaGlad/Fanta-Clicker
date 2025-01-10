// **amelioration3.js** - Script pour la "Super Machine"

const idAmelioration3 = "usine3";

// Fonction d'achat spécifique à la Super Machine
function acheterSuperMachine() {
    const donnees = chargerDonneesJeu();
    const amelioration = {
        id: idAmelioration3,
        nom: "Super Machine",
        cout: 500,
        production: 70
    };

    if (donnees.score >= amelioration.cout) {
        donnees.score -= amelioration.cout;
        donnees.productionParSeconde += amelioration.production;
        donnees.ameliorations[idAmelioration3] = (donnees.ameliorations[idAmelioration3] || 0) + 1;

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
    const boutonSuperMachine = document.getElementById(`${idAmelioration3}-bouton`);
    if (boutonSuperMachine) {
        boutonSuperMachine.addEventListener("click", acheterSuperMachine);
    }
});