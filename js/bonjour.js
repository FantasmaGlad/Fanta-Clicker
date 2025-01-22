// ------------------------------
// PROTOCOLE BAAMIX bonjour.js Version 1.0
// ------------------------------

// Importer les modules nécessaires pour l'authentification Google
import { signInWithGoogle } from "./auth.js";

// DOM Elements
const googleButton = document.getElementById("google-login-button");
const nicknameInput = document.getElementById("nickname");
const submitButton = document.getElementById("submit-button");

/**
 * Gestion de l'événement de connexion Google
 */
googleButton.addEventListener("click", () => {
    signInWithGoogle();
});

/**
 * Validation du pseudonyme et navigation
 */
submitButton.addEventListener("click", () => {
    const nickname = nicknameInput.value.trim();

    if (nickname === "") {
        alert("Veuillez entrer un pseudonyme.");
        return;
    }

    // Sauvegarder le pseudonyme dans localStorage
    localStorage.setItem("nickname", nickname);

    // Rediriger vers la page principale
    window.location.href = "index.html";
});