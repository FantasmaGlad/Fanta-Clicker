// **1ameliorationsprincipal.js** - Gestion principale des améliorations Baa-Clicker

// Liste des améliorations disponibles
const ameliorations = [
    {
        id: "usine1",
        nom: "Ferme à Baamix",
        cout: 10,
        production: 1,
        description: "Augmente la production de +1 Baamix par seconde."
    },
    {
        id: "usine2",
        nom: "Usine de Baamix",
        cout: 150,
        production: 20,
        description: "Augmente la production de +20 Baamix par seconde."
    },
    {
        id: "usine3",
        nom: "Super Machine",
        cout: 500,
        production: 70,
        description: "Augmente la production de +70 Baamix par seconde."
    }
];

// Fonction pour afficher les améliorations
function afficherAmeliorations() {
    const ameliorationsContainer = document.getElementById("ameliorations-container");
    if (!ameliorationsContainer) return;

    ameliorationsContainer.innerHTML = ""; // Réinitialisation de l'affichage

    ameliorations.forEach((amelioration) => {
        const ameliorationElement = document.createElement("div");
        ameliorationElement.classList.add("amelioration-card");
        ameliorationElement.innerHTML = `
            <h3>${amelioration.nom}</h3>
            <p>${amelioration.description}</p>
            <p>Coût : <span id="${amelioration.id}-cout">${amelioration.cout}</span> Baamix</p>
            <button onclick="acheterAmelioration('${amelioration.id}')">Acheter</button>
        `;
        ameliorationsContainer.appendChild(ameliorationElement);
    });
}

// Fonction pour acheter une amélioration
function acheterAmelioration(id) {
    const donnees = chargerDonneesJeu();
    const amelioration = ameliorations.find((a) => a.id === id);

    if (donnees.score >= amelioration.cout) {
        donnees.score -= amelioration.cout;
        donnees.productionParSeconde += amelioration.production;
        donnees.ameliorations[id] = (donnees.ameliorations[id] || 0) + 1;

        // Augmenter le coût de l'amélioration de 10 %
        amelioration.cout = Math.ceil(amelioration.cout * 1.1);

        enregistrerDonneesJeu(donnees);
        afficherNotification(`Vous avez acheté ${amelioration.nom} !`, "success");
        jouerSon("amelio");
        afficherAmeliorations();
        mettreAJourInterfaceScore();
    } else {
        afficherNotification("Vous n'avez pas assez de Baamix pour acheter cette amélioration !", "error");
    }
}

// Initialisation des améliorations
document.addEventListener("DOMContentLoaded", () => {
    afficherAmeliorations();
});