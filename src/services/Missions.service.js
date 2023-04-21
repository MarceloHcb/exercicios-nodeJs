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

const createMission = async (newMissionBody) => {
    const newMission = await MissionsModel.insert(newMissionBody);
    return { type: null, message: newMission };
};

module.exports = {
    getAllMissions,
    findMissionById,
    createMission,
};