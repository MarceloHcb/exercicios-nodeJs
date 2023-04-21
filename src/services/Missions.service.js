const { MissionsModel } = require('../models');

const getAllMissions = async () => {
    const missions = await MissionsModel.findAll();
    return { type: null, message: missions };
};

const findMissionById = async (missionId) => {
    const mission = await MissionsModel.findById(missionId);
    if (!mission) return { type: 'MISSION_NOT_FOUND', message: 'Mission not found' };
    return { type: null, message: mission };
};

module.exports = {
    getAllMissions,
    findMissionById,
};