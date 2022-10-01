import httpStatusCode from 'http-status-codes';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/Team';
import { findAllTeams, findTeamById } from './mocks/teams.mock';
chai.use(chaiHttp);

const { expect } = chai;

describe('teams route test.', () => {

  describe('/teams - GET', () => {

    const allTeams = findAllTeams();

    before(() => {
      sinon.stub(Team, 'findAll').resolves(allTeams as Team[]);
    });

    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('returns all teams.', async () => {
      const response = await chai.request(app)
        .get('/teams');
      expect(response.body).to.be.deep.equal(allTeams);
      expect(response.status).to.be.equal(httpStatusCode.OK);
      
    });
    
  });

  describe('/teams/:id - GET', () => {

    describe('when id is valid.', () => {

      const id = 1;
      const team = findTeamById(id);

      before(() => {
        sinon.stub(Team, 'findOne').resolves(team as Team);
      });
  
      after(() => {
        (Team.findOne as sinon.SinonStub).restore();
      });

      it('returns a team.', async () => {
        const response = await chai.request(app)
          .get('/teams/:' + id);
        expect(response.body).to.be.deep.equal(team);
        expect(response.status).to.be.equal(httpStatusCode.OK);
      });
      
    });

    describe('when id is valid.', () => {

      const id = 30;
      const team = findTeamById(id);
      const error = {
        message: 'Team not found',
        code: 'NOT_FOUND'
      }

      before(() => {
        sinon.stub(Team, 'findOne').resolves(team as Team);
      });
  
      after(() => {
        (Team.findOne as sinon.SinonStub).restore();
      });

      it('returns an error.', async () => {
        const response = await chai.request(app)
          .get('/teams/:' + id);
        expect(response.body).to.be.deep.equal(error);
        expect(response.status).to.be.equal(httpStatusCode.NOT_FOUND);
      });

    });
    
  });
  
});