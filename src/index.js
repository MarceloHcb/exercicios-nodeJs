const readline = require('readline-sync');
const { whiteNewMissionData, readMissionsData } = require('./utils/fsUtils');

async function main() {
  const name = readline.question('Qual é o nome do Planeta: ');
  const year = readline.question('Qual ano da Missão: ');
  const country = readline.question('Qual país: ');
  const destination = readline.question('Qual o destino: ');

  const newMission = { 
    name,
    year,
    country,
    destination,
   };

  whiteNewMissionData(newMission);
  console.log('Nova missão registrada com sucesso');
  const total = readline.question('Gostaria de um relatório das missões? (y,n)');
   if (total === 'y') {
    const missions = await readMissionsData();
    console.log(missions);
   } 
    return false;
}

main();
