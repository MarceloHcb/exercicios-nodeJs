const { readMissionsData, whiteNewMissionData } = require('./utils/fsUtils');

async function main() {
  whiteNewMissionData({
    planet6: 'Urano',
  });
}

main();
