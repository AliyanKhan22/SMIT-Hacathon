import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD6OwZmo-n8sLm6d48JSyzdjuOKQ9KfKvU",
    authDomain: "first-project-17489.firebaseapp.com",
    projectId: "first-project-17489",
    storageBucket: "first-project-17489.appspot.com",
    messagingSenderId: "659891515894",
    appId: "1:659891515894:web:3df34d8cdff7428911d7d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('Login successful!');
            window.location.href = '../Student/edit-profile.html'; 
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
});

document.getElementById('editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    alert('Form submitted successfully!');
    window.location.href = '../Student/student-dashboard.html';
});
