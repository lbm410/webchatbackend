const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  name: { type: String, required: false }, // Nombre del chat grupal
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
