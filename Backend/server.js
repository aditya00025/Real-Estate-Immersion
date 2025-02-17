const express = require("express");
const cors = require("cors");
const appdata = require("./Appdata"); // Import the route module

const app = express();
app.use(cors());
app.use(express.json());

// Use the appdata routes; the /submit-form route will be available at http://localhost:5000/submit-form
app.use("/", appdata);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

