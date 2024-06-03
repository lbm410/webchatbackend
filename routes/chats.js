const express = require('express');
const Chat = require('../models/Chat');
const User = require('../models/User');
const router = express.Router();

// Crear un nuevo chat
router.post('/create', async (req, res) => {
  const { participants } = req.body;
  try {
    const users = await User.find({ username: { $in: participants } });
    const chat = new Chat({ participants: users.map(user => user._id) });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los chats
router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find().populate('participants');
    res.json(chats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
