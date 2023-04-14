const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
// const fs = require('fs');
const connection = require('../../db/connection');

chai.use(chaiHttp);
const { expect } = chai;
const app = require('../../app');

const mockMissions = [
    { id: 1, name: 'Terra' },
    { id: 2, name: 'Jupter' },
    { id: 3, name: 'Saturno' },
    { id: 4, name: 'Mercúrio' },
];
const mockMission = {
    id: 1681287069755,
    name: 'test',
};

describe('Rota de missões', function () { 
    describe('GET /missions', function () { 
        it('Retorna uma lista de missões', async function () {
            sinon.stub(connection, 'execute').resolves([mockMissions]);

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
            const mockId = 42;
            sinon.stub(connection, 'execute')
            .onFirstCall().resolves([{ insertId: mockId }])
            .onSecondCall()
            .resolves([{ id: mockId, ...mockMission }]);
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
        it('Escreve a nova missão no banco de dados', async function () {
             await chai.request(app).post('/missions').send(mockMission);
             expect(connection.execute.calledTwice).to.be.equal(true);
        });
     });
 });
