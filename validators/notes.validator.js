const Joi = require('joi');
const boom = require('boom');


module.exports.validateAddNote = (req, res, next) => {

    let bodySchema = Joi.object({
        content: Joi.string().required(),
        userId: Joi.string().required(),
    }).unknown();

    Joi.validate(req.body, bodySchema, (err, value) => {

        if (err) {
            next(boom.badRequest(err, {}));
        } else {
            next();
        }
    }
    );
}

module.exports.validateGetAllNotes = (req, res, next) => {

    let bodySchema = Joi.object({
        userId: Joi.string().required(),
    }).unknown();

    Joi.validate(req.params, bodySchema, (err, value) => {

        if (err) {
            next(boom.badRequest(err, {}));
        } else {
            next();
        }
    }
    );
}


module.exports.validateGetArchivedNotes = (req, res, next) => {

    let bodySchema = Joi.object({
        userId: Joi.string().required(),
    }).unknown();

    Joi.validate(req.params, bodySchema, (err, value) => {

        if (err) {
            next(boom.badRequest(err, {}));
        } else {
            next();
        }
    }
    );
}

module.exports.validateGetNotArchivedNotes = (req, res, next) => {

    let bodySchema = Joi.object({
        userId: Joi.string().required(),
    }).unknown();

    Joi.validate(req.params, bodySchema, (err, value) => {

        if (err) {
            next(boom.badRequest(err, {}));
        } else {
            next();
        }
    }
    );
}

// TODO add validation for string id
// Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
module.exports.validateGetNotesById = (req, res, next) => {

    let bodySchema = Joi.object({
        userId: Joi.string().required(),
        id: Joi.string().required(),
    }).unknown();

    Joi.validate(req.params, bodySchema, (err, value) => {

        if (err) {
            next(boom.badRequest(err, {}));
        } else {
            next();
        }
    }
    );
}

// TODO add validation for string id
// Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
module.exports.validateUpdateNote = async (req, res, next) => {

    let bodySchema = Joi.object({
        userId: Joi.string().required(),
        id: Joi.string().required(),
        content: Joi.string().required(),
    }).unknown();

    Joi.validate(req.body, bodySchema, (err, value) => {

        if (err) {
            next(boom.badRequest(err, {}));
        } else {
            next();
        }
    }
    );
}

// TODO add validation for string id
// Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
module.exports.validateArchiveNote = async (req, res, next) => {

    let bodySchema = Joi.object({
        userId: Joi.string().required(),
        id: Joi.string().required(),
    }).unknown();

    Joi.validate(req.body, bodySchema, (err, value) => {

        if (err) {
            next(boom.badRequest(err, {}));
        } else {
            next();
        }
    }
    );
}

// TODO add validation for string id
// Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
module.exports.validateUnArchiveNote = async (req, res, next) => {

    let bodySchema = Joi.object({
        userId: Joi.string().required(),
        id: Joi.string().required(),
    }).unknown();

    Joi.validate(req.body, bodySchema, (err, value) => {

        if (err) {
            next(boom.badRequest(err, {}));
        } else {
            next();
        }
    }
    );
}

// TODO add validation for string id
// Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
module.exports.validateDeleteNote = async (req, res, next) => {

    let bodySchema = Joi.object({
        userId: Joi.string().required(),
        id: Joi.string().required(),
    }).unknown();

    Joi.validate(req.body, bodySchema, (err, value) => {

        if (err) {
            next(boom.badRequest(err, {}));
        } else {
            next();
        }
    }
    );
}