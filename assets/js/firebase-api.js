// 1. On importe le moteur Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// 2. On importe les outils de la base de données (Firestore)
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 3. TES CLÉS SECRÈTES (Remplace ceci par ton vrai bloc !)
const firebaseConfig = {
    apiKey: "AIzaSyDkKm_H5I2QCbBCzS3oLODP0PbYssyE4C4",
    authDomain: "le-mot-juste-au-point-avis.firebaseapp.com",
    projectId: "le-mot-juste-au-point-avis",
    storageBucket: "le-mot-juste-au-point-avis.firebasestorage.app",
    messagingSenderId: "282076366908",
    appId: "1:282076366908:web:c3241cf75632270f7c9b39",
    measurementId: "G-FRKFJ4RPBY"
};

// 4. On "allume" Firebase et la base de données
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 5. ASTUCE : On rend ces outils disponibles pour le reste du site
window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;