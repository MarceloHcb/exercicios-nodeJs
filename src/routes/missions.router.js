const express = require('express');
const { MissionController } = require('../controllers');
const { validateMissionID, validateMissionData } = require('../middlewares/validateMissions');

const router = express.Router();

router.get('/', MissionController.listMissions);
router.get('/:id', validateMissionID, MissionController.getMissionById);
router.post('/', validateMissionData, MissionController.createNewMission);
router.put('/:id', validateMissionID, validateMissionData, MissionController.updateMission);
router.delete('/:id', validateMissionID, MissionController.deleteMission);

module.exports = router;
