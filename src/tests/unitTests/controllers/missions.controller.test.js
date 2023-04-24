const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { MissionsService } = require('../../../services');
const { missionsMock, newMissionMock } = require('../unitMock/unitMock');
const { MissionController } = require('../../../controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Missions Controller', function () {
  describe('Lista de missões', function () {
    it('Retorna status 200 ao listar as missões', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(MissionsService, 'getAllMissions')
      .resolves({ type: null, message: missionsMock });
      await MissionController.listMissions(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(missionsMock);
    });
    it('Busca uma missão pelo ID', async function () {
      const res = {};
      const req = {
          params: { id: 2 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(MissionsService, 'findMissionById')
      .resolves({ type: null, message: missionsMock[1] });
      await MissionController.getMissionById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(missionsMock[1]);
      sinon.restore();
    });
    it('Retorna status 201 ao criar uma missão com sucesso', async function () {
        const res = {};
        const req = {
            body: newMissionMock,
        };       
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(MissionsService, 'createMission')
        .resolves({ type: null, message: newMissionMock });
        await MissionController.createNewMission(req, res);
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(newMissionMock);
        sinon.restore();
    });
  });
  describe('Testa casos de erro na camada controller', function () {
    it('É lançado erro caso ID não exista no banco', async function () {
        const res = {};
        const req = {
            params: { id: 999 },
        };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(MissionsService, 'findMissionById')
        .resolves({ type: 'MISSION_NOT_FOUND', message: 'Mission not found' });
        await MissionController.getMissionById(req, res);
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith('Mission not found');
        sinon.restore();
    }); 
  });
});
