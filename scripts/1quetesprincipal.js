// **1quetesprincipal.js** - Gestion principale des quêtes Baa-Clicker

// Liste des quêtes et leurs conditions
const quetes = [
    {
        id: "quete1",
        description: "Produire 10 Baamix",
        condition: (donnees) => donnees.score >= 10,
        recompense: () => jouerSon("reussite")
    },
    {
        id: "quete2",
        description: "Acheter 10 'Usine 1'",
        condition: (donnees) => donnees.ameliorations["usine1"] && donnees.ameliorations["usine1"].nombre >= 10,
        recompense: () => jouerSon("reussite")
    },
    {
        id: "quete3",
        description: "Produire 1000 Baamix",
        condition: (donnees) => donnees.score >= 1000,
        recompense: () => jouerSon("reussite")
    }
];

// Fonction pour vérifier si une quête est complétée
function verifierQuetes() {
    const donnees = chargerDonneesJeu();
    quetes.forEach((quete) => {
        if (!donnees.quetes[quete.id] && quete.condition(donnees)) {
            donnerRecompense(quete.id, quete.recompense);
        }
    });
}

// Fonction pour attribuer la récompense d'une quête
function donnerRecompense(idQuete, fonctionRecompense) {
    afficherNotification(`Quête ${idQuete} complétée !`, "success");
    fonctionRecompense();
    enregistrerProgressionQuete(idQuete, true);
    mettreAJourQuetesInterface();
}

// Met à jour l'interface pour afficher l'état des quêtes
function mettreAJourQuetesInterface() {
    const quetesContainer = document.getElementById("quetes-container");
    if (!quetesContainer) return;

    quetesContainer.innerHTML = ""; // Réinitialise l'affichage
    const donnees = chargerDonneesJeu();

    quetes.forEach((quete) => {
        const queteElement = document.createElement("div");
        queteElement.classList.add("quete");
        queteElement.innerHTML = `
            <h3>${quete.description}</h3>
            <p>État : ${donnees.quetes[quete.id] ? "Complétée" : "En cours"}</p>
        `;
        quetesContainer.appendChild(queteElement);
    });
}

// Initialisation des quêtes à l'ouverture de la page des quêtes
document.addEventListener("DOMContentLoaded", () => {
    mettreAJourQuetesInterface();
    setInterval(verifierQuetes, 5000); // Vérification des quêtes toutes les 5 secondes
});