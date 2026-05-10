# Web-Services-App
<!-- This is the project title shown as a top-level heading. -->

## Beginner Glossary

- API: A way for programs to talk to each other over the internet.
- Route/Router: A rule that says “when a request comes to this path, run this code.” See [routes](routes/index.js).
- Middleware: Code that runs between receiving a request and sending a response (e.g., `express.json()` to read JSON bodies).
- Request (`req`): What the client sends to the server (URL, method, headers, body).
- Response (`res`): What the server sends back (status code and any data).
- Status Codes: Numbers that tell how the request went:
	- 200 OK: Success with data
	- 201 Created: New item made
	- 204 No Content: Success, nothing to return
	- 400 Bad Request: The client sent something wrong
	- 404 Not Found: The item doesn’t exist
	- 500 Server Error: The server had a problem
- Environment Variables: Settings stored outside code (like database URLs) in `.env`, read via `process.env`.
- MongoDB: A database storing JSON-like documents in collections.
	- Collection: A group of documents (like a table)
	- Document: One record (like a row), stored as JSON
	- `_id`: Unique identifier for a document
	- `ObjectId`: A special type used for `_id`
- HTTP Methods:
	- GET: Read data
	- POST: Create data
	- PUT: Update/replace data
	- DELETE: Remove data
- JSON: A simple text format to send and receive data.

## File Walkthrough: routes/contacts.js

This file defines the API for managing contacts. See the full code in [routes/contacts.js](routes/contacts.js).

- GET `/contacts`: Returns an array of all contacts from the `contacts` collection.
- GET `/contacts/single?id=<id>`: Returns one contact by its `_id` provided in the query string.
- POST `/contacts`: Validates required fields, inserts a new contact, responds `201` with the new id.
- PUT `/contacts/:id`: Validates the `id` and the body, updates the contact if it exists, responds `204` (no body).
- DELETE `/contacts/:id`: Deletes a contact by `id`, responds `200` if deleted or `404` if not found.
- Validation Helper: `validateContact()` checks that `firstName`, `lastName`, `email`, `favoriteColor`, and `birthday` are present.
- Error Handling: Each write route uses `try/catch` and returns `500` for unexpected errors.

For quick manual testing, see [contacts.rest](contacts.rest) — it includes example requests you can run from VS Code (REST Client extension).

