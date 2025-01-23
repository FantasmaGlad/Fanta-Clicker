// Gestion de la base de données Firebase

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update } from "firebase/database";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_AUTH_DOMAIN",
  databaseURL: "VOTRE_DATABASE_URL",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_STORAGE_BUCKET",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID",
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fonction pour sauvegarder les données utilisateur dans Firebase
function sauvegarderDonneesUtilisateur(uid, donnees) {
  const reference = ref(database, `utilisateurs/${uid}`);
  set(reference, donnees)
    .then(() => {
      console.log("Données sauvegardées avec succès.");
    })
    .catch((error) => {
      console.error("Erreur lors de la sauvegarde des données :", error);
    });
}

// Fonction pour charger les données utilisateur depuis Firebase
function chargerDonneesUtilisateur(uid) {
  const reference = ref(database, `utilisateurs/${uid}`);
  return get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("Aucune donnée trouvée pour cet utilisateur.");
        return null;
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des données :", error);
      return null;
    });
}

// Fonction pour mettre à jour les données utilisateur
function mettreAJourDonneesUtilisateur(uid, nouvellesDonnees) {
  const reference = ref(database, `utilisateurs/${uid}`);
  update(reference, nouvellesDonnees)
    .then(() => {
      console.log("Données mises à jour avec succès.");
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour des données :", error);
    });
}

// Gestion de la synchronisation entre localStorage et Firebase
function synchroniserDonnees(uid, donneesLocalStorage) {
  chargerDonneesUtilisateur(uid).then((donneesFirebase) => {
    if (!donneesFirebase) {
      // Si aucune donnée Firebase, sauvegarder les données locales
      sauvegarderDonneesUtilisateur(uid, donneesLocalStorage);
    } else {
      // Fusionner les données locales et Firebase
      const donneesFusionnees = { ...donneesFirebase, ...donneesLocalStorage };
      sauvegarderDonneesUtilisateur(uid, donneesFusionnees);
    }
  });
}

// Export des fonctions pour utilisation
export {
  sauvegarderDonneesUtilisateur,
  chargerDonneesUtilisateur,
  mettreAJourDonneesUtilisateur,
  synchroniserDonnees,
};