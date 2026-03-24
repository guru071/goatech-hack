const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors'); // Install this: npm install cors

const app = express();
app.use(express.json());
app.use(cors());

// Correct path to your DB (since server.js is in /college)
const dbPath = path.join(__dirname, 'data', 'students.db');
const db = new sqlite3.Database(dbPath);

app.post('/login', (req, res) => {
    const { enroll, dob } = req.body;

    // Use a specific query for better performance/security
    const sql = "SELECT * FROM student WHERE enroll = ? AND student_dob = ?";
    
    db.get(sql, [enroll, dob], (err, row) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        
        if (row) {
            res.json({ success: true, user: row });
        } else {
            res.json({ success: false, message: "Invalid Enrollment or DOB" });
        }
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));