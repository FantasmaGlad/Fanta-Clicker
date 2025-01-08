console.log("Le jeu de Clicker est prêt !");
let score = 0;  // Initialisation du score

// Charger le son de clic
const clickSound = new Audio('sons/clic-souris.mp3');  // Chemin relatif vers le fichier son

// Ajout de l'événement click pour augmenter le score
document.getElementById("clickButton").addEventListener("click", () => {
    score++;
    document.getElementById("score").innerText = `Score : ${score}`;
    clickSound.play();  // Jouer le son de clic
});

// Score automatique toutes les 5 secondes
setInterval(() => {
    score += 1;
    document.getElementById("score").innerText = `Score : ${score}`;
}, 5000);

// Charger le score sauvegardé lors du chargement de la page
window.onload = function () {
    if (localStorage.getItem("clickerScore")) {
        score = parseInt(localStorage.getItem("clickerScore"));
        document.getElementById("score").innerText = `Score : ${score}`;
    }
};