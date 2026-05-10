const express = require("express"); // Import Express framework
const router = express.Router(); // Create a new router instance
const { getName } = require("../controllers/nameController"); // Import the controller function
router.get("/", getName); // When GET / is requested, run getName

module.exports = router; // Export the router so server.js can mount it
