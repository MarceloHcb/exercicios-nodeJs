const joi = require('joi');

const idShema = joi.number().integer().min(1).required();

const schemaMissionValues = joi.object({
    id: joi.number().integer().min(1),
  name: joi.string().min(3).required(),
  year: joi.string().min(4).required(),
  country: joi.string().min(3).max(20).required(),
  destination: joi.string().min(2).required(),

});

module.exports = {
    idShema,
    schemaMissionValues,
};