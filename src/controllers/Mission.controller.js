const { MissionsService } = require('../services');
const errorMap = require('../utils/errorMap');

const listMissions = async (_req, res) => {
    const { type, message } = await MissionsService.getAllMissions();
    if (type) return res.status(errorMap.mapError(type)).json(message);
    return res.status(200).json(message);
};

const getMissionById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await MissionsService.findMissionById(id);
    if (type) return res.status(errorMap.mapError(type)).json(message);
    return res.status(200).json(message);
};

const createNewMission = async (req, res) => {
    const newMission = req.body;    
    const { type, message } = await MissionsService.createMission(newMission);
    if (type) return res.status(errorMap.mapError(type)).json(message);
    return res.status(201).json(message);
};

const updateMission = async (req, res) => {
    const { id } = req.params;
    const missionData = req.body;
    const { type, message } = await MissionsService.updateMission(id, missionData);
    if (type) return res.status(errorMap.mapError(type)).json(message);
    return res.status(201).json({ missionupdated: { id, ...message } });
};

const deleteMission = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await MissionsService.deleteMission(id);
    if (type) return res.status(errorMap.mapError(type)).json(message);
    return res.status(204).end();
};

module.exports = {
    listMissions,
    getMissionById,
    createNewMission,
    updateMission,
    deleteMission,
};