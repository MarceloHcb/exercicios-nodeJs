const readline = require('readline-sync');
const { whiteNewMissionData } = require('./utils/fsUtils');

async function main() {
  const name = readline.question('Qual é o nome do Planeta: ');

  const newMission = { name };
  whiteNewMissionData(newMission);
  console.log('Nova missão registrada com sucesso');
//   whiteNewMissionData({
//     planet6: 'Urano',
//   });
}

main();
