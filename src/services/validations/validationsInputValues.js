const { idShema } = require('./schemas');

const validateId = (id) => {
    const { error } = idShema.validate(id);
    if (error) return { type: 'INVALIDE_VALUE', message: '"id" must be a number' };
    return { type: null, message: '' };
};

module.exports = {
    validateId,
};