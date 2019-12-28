const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRoutes = express.Router();
const PORT = 4000;

const path = require('path');

// config
let config = require('./config');

let baseDir = path.join(__dirname, config.db.notesDbPath);

let Note = require('./models/notes.model');
let archiveHelper = require('./helpers/archive.helper');
let fileDeleteHelper = require('./helpers/fileDelete.helper');


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}${config.db.notesDbPath}`, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})


// get all notes of a user
notesRoutes.route('/:userId').get(function (req, res) {
    let userId = req.params.userId;

    Note.find({ userId: userId }, function (err, notes) {
        if (err) {
            console.log(err);
        } else {
            res.json(notes);
        }
    });
});



// get all archived notes of a user
notesRoutes.route('/:userId/archived').get(function (req, res) {
    let userId = req.params.userId;

    Note.find({ userId: userId, archived: true }, function (err, notes) {
        if (err) {
            console.log(err);
        } else {
            res.json(notes);
        }
    });
});

// get all notArchived notes of a user
notesRoutes.route('/:userId/notArchived').get(function (req, res) {
    let userId = req.params.userId;

    Note.find({ userId: userId, archived: false }, function (err, notes) {
        if (err) {
            console.log(err);
        } else {
            res.json(notes);
        }
    });
});


// get a note by id
notesRoutes.route('/:userId/:id').get(function (req, res) {
    let id = req.params.id;
    let userId = req.params.userId;
    Note.findById(id, function (err, note) {
        if (!note || note.userId !== userId)
            res.status(404).send("note was not found");
        else
            res.json(note);
    });
});

// update note
notesRoutes.route('/update').post(function (req, res) {
    const content = req.body.content;
    const userId = req.body.userId;
    const id = req.body.id;

    // missing content or userId
    if (!content || !userId || !id) {
        res.status(400).send('missing content, userId or id');
        return;
    }

    Note.findById(id, function (err, note) {
        if (!note)
            res.status(404).send("note was not found");
        else if (note.userId !== userId)
            res.status(404).send("note was not found");
        else {
            note.content = req.body.content;


            //if note is already archived update it
            archiveHelper(baseDir, note, (err) => {
                if (err) {
                    res.status(400).send("Update not possible");
                    return;
                }
                note.save()
                    .then(note => {
                        res.json('Note updated!');
                    })
                    .catch(err => {
                        res.status(400).send("Update not possible");
                    });


            })

        }
    });
});

// archive a note
notesRoutes.route('/archive').post(function (req, res) {
    const userId = req.body.userId;
    const id = req.body.id;

    // missing userId or id
    if (!userId || !id) {
        res.status(400).send('missing userId or id');
        return;
    }

    Note.findById(id, function (err, note) {
        if (!note)
            res.status(404).send("note was not found");
        else if (note.userId !== userId)
            res.status(404).send("note was not found");
        else {

            archiveHelper(baseDir, note, (err) => {
                if (!err) {
                    note.archived = true;

                    note.save()
                        .then(note => {
                            res.json('Note Archived!');
                        })
                        .catch(err => {
                            res.status(400).send("Update not possible");
                        });
                    console.log(`${baseDir}+${id}.txt Saved `);

                }
                else {
                    res.status(400).send("Update not possible");
                }
            }
            );





        }
    });
});


// delete note
notesRoutes.route('/delete').delete(function (req, res) {
    const userId = req.body.userId;
    const id = req.body.id;

    // missing content or userId
    if (!userId || !id) {
        res.status(400).send('missing userId or id');
        return;
    }

    Note.findById(id, function (err, note) {
        if (!note)
            res.status(404).send("note was not found");
        else if (note.userId !== userId)
            res.status(404).send("note was not found");
        else {

            fileDeleteHelper(baseDir, note, (err) => {
                if (err) {
                    res.status(400).send("File Delete from the system is not possible");
                    return;
                }
                note.deleteOne()
                    .then(note => {
                        res.json('Note Deleted!');
                    })
                    .catch(err => {
                        res.status(400).send("Delete not possible");
                    });

            })


        }
    });
});

// add a new note
notesRoutes.route('/add').post(function (req, res) {
    const content = req.body.content;
    const userId = req.body.userId;

    // missing content or userId
    if (!content || !userId) {
        res.status(400).send('missing content or userId');
        return;
    }

    let note = new Note({
        content: content,
        userId: userId,
        archived: false
    });

    note.save()
        .then(note => {
            res.status(200).json({
                'note': 'note added successfully',
                'id': note.id
            });
        })
        .catch(err => {
            res.status(400).send('adding new note failed');
        });
});

app.use('/notes', notesRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});