const express = require('express');
const path = require('path');

// config
let config = require('../config');


let Note = require('../models/notes.model');
let archiveHelper = require('../helpers/archive.helper');
let fileDeleteHelper = require('../helpers/fileDelete.helper');
let notesValidator = require('../validators/notes.validator');
let notesService = require('../services/notes.service');

let notesRoutes = express.Router();

// add a new note
notesRoutes.route('/add').post(
    notesValidator.validateAddNote,
    notesService.addNote
);


// get all notes of a user
// TODO: add pagination
notesRoutes.route('/:userId').get(
    notesValidator.validateGetAllNotes,
    notesService.getAllNodes
);


// get all archived notes of a user
// TODO: add pagination
notesRoutes.route('/:userId/archived').get(
    notesValidator.validateGetArchivedNotes,
    notesService.getNodesArchived
);


// get all notArchived notes of a user
// TODO: add pagination
notesRoutes.route('/:userId/notArchived').get(
    notesValidator.validateGetNotArchivedNotes,
    notesService.getNodesNotArchived
);


// get a note by id
notesRoutes.route('/:userId/:id').get(
    notesValidator.validateGetNotesById,
    notesService.getNoteById
);

// update note
notesRoutes.route('/update').put(
    notesValidator.validateUpdateNote,
    notesService.updateNoteById
);

// archive a note
notesRoutes.route('/archive').post(
    notesValidator.validateArchiveNote,
    notesService.archiveNoteById
)


// unarchive a note
notesRoutes.route('/unarchive').post(
    notesValidator.validateUnArchiveNote,
    notesService.unArchiveNoteById
)


// delete note
notesRoutes.route('/delete').delete(
    notesValidator.validateDeleteNote,
    notesService.deleteANoteByUserIdandId);



module.exports = notesRoutes;