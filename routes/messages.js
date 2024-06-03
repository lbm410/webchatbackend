const express = require('express');
const Message = require('../models/Message');
const Chat = require('../models/Chat');
const router = express.Router();

// Enviar un mensaje
router.post('/send', async (req, res) => {
  const { chatId, senderId, content, type, mediaUrl } = req.body;
  if (!chatId || !senderId || !content) {
    return res.status(400).json({ error: 'chatId, senderId, and content are required' });
  }
  
  try {
    const message = new Message({ chatId, senderId, content, type, mediaUrl });
    await message.save();
    await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener mensajes de un chat
router.get('/chat/:chatId', async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId }).populate('senderId');
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
