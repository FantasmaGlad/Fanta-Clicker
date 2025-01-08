console.log("Le jeu de Clicker est prêt !");
let score = 0;

document.getElementById("clickButton").addEventListener("click", () => {
    score++;
    document.getElementById("score").innerText = `Score : ${score}`;
});