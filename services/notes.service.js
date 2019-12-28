


let Note = require('../models/notes.model');
const boom = require('boom');

let archiveHelper = require('../helpers/archive.helper');
let fileDeleteHelper = require('../helpers/fileDelete.helper');


module.exports.addNote = async (req, res, next) => {
    const content = req.body.content;
    const userId = req.body.userId;

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
            next(boom.internal(error))
        });
}


module.exports.getAllNodes = async (req, res, next) => {
    let userId = req.params.userId;

    Note.find({ userId: userId }, function (err, notes) {
        if (err) {
            next(boom.internal(error))
        } else {
            res.json(notes);
        }
    });
}

module.exports.getNodesArchived = async (req, res, next) => {
    let userId = req.params.userId;

    Note.find({ userId: userId, archived: true }, function (err, notes) {
        if (err) {
            next(boom.internal(error))
        } else {
            res.json(notes);
        }
    });
}

module.exports.getNodesNotArchived = async (req, res, next) => {
    let userId = req.params.userId;

    Note.find({ userId: userId, archived: false }, function (err, notes) {
        if (err) {
            next(boom.internal(error))
        } else {
            res.json(notes);
        }
    });
}

module.exports.getNoteById = (req, res, next) => {
    let id = req.params.id;
    let userId = req.params.userId;

    Note.findById(id, function (err, note) {
        if (err) {
            next(boom.notFound())
        }

        // note not found or found note is not belong to the user
        else if (!note || note.userId !== userId)
            next(boom.notFound())

        else
            res.json(note);
    });
}

module.exports.updateNoteById = (req, res, next) => {
    const content = req.body.content;
    const userId = req.body.userId;
    const id = req.body.id;

    Note.findById(id, function (err, note) {
        // note not found or found note is not belong to the user
        if (!note || note.userId !== userId)
            next(boom.notFound())
        else {

            note.content = content;

            let saveNote = () => {
                note.save()
                    .then(note => {
                        res.json({
                            note: 'Note updated!',
                            id: note.id
                        });
                    })
                    .catch(err => {
                        next(boom.internal(err))

                    });
            }

            //if note is already archived update it
            if (note.archived) {
                archiveHelper(note, (err) => {
                    if (err) {
                        next(boom.internal(err))
                    }
                    saveNote()
                })
            }
            else {
                saveNote();
            }

        }
    });
}

module.exports.archiveNoteById = (req, res, next) => {
    const userId = req.body.userId;
    const id = req.body.id;

    Note.findById(id, function (err, note) {
        if (!note)
            next(boom.notFound())

        else if (note.userId !== userId)
            next(boom.notFound())

        else if (note.archived) {
            next(boom.badRequest("note is already archived"))
        }

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
                            next(boom.internal(err))
                        });

                }
                else {
                    next(boom.internal(err))
                }
            }
            );
        }
    });
}



module.exports.unArchiveNoteById = async (req, res, next) => {
    const userId = req.body.userId;
    const id = req.body.id;


    Note.findById(id, function (err, note) {
        if (!note)
            next(boom.notFound())

        else if (note.userId !== userId)
            next(boom.notFound())

        else if (!note.archived) {
            next(boom.badRequest("note is not archived"))
        }

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
}

module.exports.deleteANoteByUserIdandId = async (req, res, next) => {
    const userId = req.body.userId;
    const id = req.body.id;

    Note.findById(id, function (err, note) {

        let deleteNote = () =>
            note.deleteOne()
                .then(note => {
                    res.json({
                        note: 'Note Deleted!',
                        id: note.id
                    });
                })
                .catch(err => {
                    next(boom.internal(err))
                });

        if (!note)
            next(boom.notFound())

        else if (note.userId !== userId)
            next(boom.notFound())

        // if the note is archived, delete it first
        else if (note.archived) {
            fileDeleteHelper(note, (err) => {
                if (err) {
                    next(boom.internal(err))
                }
                else {
                    deleteNote()
                }
            })
        }
        else {
            deleteNote()
        }

    });
}
