const path = require('path');

// config
let config = require('./config');

let baseDir = path.join(__dirname, config.db.notesDbPath);

const getFilepath = (note) => baseDir + `/${note.id}.zip`;

module.exports = getFilepath;
