const usines = [
    {
      id: 1,
      nom: "Ferme Baamix",
      image: "assets/images/FermeBaamix.png",
      imageOmbree: "assets/images/FermeBaamixOmbre.png",
      cout: 100,
      productionParSeconde: 1,
      quantite: 0,
    },
    {
      id: 2,
      nom: "Usine Baamix",
      image: "assets/images/UsineBaamix.png",
      imageOmbree: "assets/images/UsineBaamixOmbre.png",
      cout: 500,
      productionParSeconde: 5,
      quantite: 0,
    },
    {
      id: 3,
      nom: "Fusee Baamix",
      image: "assets/images/FuseeBaamix.png",
      imageOmbree: "assets/images/FuseeBaamixOmbre.png",
      cout: 2000,
      productionParSeconde: 20,
      quantite: 0,
    },
  ];
  
  // Fonction pour calculer la production totale par seconde
  function calculerProductionTotale() {
    return usines.reduce((total, usine) => {
      return total + usine.productionParSeconde * usine.quantite;
    }, 0);
  }
  
  // Fonction pour acheter une usine
  function acheterUsine(id, points) {
    const usine = usines.find((u) => u.id === id);
  
    if (!usine) {
      console.error("Usine introuvable");
      return { succes: false, message: "Usine introuvable" };
    }
  
    if (points >= usine.cout) {
      usine.quantite++;
      points -= usine.cout;
      usine.cout = Math.floor(usine.cout * 1.1); // Augmente le coût de 10%
      return { succes: true, points }; // Retourne les points restants
    } else {
      return { succes: false, message: "Pas assez de points" };
    }
  }
  
  // Fonction pour générer les éléments HTML des usines
  function genererHTMLUsines(points) {
    return usines.map((usine, index) => {
      const estDebloquee = index <= 1 || usines[index - 2]?.quantite > 0; // Déblocage n+2
      const imageSrc = estDebloquee ? usine.image : usine.imageOmbree;
  
      return `
        <div class="usine" id="usine-${usine.id}">
          <img src="${imageSrc}" alt="${usine.nom}" class="image-usine" />
          <h3>${usine.nom}</h3>
          <p>Coût : ${usine.cout} Baamix</p>
          <p>Production : ${usine.productionParSeconde} Baamix/sec</p>
          <p>Quantité : ${usine.quantite}</p>
          <button onclick="acheter(${usine.id})" ${estDebloquee ? "" : "disabled"}>Acheter</button>
        </div>
      `;
    }).join("");
  }
  
  // Fonction pour mettre à jour les usines dans l'UI
  function mettreAJourUsines(points) {
    const conteneurUsines = document.getElementById("conteneur-usines");
    conteneurUsines.innerHTML = genererHTMLUsines(points);
  }
  
  // Fonction appelée lorsqu'une usine est achetée
  function acheter(id) {
    const resultat = acheterUsine(id, window.points);
    if (resultat.succes) {
      window.points = resultat.points; // Met à jour les points globaux
      mettreAJourUsines(window.points);
    } else {
      alert(resultat.message);
    }
  }
  
  // Export des fonctions pour intégration
  export {
    usines,
    calculerProductionTotale,
    acheterUsine,
    genererHTMLUsines,
    mettreAJourUsines,
  }; 