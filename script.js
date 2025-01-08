// Initialisation des variables
let score = 0;
let pseudo = localStorage.getItem("pseudo");

// Vérifier si un pseudonyme existe
if (!pseudo) {
    window.location.href = "welcome.html";  // Redirige vers la page d'accueil si pas de pseudo
}

// Charger le score sauvegardé lors du chargement de la page
window.onload = function () {
    const savedScore = localStorage.getItem("clickerScore");
    if (savedScore) {
        score = parseInt(savedScore);
    }
    document.getElementById("score").innerText = `Score : ${score}`;
};

// Ajouter l'événement clic sur le bouton
document.getElementById("clickButton").addEventListener("click", () => {
    score++;
    document.getElementById("score").innerText = `Score : ${score}`;
    localStorage.setItem("clickerScore", score);  // Sauvegarde le score dans localStorage
});

// Reset du score (optionnel, bouton reset)
function resetScore() {
    score = 0;
    localStorage.setItem("clickerScore", score);
    document.getElementById("score").innerText = "Score : 0";
}