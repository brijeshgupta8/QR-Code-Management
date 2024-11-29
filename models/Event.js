const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    qrCode: { type: mongoose.Schema.Types.ObjectId, ref: 'QRCode', required: true },
    timestamp: { type: Date, default: Date.now },
    location: { type: String },
    device: { type: String },
});

module.exports = mongoose.model('Event', eventSchema);
