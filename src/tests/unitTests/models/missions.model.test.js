const { expect } = require('chai');
const sinon = require('sinon');
const { MissionsModel } = require('../../../models');
const connection = require('../../../models/connection');
const { missionsMock, newMissionMock } = require('../unitMock/unitMock');

describe('Missions Model', function () {
    describe('Lista todas as missões', function () {
        it('Testa o recebimento do array de missões', async function () {
            sinon.stub(connection, 'execute').resolves([missionsMock]);
            const result = await MissionsModel.findAll();            
            expect(result).to.be.a('array');
            expect(result).to.be.equal(missionsMock);
            sinon.restore();
        });
         it('Busca uma missão pelo ID', async function () {
            sinon.stub(connection, 'execute').resolves([missionsMock[0]]);
            const result = await MissionsModel.findById(1);            
            expect(result).to.be.deep.equal(missionsMock[0]);
            sinon.restore();
         });
         it('Cadastrando uma missão', async function () {
            sinon.stub(connection, 'execute').resolves([newMissionMock]);
            const result = await MissionsModel.insert(newMissionMock);          
            expect(result).to.be.deep.equal(newMissionMock);
         });
    });
});