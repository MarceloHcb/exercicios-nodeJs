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

const updateMission = async (id, updateData) => {
    const updatedMissionData = await MissionsModel.update(id, updateData);
    return { type: null, message: updatedMissionData };
};

const deleteMission = async (id) => {
    const delectedMission = await MissionsModel.deleteMission(id);
    return { type: null, message: delectedMission };
};

module.exports = {
    getAllMissions,
    findMissionById,
    createMission,
    deleteMission,
    updateMission,
};