// Dependencies
const express = require("express");
const path = require("path");

// Sets up the Express App
const app = express();
const PORT = 8080;

// Sets up the Express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var note = [
    {
        title: "daddybob",
        text: "jimmy is a bitch"
    },
    {
        title: "wiejfowie",
        text: "woeijfowiejfoi"
    }
];

// Route to send the notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Route to default to index.html for any unrecoginzed URL additions
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Route to read db.json and return saved notes as JSON
app.get("/api/notes", (req, res) => {
    // res.sendFile(path.join(__dirname, "/db/db.json"));

    res.json(note);
});

// Route to receive new, saved note, add to db.json, and return new note
app.post("/api/notes", (req, res) => {

});

// Route to get ID of note, delete it, and rewrite db.json
app.delete("/api/notes/:id", (req, res) => {

});

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});