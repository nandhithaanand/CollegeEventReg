import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getDatabase, ref, onValue, remove }
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

// Paste the same Firebase configuration used in script.js.
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
const registrationsRef = ref(db, "registrations");

onValue(registrationsRef, function(snapshot) {
    const list = document.getElementById("registrationList");
    list.innerHTML = "";
    let count = 0;

    snapshot.forEach(function(child) {
        count++;
        const data = child.val();
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.regNo}</td>
            <td>${data.department}</td>
            <td>${data.event}</td>
            <td><button class="delete" onclick="deleteRegistration('${child.key}')">Delete</button></td>
        `;

        list.appendChild(row);
    });

    document.getElementById("count").innerText = count;
});

window.deleteRegistration = function(id) {
    remove(ref(db, "registrations/" + id));
};
