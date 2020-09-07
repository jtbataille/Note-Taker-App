// Allows for calling appropriate files with app.get with path
const path = require("path");

// Written as a module to export into server.js
module.exports = (app) => {
    
    // Route to send the notes page
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/notes.html"));
    });

    // Route to default to index.html for any unrecoginzed path additions
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/index.html"));
    });
};