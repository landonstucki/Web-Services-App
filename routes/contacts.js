const express = require('express');
const router = express.Router();
const connectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET all contacts
router.get('/', async (req, res) => {
  const db = await connectDB();
  const contacts = await db.collection('contacts').find().toArray();
  res.json(contacts);
});

// GET single contact
router.get('/single', async (req, res) => {
  const db = await connectDB();
  const id = req.query.id;

  const contact = await db
    .collection('contacts')
    .findOne({ _id: new ObjectId(id) });

  res.json(contact);
});

module.exports = router;