const express = require('express');
const path = require('path');

// config
let config = require('../config');


let Note = require('../models/notes.model');
let archiveHelper = require('../helpers/archive.helper');
let fileDeleteHelper = require('../helpers/fileDelete.helper');


let notesRoutes = express.Router();

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


// get all notes of a user
// TODO: add pagination
notesRoutes.route('/:userId').get(function (req, res) {
    let userId = req.params.userId;

    Note.find({ userId: userId }, function (err, notes) {
        if (err) {
            // connecting to db or some other servevr error
            console.log(err);
            res.status(500).send('internal server error');

        } else {
            res.json(notes);
        }
    });
});



// get all archived notes of a user
// TODO: add pagination
notesRoutes.route('/:userId/archived').get(function (req, res) {
    let userId = req.params.userId;

    Note.find({ userId: userId, archived: true }, function (err, notes) {
        if (err) {
            // connecting to db or some other servevr error
            console.log(err);
            res.status(500).send('internal server error');
        } else {
            res.json(notes);
        }
    });
});


// get all notArchived notes of a user
// TODO: add pagination
notesRoutes.route('/:userId/notArchived').get(function (req, res) {
    let userId = req.params.userId;

    Note.find({ userId: userId, archived: false }, function (err, notes) {
        if (err) {
            // connecting to db or some other servevr error
            console.log(err);
            res.status(500).send('internal server error');
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
        if (err) {
            // connecting to db or some other servevr error
            console.log(err);
            res.status(500).send('internal server error');
        }

        // note not found or found note is not belong to the user
        else if (!note || note.userId !== userId)
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
        // note not found or found note is not belong to the user
        if (!note || note.userId !== userId)
            res.status(404).send("note was not found");
        else {

            note.content = req.body.content;
            let saveNote = () => {
                note.save()
                    .then(note => {
                        res.json({
                            note: 'Note updated!',
                            id: note.id
                        });
                    })
                    .catch(err => {
                        res.status(400).send("Update not possible");
                    });
            }

            //if note is already archived update it
            if (note.archived) {
                archiveHelper(note, (err) => {
                    if (err) {
                        res.status(400).send("Update not possible");
                        return;
                    }
                    saveNote()
                })
            }
            else {
                saveNote();
            }

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

            archiveHelper(note, (err) => {
                if (!err) {
                    note.archived = true;

                    note.save()
                        .then(note => {
                            res.json({
                                note: 'Note Archived!',
                                id: note.id
                            });
                        })
                        .catch(err => {
                            res.status(400).send("Update not possible");
                        });

                }
                else {
                    res.status(400).send("Update not possible");
                }
            }
            );
        }
    });
});


// unarchive a note
notesRoutes.route('/unarchive').delete(function (req, res) {
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

            fileDeleteHelper(note, (err) => {
                if (err) {
                    res.status(500).send("File Delete from the system is not possible");
                    return;
                }
                note.archived = false;

                note.save()
                    .then(note => {
                        res.json({
                            note: 'Note unarchived',
                            id: note.id
                        });
                    })
                    .catch(err => {
                        res.status(500).send("Note was not possible");
                    });

            })


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

            fileDeleteHelper(note, (err) => {
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



module.exports = notesRoutes;