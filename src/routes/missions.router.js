const express = require('express');
const { MissionController } = require('../controllers');

const router = express.Router();

router.get('/', MissionController.listMissions);
router.get('/:id', MissionController.getMissionById);
router.post('/', MissionController.createNewMission);

module.exports = router;
