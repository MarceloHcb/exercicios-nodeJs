const fs = require('fs').promises;
const path = require('path');

const MISSION_DATA_PATH = '../../data/missions.json';

async function readMissionsData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, MISSION_DATA_PATH));
    const missions = JSON.parse(data);
    return missions;
  } catch (error) {
    console.log(`Erro na leitura do arquivo : ${error}`);
  }
  return false;
}

async function whiteNewMissionData(newMission) {
  try {
    const oldMissions = await readMissionsData();
    const newMissionWithId = { id: Date.now(), ...newMission };
    const allMissions = JSON.stringify([...oldMissions, newMissionWithId]);

    await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), allMissions);
    return newMissionWithId;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

async function updateMissionData(id, updatedMissionData) {
  const oldMissions = await readMissionsData();
  const updateMission = { id, ...updatedMissionData };
  const updatedMission = oldMissions.reduce((missionList, currentMission) => {
    if (currentMission.id === updateMission.id) return [...missionList, updateMission];
    return [...missionList, currentMission];
  }, []);
  const updatedData = JSON.stringify(updatedMission);
  try {
    await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), updatedData);
    console.log(`Atualizou missão com o id ${id}`);
    return updateMission;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

async function deleteMissionData(id) {
  const oldMissions = await readMissionsData();
  const updatedMission = oldMissions.filter((currentMission) => currentMission.id !== id);
  const updatedData = JSON.stringify(updatedMission);
  try {
    await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), updatedData);
    console.log(`Deletou a missão com o id ${id}`);
  } catch (error) {
    console.error(`Erro na escrita do arquivo ${error}`);
  }
}

module.exports = {
  readMissionsData,
  whiteNewMissionData,
  updateMissionData,
  deleteMissionData,
};
