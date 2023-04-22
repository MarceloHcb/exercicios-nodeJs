const joi = require('joi');

const idShema = joi.number().integer().min(1).required();

module.exports = {
    idShema,
};