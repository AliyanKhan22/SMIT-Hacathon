import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
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
const db = getFirestore(app);


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userEmail = user.email;

        const studentQuery = query(collection(db, 'StudentsWithMarks'), where('Email', '==', userEmail));
        const studentSnapshot = await getDocs(studentQuery);

        if (!studentSnapshot.empty) {
            studentSnapshot.forEach((docSnapshot) => {
                const studentData = docSnapshot.data();
                document.getElementById('firstName').value = studentData.firstName;
                document.getElementById('lastName').value = studentData.lastName;
                document.getElementById('cnic').value = studentData.cnic;
            });
        } else {
            alert('Student data not found.');
        }
    } else {
        window.location.href = '../login.html';
    }
});


document.getElementById('editProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    const updatedFirstName = document.getElementById('firstName').value;
    const updatedLastName = document.getElementById('lastName').value;
    const updatedCnic = document.getElementById('cnic').value;

    const studentQuery = query(collection(db, 'StudentsWithMarks'), where('Email', '==', user.email));
    const studentSnapshot = await getDocs(studentQuery);

    if (!studentSnapshot.empty) {
        studentSnapshot.forEach(async (docSnapshot) => {
            const studentDocRef = doc(db, 'StudentsWithMarks', docSnapshot.id);

            await updateDoc(studentDocRef, {
                firstName: updatedFirstName,
                lastName: updatedLastName,
                cnic: updatedCnic
            });

            alert('Profile updated successfully. You will be logged out.');

            // Logout the user
            await signOut(auth);
            // Redirect to student dashboard
            window.location.href = '../Student/student-dashboard.html';
        });
    } else {
        alert('Student data not found.');
    }
});
