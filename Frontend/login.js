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

// Login function
function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please fill in both email and password fields.");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        alert("Login successful!");
        window.location.href = 'index.html';
    })
    .catch((error) => {
        var errorMessage = error.message;
        alert("Error: " + errorMessage);
    });
}
