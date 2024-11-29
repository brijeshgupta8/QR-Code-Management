const express = require('express');
const QRCode = require('qrcode');
const QRCodeModel = require('../models/QRCode');
const { authenticate } = require('../utils/authMiddleware');
const Event = require('../models/Event');

const router = express.Router();

// Get QR Codes Owned by the Logged-In User
router.get('/my-codes', authenticate, async (req, res) => {
    try {
        // Fetch all QR codes created by the logged-in user
        const qrCodes = await QRCodeModel.find({ user: req.user._id });
        res.status(200).json({ qrCodes });
    } catch (err) {
        console.error('Error fetching user QR codes:', err.message);
        res.status(500).json({ message: 'Error fetching QR codes' });
    }
});

// Track Event
router.post('/:id/track', async (req, res) => {
    const { id } = req.params;
    const { location, device } = req.body;

    const qrCode = await QRCodeModel.findById(id);
    if (!qrCode) return res.status(404).json({ message: 'QR Code not found' });

    const event = new Event({ qrCode: id, location, device });
    await event.save();

    res.json({ message: 'Event tracked successfully' });
});

// Get Events
router.get('/:id/events', authenticate, async (req, res) => {
    const { id } = req.params;

    const qrCode = await QRCodeModel.findById(id);
    if (!qrCode || qrCode.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const events = await Event.find({ qrCode: id });
    res.json({ events });
});


// Generate Static QR Code
router.post('/static', authenticate, async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    try {
        const qrImage = await QRCode.toDataURL(url); // Generate QR code as a Base64 string
        res.json({ qrImage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error generating QR code' });
    }
});


// Generate Dynamic QR Code
router.post('/dynamic', authenticate, async (req, res) => {
    const { url, metadata } = req.body;
    const qrCode = new QRCodeModel({ user: req.user._id, url, metadata, isDynamic: true });
    await qrCode.save();

    const qrImage = await QRCode.toDataURL(url);
    res.json({ qrImage, id: qrCode._id });
});

// Update Dynamic QR Code
router.put('/:id/update', authenticate, async (req, res) => {
    const { id } = req.params;
    const { url } = req.body;

    const qrCode = await QRCodeModel.findById(id);
    if (!qrCode || qrCode.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    qrCode.history.push({ timestamp: new Date(), url: qrCode.url });
    qrCode.url = url;
    await qrCode.save();

    res.json({ message: 'QR Code updated successfully' });
});

module.exports = router;
