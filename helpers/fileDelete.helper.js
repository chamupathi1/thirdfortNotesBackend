var fs = require('fs');
var getFilepath = require('./getFilePath');

const fileDeleteHelper = (baseDir, note, next) => {
    try {
        const path = getFilepath(baseDir, note);
        fs.unlinkSync(path)
        next();
    } catch (err) {
        console.error(err)
        next(err);
    }

}

module.exports = fileDeleteHelper;