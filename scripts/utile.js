// **utile.js** - Fonctions utilitaires pour le jeu Baa-Clicker

// Fonction pour jouer un son
function jouerSonClic(cheminSon) {
    try {
        const audio = new Audio(cheminSon);
        audio.play().catch(() => {
            console.warn("Le son ne peut pas être joué automatiquement. Activer le son dans votre navigateur.");
        });
    } catch (e) {
        console.error("Erreur lors de la lecture du son : ", e);
    }
}

// Fonction pour afficher une notification visuelle temporaire
function afficherNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000); // La notification disparaît après 3 secondes
}

// Fonction pour formater un grand nombre avec des séparateurs
function formatNombre(nombre) {
    return nombre.toLocaleString("fr-FR");
}

// Fonction pour afficher les barres de progression
function majBarreProgression(barreId, valeurActuelle, valeurMax) {
    const barre = document.getElementById(barreId);
    if (barre) {
        const pourcentage = (valeurActuelle / valeurMax) * 100;
        barre.style.width = `${Math.min(pourcentage, 100)}%`;
        barre.innerText = `${Math.floor(pourcentage)}%`;
    }
}

// Fonction pour générer une alerte personnalisée pour les succès (sons de quêtes réussies)
function alerteSuccesQuete(message, cheminSon) {
    afficherNotification(message, "success");
    jouerSonClic(cheminSon);
}

// Fonction pour charger une sauvegarde depuis `localStorage`
function chargerSauvegarde(cle) {
    const valeur = localStorage.getItem(cle);
    return valeur ? JSON.parse(valeur) : null;
}

// Fonction pour sauvegarder une valeur dans `localStorage`
function sauvegarder(cle, valeur) {
    localStorage.setItem(cle, JSON.stringify(valeur));
}

// Fonction pour reset du jeu (par exemple : remettre à zéro toutes les données)
function reinitialiserJeu() {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser votre progression ?")) {
        localStorage.clear();
        afficherNotification("Progression réinitialisée avec succès.", "warning");
        window.location.reload();
    }
}

// Fonction pour vérifier si le navigateur supporte le son
function verifierSupportAudio() {
    const audio = document.createElement("audio");
    return !!audio.canPlayType;
}

// Ajout d'un effet visuel sur les boutons lors du clic
function ajouterEffetBouton(boutonId) {
    const bouton = document.getElementById(boutonId);
    if (bouton) {
        bouton.addEventListener("mousedown", () => {
            bouton.style.transform = "scale(0.95)";
        });
        bouton.addEventListener("mouseup", () => {
            bouton.style.transform = "scale(1)";
        });
        bouton.addEventListener("mouseleave", () => {
            bouton.style.transform = "scale(1)";
        });
    }
}

// Fonction utilitaire pour changer la couleur du bouton principal
function appliquerCouleurBouton(couleur) {
    const boutonPrincipal = document.getElementById("baamix-button");
    if (boutonPrincipal) {
        boutonPrincipal.style.backgroundColor = couleur;
    }
}

// Fonction pour naviguer vers une autre page
function allerVersPage(url) {
    window.location.href = url;
}