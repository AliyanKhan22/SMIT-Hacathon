import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6OwZmo-n8sLm6d48JSyzdjuOKQ9KfKvU",
  authDomain: "first-project-17489.firebaseapp.com",
  projectId: "first-project-17489",
  storageBucket: "first-project-17489.appspot.com",
  messagingSenderId: "659891515894",
  appId: "1:659891515894:web:9496b09da30db7d611d7d7",
  measurementId: "G-J13FSSE6D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

const viewResultForm = document.getElementById('viewResultForm');

viewResultForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  let cnic = document.getElementById('cnicResult').value.trim();
  
  if (cnic.length === 13) {
    cnic = `${cnic.slice(0, 5)}-${cnic.slice(5, 12)}-${cnic.slice(12)}`;
  }

  console.log('User ne jo CNIC enter kiya:', cnic);

  try {
    // Fetch student data from "StudentsWithMarks" collection
    const studentQuery = query(collection(db, 'StudentsWithMarks'), where('cnic', '==', cnic));
    const studentSnapshot = await getDocs(studentQuery);

    if (studentSnapshot.empty) {
      console.log('Koi student record nahi mila.');
      alert('CNIC ke liye koi student record nahi mila.');
    } else {
      studentSnapshot.forEach((doc) => {
        const studentData = doc.data();
        console.log('Student Result found:', studentData);
        
        // Display student information with marks
        alert(`Student Name: ${studentData.firstName} ${studentData.lastName}\nEmail: ${studentData.Email}\nCourse: ${studentData.course}\nMarks: ${studentData.marks}\nGrade: ${studentData.grade}`);
        window.location.href = "student-dashboard.html"
      });
    }

  } catch (error) {
    console.error("Result fetch karte waqt error aya:", error);
  }
});
