const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Enviar un mensaje
router.post('/send', async (req, res) => {
  try {
    const { chatId, senderId, content, type, mediaUrl } = req.body;
    const message = new Message({ chatId, senderId, content, type, mediaUrl });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener mensajes de un chat
router.get('/chat/:chatId', async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
