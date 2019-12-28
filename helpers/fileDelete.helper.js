var fs = require('fs');
var getFilepath = require('../getFilePath');

const fileDeleteHelper = (note, next) => {
    try {
        const path = getFilepath(note);
        fs.unlinkSync(path)
        next();
    } catch (err) {
        console.error(err)
        next(err);
    }

}

module.exports = fileDeleteHelper;