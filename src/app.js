const express = require('express');
const {
  readMissionsData,
  whiteNewMissionData,
  updateMissionData,
  deleteMissionData,
} = require('./utils/fsUtils');

const app = express();
app.use(express.json());

app.get('/missions', async (_requisition, response) => {
  const missions = await readMissionsData();
  return response.status(200).json({ missions });
});

app.post('/missions', async (req, res) => {
  const newMission = req.body;
  const newMissionWithId = await whiteNewMissionData(newMission);
  return res.status(201).json({ mission: newMissionWithId });
});

const validateMissionID = (req, res, next) => {
  const { id } = req.params;
  const idAsNumber = Number(id);
  if (Number.isNaN(idAsNumber)) {
    res.status(400).send({ message: 'ID inválido! Precisa ser um número' });
  } else {
    next();
  }
};

app.put('/missions/:id', validateMissionID, async (req, res) => {
  const { id } = req.params;
  const updatedMissionData = req.body;
  const updatedMission = await updateMissionData(Number(id), updatedMissionData);
  return res.status(201).json({ mission: updatedMission });
});

app.delete('/missions/:id', validateMissionID, async (req, res) => {
    const { id } = req.params;
    await deleteMissionData(Number(id));

    return res.status(204).end();
});

module.exports = app;
