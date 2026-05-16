// Import the swagger-autogen package.
// Calling it as a function () at the end initializes it and gives us back
// a function we can call later to actually run the generation.
const swaggerAutogen = require("swagger-autogen")();

// This object is the configuration for the documentation page itself.
// Think of it as the "cover page" of your API docs.
const doc = {
  info: {
    title: "Contacts API", // The heading shown at the top of the /api-docs page
    description: "RESTful API for managing contacts in MongoDB", // Subtitle shown under the title
  },

  // The domain where your API lives.
  // Swagger uses this so that when you click "Execute" in the UI,
  // it knows which server to actually send the request to.
  host: "web-services-app.onrender.com",

  // The protocol to use. "https" means secure — required for Render URLs.
  // If you were only running locally you would put "http" here instead.
  schemes: ["https"],

  // Definitions are reusable "shapes" that describe what your data looks like.
  // Instead of copy-pasting the same field list on every route, you define it
  // once here and reference it by name (e.g. $ref: '#/definitions/Contact').
  definitions: {

    // "Contact" describes what a contact looks like when it comes OUT of the database.
    // It includes _id because MongoDB adds that automatically when a document is saved.
    Contact: {
      type: "object",
      properties: {
        _id:           { type: "string", example: "64b1f2c3e4b0a1b2c3d4e5f6" },
        firstName:     { type: "string", example: "Jane" },
        lastName:      { type: "string", example: "Doe" },
        email:         { type: "string", example: "jane@example.com" },
        favoriteColor: { type: "string", example: "blue" },
        birthday:      { type: "string", example: "1990-01-01" },
      },
    },

    // "ContactInput" describes what the user must send IN on a POST or PUT request.
    // No _id here — the user doesn't supply that, MongoDB generates it.
    // "required" tells Swagger which fields must be present (shown with a * in the UI).
    ContactInput: {
      type: "object",
      required: ["firstName", "lastName", "email", "favoriteColor", "birthday"],
      properties: {
        firstName:     { type: "string", example: "Jane" },
        lastName:      { type: "string", example: "Doe" },
        email:         { type: "string", example: "jane@example.com" },
        favoriteColor: { type: "string", example: "blue" },
        birthday:      { type: "string", example: "1990-01-01" },
      },
    },
  },
};

// The file path where the generated documentation will be written.
// This file is what server.js actually loads and serves at /api-docs.
const outputFile = "./swagger-output.json";

// The entry point of your app. swagger-autogen starts here, follows the
// require() calls, finds routes/contacts.js, and reads every router.get/post/put/delete
// it finds — along with any #swagger.* comments inside them.
const endpointsFiles = ["./server.js"];

// Run the generator. It reads your code, combines it with the doc config above,
// and writes everything into swagger-output.json.
// You only need to re-run this file (npm run swagger) if you add or change routes.
swaggerAutogen(outputFile, endpointsFiles, doc);
