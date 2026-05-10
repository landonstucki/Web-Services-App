// Landon Stucki // Project author/owner

const express = require("express"); // Import the Express web framework
const dotenv = require("dotenv"); // Import dotenv to load environment variables from a .env file

dotenv.config(); // MUST be before anything uses process.env (loads .env into process.env)

const app = express(); // Create an Express application instance
const port = process.env.PORT || 3000; // Use PORT from env or default to 3000

// Middleware
app.use(express.json()); // Parse incoming request bodies as JSON

// Routes
const nameRoute = require("./routes"); // Import the root (/) router
const contactRoutes = require("./routes/contacts"); // Import the /contacts router

app.use("/", nameRoute); // Mount root routes at the base path
app.use("/contacts", contactRoutes); // Mount contacts routes under /contacts

// Start server
app.listen(port, () => {
  // Start the HTTP server listening on the chosen port
  console.log(`Server running at http://localhost:${port}/`); // Log a helpful startup message
});
