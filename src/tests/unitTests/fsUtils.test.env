const { expect } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const { readMissionsData } = require('../../utils/fsUtils');

const mockMissions = JSON.stringify([
    { id: 1, name: 'Terra' },
    { id: 2, name: 'Jupter' },
    { id: 3, name: 'Saturno' },
    { id: 4, name: 'Mercúrio' },
]);

describe('A função readMissionsData', function () { 
    it('retorna um array com todos os elementos do arquivo json', async function () {
        sinon.stub(fs.promises, 'readFile').resolves(mockMissions);
        const missions = await readMissionsData();
        expect(missions).to.be.instanceOf(Array);
        expect(missions).to.have.lengthOf(4);
        sinon.restore();
    });
 });