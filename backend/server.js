const express = require('express');
const cors = require('cors');
const db = require('./db');
const { Parser } = require('json2csv');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ SAVE WEATHER DATA
app.use(express.static(path.join(__dirname, '../frontend')));
app.post('/save', (req, res) => {
    console.log("DATA RECEIVED:", req.body);

    const { city, temp, humidity, pressure, wind, desc } = req.body;

    const sql = `
        INSERT INTO weather_history 
        (city, temperature, humidity, pressure, wind_speed, description)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [city, temp, humidity, pressure, wind, desc], (err, result) => {
        if (err) {
            console.log("DB ERROR:", err);
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ message: "Saved successfully" });
    });
});

// ✅ GET DATA
app.get('/data', (req, res) => {
    db.query("SELECT * FROM weather_history", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// ✅ EXPORT CSV
app.get('/export/csv', (req, res) => {
    db.query("SELECT * FROM weather_history", (err, data) => {
        if (err) return res.status(500).json(err);

        const parser = new Parser();
        const csv = parser.parse(data);

        res.header('Content-Type', 'text/csv');
        res.attachment('weather.csv');
        res.send(csv);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});