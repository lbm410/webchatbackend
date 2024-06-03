const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Crear un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { username, email, passwordHash, role } = req.body;
    const user = new User({ username, email, passwordHash, role });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
