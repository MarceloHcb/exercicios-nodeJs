const { MissionsModel } = require('../../models');
const { idShema, schemaMissionValues } = require('./schemas');

const validateId = (id) => {
    const { error } = idShema.validate(id);
    if (error) return { type: 'INVALIDE_VALUE', message: '"id" must be a number' };
    return { type: null, message: '' };
};

const validateInputValues = async (newMission) => {
    const { error } = schemaMissionValues.validate(newMission);
    if (error) return { type: 'INVALID_DATA_VALUE', message: error.message };
    
    if (newMission.id) {
        const duplicateId = await MissionsModel.findById(newMission.id);

        if (duplicateId.length !== 0) {        
     return { type: 'DUPLICATE_ID', 
            message: 'Já possui uma missão com esse id' }; 
    } 
    }
    return { type: null, message: '' };
};

module.exports = {
    validateId,
    validateInputValues,   
};