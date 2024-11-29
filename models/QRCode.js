const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true },
    isDynamic: { type: Boolean, default: false },
    metadata: { type: Object },
    history: [{ timestamp: Date, url: String }],
});

module.exports = mongoose.model('QRCode', qrCodeSchema);
