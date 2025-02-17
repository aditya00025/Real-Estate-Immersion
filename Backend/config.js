const admin = require("firebase-admin");
const serviceAccount = require("./service.json"); // Ensure this file exists in Backend/

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "flutter03-7dc78.appspot.com", // Update with your storage bucket name
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket };
