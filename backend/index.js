const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

dotenv.config()

// Connect to MongoDB
const dbLink = process.env.LINK
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
    enduser: String
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

app.post('/api/reports', async (req, res) => {
    const report = new Report({
        moduleNumber: req.body.moduleNumber,
        startingPointNE: req.body.startingPointNE,
        startingPointName: req.body.startingPointName,
        startingPointLink: req.body.startingPointLink,
        endingPointNE: req.body.endingPointNE,
        endingPointName: req.body.endingPointName,
        endingPointLink: req.body.endingPointLink,
        title: req.body.title,
        routes: req.body.routes,
        recommendations: req.body.recommendations,
        surveyMonth: req.body.surveyMonth,
        surveyYear: req.body.surveyYear,
        client: req.body.client,
        enduser: req.body.enduser
    });
    try {
        const newReport = await report.save();
        res.status(201).json(newReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/reports/:id', async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Report not found' });

        report.moduleNumber = req.body.moduleNumber || report.moduleNumber;
        report.startingPointNE = req.body.startingPointNE || report.startingPointNE;
        report.startingPointName = req.body.startingPointName || report.startingPointName;
        report.startingPointLink = req.body.startingPointLink || report.startingPointLink;
        report.endingPointNE = req.body.endingPointNE || report.endingPointNE;
        report.endingPointName = req.body.endingPointName || report.endingPointName;
        report.endingPointLink = req.body.endingPointLink || report.endingPointLink;
        report.title = req.body.title || report.title;
        report.routes = req.body.routes || report.routes;
        report.recommendations = req.body.recommendations || report.recommendations;
        report.surveyMonth = req.body.surveyMonth || report.surveyMonth;
        report.surveyYear = req.body.surveyYear || report.surveyYear;
        report.client = req.body.client || report.client;
        report.enduser = req.body.enduser || report.enduser;

        const updatedReport = await report.save();
        res.json(updatedReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/reports/:id', async (req, res) => {
    try {
        const deletedReport = await Report.findByIdAndDelete(req.params.id);
        if (!deletedReport) return res.status(404).json({ message: 'Report not found' });
        res.json({ message: 'Report deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
