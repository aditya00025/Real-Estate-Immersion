// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDZO-2yUHziwbOUpxPqNqjR2n55H89HqNM",
  authDomain: "arrealworld-51cbb.firebaseapp.com",
  projectId: "arrealworld-51cbb",
  storageBucket: "arrealworld-51cbb.appspot.com",
  messagingSenderId: "1033126650105",
  appId: "1:1033126650105:web:b37f448a18f2995a19c228"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Register function
function register() {
  var fullName = document.getElementById('full_name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  var emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailPattern.test(email)) {
      alert("Invalid email format. Please enter a Gmail address.");
      return;
  }

  if (!fullName || !email || !password) {
      alert("All fields must be filled out.");
      return;
  }

  auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
      var user = userCredential.user;
      return db.collection("users").doc(user.uid).set({
          fullName: fullName,
          email: email,
          uid: user.uid
      });
  })
  .then(() => {
      alert("User registered successfully and data saved!");
  })
  .catch((error) => {
      alert("Error: " + error.message);
  });
}
