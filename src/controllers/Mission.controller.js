const { MissionsService } = require('../services');
const { errorMap } = require('../utils/errorMap');

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

module.exports = {
    listMissions,
    getMissionById,
};