const express = require('express');
const { findAll, insert, update, deleteMission, findById } = require('./db/missionsDb');

const app = express();
app.use(express.json());

const validateMissionID = (req, res, next) => {
  const { id } = req.params;
  const idAsNumber = Number(id);
  if (Number.isNaN(idAsNumber)) {
    res.status(400).send({ message: 'ID inválido! Precisa ser um número' });
  } else {
    next();
  }
};

const validateMissionData = (req, res, next) => {
  const requiredProperties = ['name'];
  if (requiredProperties.every((property) => property in req.body)) {
   return next();
  } 
   return res.status(400)
    .send({ message: `A missão precisa receber o(os) atributo(os) ${requiredProperties
    .map((required) => required)}` });
};

app.get('/missions', async (_requisition, response) => {
  // const missions = await readMissionsData();
  const missions = await findAll();
  return response.status(200).json({ missions });
});

app.get('/missions/:id', async (req, res) => {
  const { id } = req.params;
  const mission = await findById(id);
  return res.status(200).json(mission);
});

app.post('/missions', validateMissionData, async (req, res) => {
  const newMission = req.body;
  // const newMissionWithId = await whiteNewMissionData(newMission);
  const newMissionWithId = await insert(newMission);
  return res.status(201).json({ mission: newMissionWithId });
});

app.put('/missions/:id', validateMissionID, validateMissionData, async (req, res) => {
  const { id } = req.params;
  const updatedMissionData = req.body;
  console.log(updatedMissionData);
  // const updatedMission = await updateMissionData(Number(id), updatedMissionData);
  const updatedMission = await update(id, updatedMissionData);
  return res.status(201).json({ mission: updatedMission });
});

app.delete('/missions/:id', validateMissionID, async (req, res) => {
    const { id } = req.params;
    // await deleteMissionData(Number(id));
    await deleteMission(id);
    return res.status(204).end();
});

module.exports = app;
