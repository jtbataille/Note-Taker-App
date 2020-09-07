// Dependencies
const express = require("express");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./apiRoutes")(app);
require("./htmlRoutes")(app);

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});