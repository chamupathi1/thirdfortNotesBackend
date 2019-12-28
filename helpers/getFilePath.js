const getFilepath = (baseDir, note) => baseDir + `${note.id}.zip`;

module.exports = getFilepath;
