import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var Email = document.getElementById("Email");
var password = document.getElementById("password");
var cnic = document.getElementById("cnic");

let course = document.getElementById("course");
let studentId = document.getElementById("studentId");
let marks = document.getElementById("marks");
let totalMarks = document.getElementById("totalMarks");
let grade = document.getElementById("grade");

window.submit = () => {
  let obj = {
    firstName: firstName.value,
    lastName: lastName.value,
    Email: Email.value,
    password: password.value,
    cnic: cnic.value,

    course: course.value,
    studentId: studentId.value,
    marks: marks.value,
    totalMarks: totalMarks.value,
    grade: grade.value
  };

  firstName.value = "";
  lastName.value = "";
  Email.value = "";
  password.value = "";
  cnic.value = "";
  course.value = "";
  studentId.value = "";
  marks.value = "";
  totalMarks.value = "";
  grade.value = "";

  createUserWithEmailAndPassword(auth, obj.Email, obj.password)
    .then((res) => {
      console.log("User created successfully: ", res);
      obj.id = res.user.uid;
      delete obj.password; 

      const ref = doc(db, "StudentsWithMarks", obj.id);
      setDoc(ref, obj)
        .then(() => {
          console.log("Student and marks data added: ", obj);
           window.location.href = "Admain.html"; 
        })
        .catch((dbErr) => {
          console.error("Error adding student data: ", dbErr);
        });
    })
    .catch((error) => {
      console.error("Error in authentication: ", error);
    });
};
