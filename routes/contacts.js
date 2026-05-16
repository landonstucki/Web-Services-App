const express = require("express"); // Import Express to create a router
const router = express.Router(); // Create a Router to group related routes
const connectDB = require("../db/connect"); // Helper to get a connected MongoDB database
const { ObjectId } = require("mongodb"); // ObjectId type used for MongoDB document IDs

// GET all contacts
router.get("/", async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get all contacts'
    #swagger.description = 'Returns an array of every contact in the database.'
    #swagger.responses[200] = {
      description: 'Array of contact objects',
      schema: [{ $ref: '#/definitions/Contact' }]
    }
  */
  // Handle GET /contacts
  const db = await connectDB(); // Connect to the database
  const contacts = await db.collection("contacts").find().toArray(); // Fetch all docs in 'contacts' as an array
  res.json(contacts); // Send the array back as JSON
});

// GET single contact
router.get("/single", async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get a contact by ID'
    #swagger.description = 'Returns a single contact matching the provided MongoDB _id query parameter.'
    #swagger.parameters['id'] = {
      in: 'query',
      description: 'MongoDB ObjectId of the contact',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'A single contact object',
      schema: { $ref: '#/definitions/Contact' }
    }
    #swagger.responses[404] = { description: 'Contact not found' }
  */
  // Handle GET /contacts/single?id=<id>
  const db = await connectDB(); // Ensure we have a DB connection
  const id = req.query.id; // Read the id from the query string

  const contact = await db
    .collection("contacts") // Use the 'contacts' collection
    .findOne({ _id: new ObjectId(id) }); // Find a single document by its _id

  res.json(contact); // Return the found contact (or null if not found)
});

// Helper: validate required contact fields
function validateContact(body) {
  // Check the request body for required fields
  const required = [
    // List of keys every contact should include
    "firstName",
    "lastName",
    "email",
    "favoriteColor",
    "birthday",
  ];
  const missing = required.filter(
    // Build a list of any missing or empty fields
    (k) => !body || body[k] === undefined || body[k] === null || body[k] === "",
  );
  return { ok: missing.length === 0, missing, required }; // ok is true when nothing is missing
}

// POST create contact
router.post("/", async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Create a new contact'
    #swagger.description = 'Adds a new contact document to the database.'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Contact data',
      required: true,
      schema: { $ref: '#/definitions/ContactInput' }
    }
    #swagger.responses[201] = { description: 'Contact created — returns the new document id' }
    #swagger.responses[400] = { description: 'Missing required fields' }
  */
  // Handle POST /contacts to add a new contact
  try {
    const { ok, missing } = validateContact(req.body); // Validate incoming data
    if (!ok) {
      // If required fields are missing
      return res
        .status(400) // 400 = bad request
        .json({ message: "Missing required fields", missing }); // Explain what is missing
    }

    const db = await connectDB(); // Get database connection
    const result = await db.collection("contacts").insertOne(req.body); // Insert the new document
    return res.status(201).json({ id: result.insertedId }); // 201 Created with new id
  } catch (err) {
    console.error("POST /contacts error", err); // Log the error for debugging
    return res.status(500).json({ message: "Internal Server Error" }); // 500 = server error
  }
});



// PUT update contact by id
router.put("/:id", async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Update a contact by ID'
    #swagger.description = 'Replaces the fields of an existing contact identified by its MongoDB _id.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ObjectId of the contact to update',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated contact data',
      required: true,
      schema: { $ref: '#/definitions/ContactInput' }
    }
    #swagger.responses[204] = { description: 'Contact updated successfully' }
    #swagger.responses[400] = { description: 'Invalid id or missing required fields' }
    #swagger.responses[404] = { description: 'Contact not found' }
  */
  // Handle PUT /contacts/:id to update a contact
  try {
    const id = req.params.id; // Read id from the URL path
    if (!ObjectId.isValid(id)) {
      // Make sure id is a valid MongoDB ObjectId
      return res.status(400).json({ message: "Invalid id" }); // If not, tell the client
    }

    const { ok, missing } = validateContact(req.body); // Validate the new data
    if (!ok) {
      // If required fields are missing
      return res
        .status(400)
        .json({ message: "Missing required fields", missing });
    }

    const db = await connectDB(); // Connect to DB
    const result = await db
      .collection("contacts") // Choose collection
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body }); // Update only the specified fields

    if (result.matchedCount === 0) {
      // No existing contact matched that id
      return res.status(404).json({ message: "Contact not found" }); // Tell the client it's missing
    }

    // 204 No Content on successful update
    return res.status(204).send(); // Success with no response body
  } catch (err) {
    console.error("PUT /contacts/:id error", err); // Log error details
    return res.status(500).json({ message: "Internal Server Error" }); // Generic server error response
  }
});

// DELETE contact by id
router.delete("/:id", async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Delete a contact by ID'
    #swagger.description = 'Permanently removes the contact with the given MongoDB _id from the database.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ObjectId of the contact to delete',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = { description: 'Contact deleted successfully' }
    #swagger.responses[400] = { description: 'Invalid id format' }
    #swagger.responses[404] = { description: 'Contact not found' }
  */
  // Handle DELETE /contacts/:id to remove a contact
  try {
    const id = req.params.id; // Read id from the URL path
    if (!ObjectId.isValid(id)) {
      // Validate id format
      return res.status(400).json({ message: "Invalid id" }); // If invalid, stop here
    }

    const db = await connectDB(); // Connect to DB
    const result = await db
      .collection("contacts") // Choose collection
      .deleteOne({ _id: new ObjectId(id) }); // Delete the document with this _id

    if (result.deletedCount === 0) {
      // Nothing was deleted
      return res.status(404).json({ message: "Contact not found" }); // The id didn't match any contact
    }

    return res.status(200).json({ message: "Contact deleted" }); // Confirm deletion
  } catch (err) {
    console.error("DELETE /contacts/:id error", err); // Log any errors
    return res.status(500).json({ message: "Internal Server Error" }); // Server error response
  }
});

module.exports = router; // Export this router so server.js can mount it at /contacts
