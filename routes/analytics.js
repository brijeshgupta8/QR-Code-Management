const express = require('express');
const Event = require('../models/Event');
const QRCodeModel = require('../models/QRCode');
const { authenticate } = require('../utils/authMiddleware');

const router = express.Router();

// Get Analytics
router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    const qrCode = await QRCodeModel.findById(id);
    if (!qrCode || qrCode.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    // Aggregated data
    const totalScans = await Event.countDocuments({ qrCode: id });
    const uniqueDevices = await Event.distinct('device', { qrCode: id });
    const events = await Event.find({ qrCode: id }).sort({ timestamp: 1 });

    const scansPerDay = events.reduce((acc, event) => {
        const day = event.timestamp.toISOString().split('T')[0];
        acc[day] = (acc[day] || 0) + 1;
        return acc;
    }, {});

    res.json({
        totalScans,
        uniqueDevices: uniqueDevices.length,
        scansPerDay,
    });
});

module.exports = router;
