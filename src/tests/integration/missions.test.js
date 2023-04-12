const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const fs = require('fs');

chai.use(chaiHttp);
const { expect } = chai;
const app = require('../../app');

const mockMissions = JSON.stringify([
    { id: 1, name: 'Terra' },
    { id: 2, name: 'Jupter' },
    { id: 3, name: 'Saturno' },
    { id: 4, name: 'Mercúrio' },
]);
const mockMission = {
    id: 1681287069755,
    name: 'test',
};

describe('Rota de missões', function () { 
    describe('GET /missions', function () { 
        it('Retorna uma lista de missões', async function () {
            sinon.stub(fs.promises, 'readFile').resolves(mockMissions);

            const response = await chai.request(app).get('/missions');

            expect(response.status).to.be.equal(200);
            expect(response.body).to.haveOwnProperty('missions');
            expect(response.body.missions).to.be.instanceOf(Array);
            expect(response.body.missions).to.have.lengthOf(4);
            sinon.restore();
        });
     });

     describe('POST /missions', function () {
        beforeEach(function () {
            sinon.stub(fs.promises, 'writeFile').resolves();
        });
        afterEach(sinon.restore);
        it('Retorna a missão criada com um id', async function () {
            const response = await chai.request(app).post('/missions').send(mockMission);
            expect(response.status).to.be.equal(201);
            expect(response.body).to.haveOwnProperty('mission');
            expect(response.body.mission).to.haveOwnProperty('id');
            expect(response.body.mission.name).to.equal(mockMission.name);
            expect(response.body.mission.id).to.equal(mockMission.id);            
        });
        it('Escreve a nova missão no arquivo de missões', async function () {
             await chai.request(app).post('/missions').send(mockMission);
             expect(fs.promises.writeFile.called).to.be.equal(true);
        });
     });
 });
