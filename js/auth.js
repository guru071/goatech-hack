const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// This creates the correct address to your file
const dbPath = path.join(__dirname, '/data/students.db'); 

// Open the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error("Could not open database:", err.message);
    }
    console.log("Connected to the database successfully!");
});

// Perform the SELECT operation
db.all("SELECT* from students;", [], (err, rows) => {
    if (err) {
        console.error("SQL Error:", err.message);
        return;
    }
    
    // This will print your data in the terminal
    
    });


db.close();