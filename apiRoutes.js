// Allows for use of FS package with writing and reading files
const fs = require("fs");
const { create } = require("domain");

// Ensures each note receives an ID
var notesData = createNoteId();

// Function to create an ID based on the array item's index number
function createNoteId() {
    // Accesses db.json file
    let data = fs.readFileSync("./db/db.json", "utf8");

    // Makes the db.json file into JSON
    let notes = JSON.parse(data);

    // Runs through notes array, adds ID to each note with the same value as the index number
    for (let i = 0; i < notes.length; i++) {
        notes[i].id = "" + i;
    }
    
    // Exits function for creating note
    return notes;
}

// Written as a module to export into server.js
module.exports = (app) => {
    
    // Route to read db.json and show saved notes as JSON
    app.get("/api/notes", (req, res) => {
        
        // Ensures each note retains its create ID within the API in order to be called
        notesData = createNoteId();
        
        // Returns all notes in JSON format
        res.json(notesData);
    });

    // Route to receive new, saved note, add to db.json, and return new note
    app.post("/api/notes", (req, res) => {
        
        // Pushes the req's body into notesData
        notesData.push(req.body);
        
        // Converts req's body into JSON in the db.json file
        fs.writeFileSync("./db/db.json", JSON.stringify(notesData), "utf8");
        
        // Success will return true
        res.json(true);
    });

    // Route to get ID of note, delete it, and rewrite db.json
    app.delete("/api/notes/:id", (req, res) => {
        
        // Pulls ID from URL path as new CONST
        const requestID = req.params.id;

        // Ensures the toDeleteNote from user input match that of the array
        let toDeleteNote = notesData.filter(note => {
            return note.id === requestID;
        })[0];

        // Set a CONST for index relating to toDeleteNote
        const index = notesData.indexOf(toDeleteNote);

        // Removes the note with the matches index number
        notesData.splice(index, 1);

        // Re-writes to the db.json file and turns data into JSON again
        fs.writeFileSync("./db/db.json", JSON.stringify(notesData), "utf8");
        
        // Ends connection w.o response
        res.end("Note deleted.");
    });
};