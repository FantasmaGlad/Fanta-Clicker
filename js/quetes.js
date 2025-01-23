// Liste des quêtes disponibles
const quetes = [
    {
      id: 1,
      description: "Cliquer sur Baamix 100 fois",
      objectif: 100,
      progression: 0,
      recompense: "assets/images/Skins/Baatman.png",
      debloque: false,
    },
  ];
  
  // Fonction pour incrémenter la progression d'une quête
  function incrementerProgression(id, valeur = 1) {
    const quete = quetes.find((q) => q.id === id);
  
    if (quete && !quete.debloque) {
      quete.progression += valeur;
      if (quete.progression >= quete.objectif) {
        quete.progression = quete.objectif;
        quete.debloque = true;
        afficherNotificationRecompense(quete.recompense);
      }
      mettreAJourQuetesUI();
    }
  }
  
  // Fonction pour générer l'élément HTML des quêtes
  function genererHTMLQuetes() {
    return quetes
      .map((quete) => {
        const progressionPourcentage = (quete.progression / quete.objectif) * 100;
  
        return `
          <div class="quete">
            <h3>${quete.description}</h3>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${progressionPourcentage}%"></div>
            </div>
            <p>${quete.progression}/${quete.objectif}</p>
          </div>
        `;
      })
      .join("");
  }
  
  // Fonction pour mettre à jour l'affichage des quêtes dans l'UI
  function mettreAJourQuetesUI() {
    const conteneurQuetes = document.getElementById("conteneur-quetes");
    conteneurQuetes.innerHTML = genererHTMLQuetes();
  }
  
  // Fonction pour afficher une notification de récompense
  function afficherNotificationRecompense(recompense) {
    alert("Félicitations ! Vous avez débloqué un nouveau skin !");
    // Ajoutez ici une logique pour enregistrer la récompense dans Firebase/localStorage
  }
  
  // Fonction initiale pour charger les quêtes dans l'interface
  function chargerQuetes() {
    mettreAJourQuetesUI();
  }
  
  // Export des fonctions pour intégration
  export {
    quetes,
    incrementerProgression,
    genererHTMLQuetes,
    mettreAJourQuetesUI,
    chargerQuetes,
  };  