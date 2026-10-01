import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getDatabase, ref, push, onValue }
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

// Paste your Firebase configuration below.
const firebaseConfig = {
    apiKey: "AIzaSyAl9KgN9KhXSGsNAT0f0q5fCeQQhLAPtgg",
    authDomain: "collegevent-reg.firebaseapp.com",
    databaseURL: "https://collegevent-reg-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "collegevent-reg",
    storageBucket: "collegevent-reg.firebasestorage.app",
    messagingSenderId: "1089282137390",
    appId: "1:1089282137390:web:d98ed56aadfa0c04602ebf",
    measurementId: "G-3NYMVK0BRM"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("registrationForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const regNo = document.getElementById("regNo").value.trim();
    const department = document.getElementById("department").value;
    const event = document.getElementById("event").value;

    const registrationsRef = ref(db, "registrations");

    // Prevent duplicate register numbers.
    let duplicate = false;
    const snapshot = await new Promise(resolve => onValue(registrationsRef, resolve, {onlyOnce: true}));
    snapshot.forEach(child => {
        if (child.val().regNo.toLowerCase() === regNo.toLowerCase()) duplicate = true;
    });

    if (duplicate) {
        document.getElementById("message").innerText = "This register number is already registered.";
        return;
    }

    await push(registrationsRef, { name, regNo, department, event });
    document.getElementById("message").innerText = "Registration successful!";
    document.getElementById("registrationForm").reset();
});
