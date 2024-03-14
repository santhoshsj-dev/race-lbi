const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

dotenv.config();

// Connect to MongoDB
const dbLink = process.env.LINK;
mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const reportSchema = new mongoose.Schema({
    moduleNumber: String,
    startingPointNE: String,
    startingPointName: String,
    startingPointLink: String,
    endingPointNE: String,
    endingPointName: String,
    endingPointLink: String,
    title: String,
    routes: String,
    recommendations: String,
    surveyMonth: String,
    surveyYear: String,
    client: String,
    enduser: String,
    directory: String
});

// Define Model
const Report = mongoose.model('Report', reportSchema);

// Routes
app.get('/api/reports', async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/reports/:id', async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json(report);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/reports', async (req, res) => {
    const report = new Report(req.body); // Ensure that the req.body contains the directory field
    try {
        const newReport = await report.save();
        res.status(201).json(newReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.put('/api/reports/:id', async (req, res) => {
    try {
        const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json(report);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/reports/:id', async (req, res) => {
    try {
        const deletedReport = await Report.findByIdAndDelete(req.params.id);
        if (!deletedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json({ message: 'Report deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
    next(); // Call next to ensure proper error handling flow
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
