const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Message = require('../models/Message');

// Crear un nuevo chat
router.post('/create', async (req, res) => {
  try {
    const { participants } = req.body;
    const chat = new Chat({ participants });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todos los chats de un usuario
router.get('/user/:userId', async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.params.userId }).sort({ 'lastMessage.createdAt': -1 });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
