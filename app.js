require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const qrRoutes = require('./routes/qr');
const analyticsRoutes = require('./routes/analytics');

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/qr', qrRoutes);
app.use('/analytics', analyticsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
