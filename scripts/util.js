// util.js - Fichier utilitaire pour Baa-Clicker

/**
 * Joue un son lors du clic sur le bouton.
 * @param {string} soundPath - Chemin du fichier audio.
 */
export function playClickSound(soundPath = '../assets/sons/clic-souris.mp3') {
    const audio = new Audio(soundPath);
    audio.play().catch((error) => {
        console.warn("Le son n'a pas pu être lu :", error);
    });
}

/**
 * Formate un nombre pour le rendre plus lisible (ex : 1 000 000 → 1M).
 * @param {number} value - Le nombre à formater.
 * @returns {string} Le nombre formaté.
 */
export function formatNumber(value) {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M`;
    } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}K`;
    }
    return value.toString();
}

/**
 * Crée un effet visuel lors du clic (animation).
 * @param {HTMLElement} element - L'élément où l'animation se produit.
 */
export function createClickEffect(element) {
    element.classList.add('click-animation');
    setTimeout(() => {
        element.classList.remove('click-animation');
    }, 200);
}

/**
 * Retourne une couleur aléatoire pour l'animation du score.
 * @returns {string} Code hexadécimal de la couleur.
 */
export function getRandomColor() {
    const colors = ['#FFD700', '#FF4500', '#00FF00', '#00BFFF', '#FF69B4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Génère une animation de popup lors d'un clic (par exemple pour le score).
 * @param {HTMLElement} parent - L'élément parent où afficher l'animation.
 * @param {string} text - Le texte à afficher (ex : +1).
 */
export function showPopupText(parent, text) {
    const popup = document.createElement('span');
    popup.innerText = text;
    popup.style.position = 'absolute';
    popup.style.left = `${Math.random() * 80 + 10}%`;
    popup.style.top = `${Math.random() * 60 + 20}%`;
    popup.style.color = getRandomColor();
    popup.style.fontSize = '18px';
    popup.style.fontWeight = 'bold';
    popup.style.animation = 'fade-out 1s ease-in-out';
    
    parent.appendChild(popup);

    setTimeout(() => {
        parent.removeChild(popup);
    }, 1000);
}

/**
 * Vérifie si le pseudo est valide (pour éviter des entrées vides ou spéciales).
 * @param {string} pseudo - Le pseudonyme à vérifier.
 * @returns {boolean} True si le pseudo est valide, false sinon.
 */
export function isValidPseudo(pseudo) {
    const regex = /^[a-zA-Z0-9_-]{3,20}$/;
    return regex.test(pseudo);
}
