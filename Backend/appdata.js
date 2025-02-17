const express = require("express");
const multer = require("multer");
const { db } = require("./config"); // Ensure your config.js exports Firestore's db

const router = express.Router();

// Increase the field size limit to allow larger Base64 image strings.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 10 * 1024 * 1024 } // 10 MB limit per field
}).none();

router.post("/submit-form", upload, async (req, res) => {
  try {
    console.log("🔹 Received form data:", req.body);

    // Destructure form fields using exact field names.
    const threeDModel = req.body["3D Model"];
    const address = req.body["Address"];
    const pincode = req.body["Pincode"];
    const landmark = req.body["Landmark"];
    const railwayStn = req.body["Railway Stn"];
    const latitude = req.body["Latitude"];
    const longitude = req.body["Longitude"];
    const price = req.body["Price"];
    const rooms = req.body["Rooms"];
    const washroom = req.body["Washroom"];
    const area = req.body["Area"];
    const busStop = req.body["Bus Stop"];
    const sale = req.body["Sale"];
    const sellerName = req.body["Seller Name"];
    const sellerContact = req.body["Seller Contact"];
    const description = req.body["Description"];
    const imageBase64 = req.body["Image"]; // Expecting Base64 or URL string

    // Amenities fields
    const AC = req.body["AC"];
    const Furnish = req.body["Furnish"];
    const Gas = req.body["Gas"];
    const Lift = req.body["Lift"];
    const Parking = req.body["Parking"];
    const waterSupply = req.body["Water Supply"];
    const Wifi = req.body["Wifi"];

    // Validate required fields.
    if (
      !address ||
      !pincode ||
      !landmark ||
      !railwayStn ||
      latitude === undefined ||
      longitude === undefined ||
      !price ||
      rooms === undefined ||
      washroom === undefined ||
      !area ||
      !busStop ||
      sale === undefined ||
      !sellerName ||
      !sellerContact ||
      !description
    ) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // Build the amenities map.
    const amenities = {
      AC: Number(AC), // AC is stored as a Number (0 = No, 1 = Yes)
      Furnish: Furnish === "true",
      Gas: Gas === "true",
      Lift: Lift === "true",
      Parking: Parking === "true",
      "Water Supply": waterSupply, // Stored as a String (e.g., "24/7")
      Wifi: Wifi === "true"
    };

    // Create the new property document.
    const newProperty = {
      "3D Model": threeDModel === "true",
      Address: address,
      Pincode: Number(pincode),
      Landmark: landmark,
      "Railway Stn": railwayStn,
      Latitude: Number(latitude),
      Longitude: Number(longitude),
      Price: Number(price),
      Rooms: Number(rooms),
      Washroom: Number(washroom),
      Area: Number(area),
      "Bus Stop": busStop,
      Sale: sale === "true",
      "Seller Name": sellerName,
      "Seller Contact": sellerContact,
      Description: description,
      Image: imageBase64 || "",
      Amenities: amenities
    };

    // Save the document to Firestore.
    const docRef = await db.collection("Properties").add(newProperty);
    console.log("✅ Data saved in Firestore with ID:", docRef.id);

    res.json({ success: true, message: "Property submitted successfully!" });
  } catch (error) {
    console.error("🔥 Error submitting form:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
