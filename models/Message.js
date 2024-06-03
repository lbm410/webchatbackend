const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Chat' },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
  mediaUrl: { type: String, default: null }
});

module.exports = mongoose.model('Message', messageSchema);
