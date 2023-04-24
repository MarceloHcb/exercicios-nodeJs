const { expect } = require('chai');
const sinon = require('sinon');

const { MissionsService } = require('../../../services');
const { MissionsModel } = require('../../../models');
const { missionsMock, newMissionMock } = require('../unitMock/unitMock');

describe('Missions Service', function () {
    describe('Lista de missões', function () { 
it('Retorna lista completa das missões', async function () {
    sinon.stub(MissionsModel, 'findAll').resolves(missionsMock);
    const result = await MissionsService.getAllMissions();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(missionsMock);
    sinon.restore();
});
it('Busca uma misssão por ID', async function () {
    sinon.stub(MissionsModel, 'findById').resolves(missionsMock[0]);
    const result = await MissionsService.findMissionById(1);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.equal(missionsMock[0]);
    sinon.restore();
});
     });
describe('Testa casos de parâmetros errados', function () {   
it('É lançado erro caso envie missão com id, e nao seja número', async function () {
    sinon.stub(MissionsModel, 'insert').resolves(missionsMock);
    const result = await MissionsService.createMission({ id: 'a', ...newMissionMock });
    expect(result.type).to.equal('INVALID_DATA_VALUE');
    expect(result.message).to.equal('"id" must be a number');
    sinon.restore();
});
it('Busca uma misssão por ID que não existe', async function () {
    sinon.stub(MissionsModel, 'findById').resolves([]);
    const result = await MissionsService.findMissionById(12222);
    expect(result.type).to.be.equal('MISSION_NOT_FOUND');
    expect(result.message).to.be.equal('Mission not found');
    sinon.restore();
});
it('É lançado erro ao enviar uma missão sem o parametro name', async function () {
    sinon.stub(MissionsModel, 'insert').resolves(missionsMock);
    const result = await MissionsService.createMission({ ...newMissionMock, name: '' });
    expect(result.message).to.equal('"name" is not allowed to be empty');
    expect(result.type).to.equal('INVALID_DATA_VALUE');
    sinon.restore();
});
it('É lançado erro ao enviar uma missão com menos de 3 caracteres', async function () {
    sinon.stub(MissionsModel, 'insert').resolves(missionsMock);
    const result = await MissionsService.createMission({ ...newMissionMock, name: 'a' });
    expect(result.message).to.equal('"name" length must be at least 3 characters long');
    expect(result.type).to.equal('INVALID_DATA_VALUE');    
    sinon.restore();
});
it('É lançado erro ao enviar uma missão sem o parâmetro year', async function () {
    sinon.stub(MissionsModel, 'insert').resolves(missionsMock);
    const backupYear = newMissionMock.year;
    delete newMissionMock.year;
    const result = await MissionsService.createMission(newMissionMock);
    expect(result.message).to.equal('"year" is required');
    expect(result.type).to.equal('INVALID_DATA_VALUE');  
    newMissionMock.year = backupYear;
    sinon.restore();
});
it('É lançado erro ao enviar uma missão com parâmetro year vazio', async function () {
    sinon.stub(MissionsModel, 'insert').resolves(missionsMock);
    const result = await MissionsService.createMission({ ...newMissionMock, year: '' });
    expect(result.message).to.equal('"year" is not allowed to be empty');
    expect(result.type).to.equal('INVALID_DATA_VALUE');
    sinon.restore();
});
it('É lançado erro ao enviar uma missão sem o parâmetro destination', async function () {
    sinon.stub(MissionsModel, 'insert').resolves(missionsMock);   
    const backupDestination = newMissionMock.destination;
    delete newMissionMock.destination;
    const result = await MissionsService.createMission(newMissionMock);
    expect(result.message).to.equal('"destination" is required');
    expect(result.type).to.equal('INVALID_DATA_VALUE');    
    newMissionMock.destination = backupDestination;
    sinon.restore();
});
it('É lançado erro ao enviar uma missão com parâmetro destination vazio', async function () {
    sinon.stub(MissionsModel, 'insert').resolves(missionsMock);
    const result = await MissionsService.createMission({ ...newMissionMock, destination: '' });
    expect(result.message).to.equal('"destination" is not allowed to be empty');
    expect(result.type).to.equal('INVALID_DATA_VALUE');
    sinon.restore();
});
it('É lançado erro ao enviar uma missão sem o parâmetro country', async function () {
    sinon.stub(MissionsModel, 'insert').resolves(missionsMock);   
    const backupDestination = newMissionMock.country;
    delete newMissionMock.country;
    const result = await MissionsService.createMission(newMissionMock);
    expect(result.message).to.equal('"country" is required');
    expect(result.type).to.equal('INVALID_DATA_VALUE');    
    newMissionMock.destination = backupDestination;
    sinon.restore();
});
it('É lançado erro ao enviar uma missão com parâmetro country vazio', async function () {
    sinon.stub(MissionsModel, 'insert').resolves(missionsMock);
    const result = await MissionsService.createMission({ ...newMissionMock, country: '' });
    expect(result.message).to.equal('"country" is not allowed to be empty');
    expect(result.type).to.equal('INVALID_DATA_VALUE');
    sinon.restore();
});
});
});
