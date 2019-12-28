const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


// config
let config = require('./config');

// routes imports
let notesRoutes = require('./routes/notesRoutes');


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}${config.db.notesDbPath}`, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.use('/notes', notesRoutes);

app.listen(config.serverPort, function () {
    console.log("Server is running on Port: " + config.serverPort);
});