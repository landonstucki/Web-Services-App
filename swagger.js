const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "RESTful API for managing contacts in MongoDB",
  },
  host: "web-services-app.onrender.com",
  schemes: ["https"],
  definitions: {
    Contact: {
      type: "object",
      properties: {
        _id: { type: "string", example: "64b1f2c3e4b0a1b2c3d4e5f6" },
        firstName: { type: "string", example: "Jane" },
        lastName: { type: "string", example: "Doe" },
        email: { type: "string", example: "jane@example.com" },
        favoriteColor: { type: "string", example: "blue" },
        birthday: { type: "string", example: "1990-01-01" },
      },
    },
    ContactInput: {
      type: "object",
      required: ["firstName", "lastName", "email", "favoriteColor", "birthday"],
      properties: {
        firstName: { type: "string", example: "Jane" },
        lastName: { type: "string", example: "Doe" },
        email: { type: "string", example: "jane@example.com" },
        favoriteColor: { type: "string", example: "blue" },
        birthday: { type: "string", example: "1990-01-01" },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
