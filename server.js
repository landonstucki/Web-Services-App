// Landon Stucki

const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); // MUST be before anything uses process.env

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const nameRoute = require('./routes');
const contactRoutes = require('./routes/contacts');

app.use('/', nameRoute);
app.use('/contacts', contactRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});