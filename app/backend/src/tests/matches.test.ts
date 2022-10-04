import httpStatusCode from 'http-status-codes';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { findAll, findAllFinished, findAllInProgress } from './mocks/matches.mock';
import Match from '../database/models/Match';
import * as jwt from '../utils/jwt';
import Team from '../database/models/Team';
chai.use(chaiHttp);

const { expect } = chai;

describe('matches route test', () => {

  describe('/matches/ - GET', () => {

    const matches = findAll();
    
    before(() => {
      sinon.stub(Match, 'findAll').resolves(matches as any[]);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('returns all matches.', async () => {
      const response = await chai.request(app)
        .get('/matches');
      expect(response.body).to.be.deep.equal(matches);
      expect(response.status).to.be.equal(httpStatusCode.OK);
    });
    
  });

  describe('/matches?inProgress=false - GET', () => {

    const matches = findAllFinished();
    
    before(() => {
      sinon.stub(Match, 'findAll').resolves(matches as any[]);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('returns all finished matches.', async () => {
      const response = await chai.request(app)
        .get('/matches?inProgress=false');
      expect(response.body).to.be.deep.equal(matches);
      expect(response.status).to.be.equal(httpStatusCode.OK);
    });
    
  });

  describe('/matches?inProgress=true - GET', () => {

    const matches = findAllInProgress();
    
    before(() => {
      sinon.stub(Match, 'findAll').resolves(matches as any[]);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('returns all in progress matches.', async () => {
      const response = await chai.request(app)
        .get('/matches?inProgress=true');
      expect(response.body).to.be.deep.equal(matches);
      expect(response.status).to.be.equal(httpStatusCode.OK);
    });
    
  });

  describe('/matches - POST', () => {

    describe('when the token is invalid.', () => {

      const errortoken = {
        message: 'Token must be a valid token',
        code: 'UNAUTHORIZED',
      };

      it('returns an error.', async () => {
        const response = await chai.request(app)
          .post('/matches')
          .set({ Authorization: 'invalid_token' });
        expect(response.body).to.be.deep.equal(errortoken);
        expect(response.status).to.be.equal(httpStatusCode.UNAUTHORIZED);
      });

    })

    describe('when the payload is valid.', () => {

      const payload = {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      };

      before(() => {
        sinon.stub(jwt, 'validateAccessToken').returns({ id: 1 });
        sinon.stub(Match, 'create').resolves({ id: 1, ...payload } as unknown as Match);
      });
  
      after(() => {
        (jwt.validateAccessToken as sinon.SinonStub).restore();
        (Match.create as sinon.SinonStub).restore();
      });

      it('returns an created match.', async () => {
        const response = await chai.request(app)
          .post('/matches')
          .set({ Authorization: 'valid_token' })
          .send(payload);
        expect(response.body).to.be.deep.equal({ id: 1, ...payload });
        expect(response.status).to.be.equal(httpStatusCode.CREATED);
      });

    })

    describe('when the payload is valid but the teams id are equals.', () => {

      const payload = {
        homeTeam: 16,
        awayTeam: 16,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      };

      const error = {
        code: 'UNAUTHORIZED',
        message: 'It is not possible to create a match with two equal teams'
      }

      before(() => {
        sinon.stub(jwt, 'validateAccessToken').returns({ id: 1 });
      });
  
      after(() => {
        (jwt.validateAccessToken as sinon.SinonStub).restore();
      });

      it('returns an error.', async () => {
        const response = await chai.request(app)
          .post('/matches')
          .set({ Authorization: 'valid_token' })
          .send(payload);
        expect(response.body).to.be.deep.equal(error);
        expect(response.status).to.be.equal(httpStatusCode.UNAUTHORIZED);
      });

    })

    describe('when the payload is valid but some team id not exists.', () => {

      const payload = {
        homeTeam: 50,
        awayTeam: 16,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      };

      const error = {
        code: 'NOT_FOUND',
        message: 'There is no team with such id!'
      }

      before(() => {
        sinon.stub(jwt, 'validateAccessToken').returns({ id: 1 });
        sinon.stub(Team, 'findOne').resolves(null);
      });
  
      after(() => {
        (jwt.validateAccessToken as sinon.SinonStub).restore();
        (Team.findOne as sinon.SinonStub).restore();
      });

      it('returns an error.', async () => {
        const response = await chai.request(app)
          .post('/matches')
          .set({ Authorization: 'valid_token' })
          .send(payload);
        expect(response.body).to.be.deep.equal(error);
        expect(response.status).to.be.equal(httpStatusCode.NOT_FOUND);
      });

    })
    
  });

  describe('/:id - PATCH', () => {

    describe('when the payload is valid.', () => {

      const returnpayload = {
        id: 1,
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      };

      const payload = {
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };

      before(() => {
        sinon.stub(Match, 'update').resolves();
        sinon.stub(Match, 'findOne').resolves(returnpayload as unknown as Match);
      });
  
      after(() => {
        (Match.update as sinon.SinonStub).restore();
        (Match.findOne as sinon.SinonStub).restore();
      });

      it('returns an updated match.', async () => {
        const response = await chai.request(app)
          .patch('/matches/' + 1)
          .send(payload);
        expect(response.body).to.be.deep.equal(returnpayload);
        expect(response.status).to.be.equal(httpStatusCode.OK);
      });

    });

    describe('when the payload is valid but match id is invalid.', () => {

      const payload = {
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };

      const error = {
        code: 'NOT_FOUND',
        message: 'Match not found'
      }

      before(() => {
        sinon.stub(Match, 'findOne').resolves(null);
      });
  
      after(() => {
        (Match.findOne as sinon.SinonStub).restore();
      });

      it('returns an error.', async () => {
        const response = await chai.request(app)
          .patch('/matches/' + 50)
          .send(payload);
        expect(response.body).to.be.deep.equal(error);
        expect(response.status).to.be.equal(httpStatusCode.NOT_FOUND);
      });

    });
    
  });

  describe('/:id/finish - PATCH', () => {

    describe('when match id is invalid.', () => {

      const error = {
        code: 'NOT_FOUND',
        message: 'Match not found'
      }

      before(() => {
        sinon.stub(Match, 'findOne').resolves(null);
      });
  
      after(() => {
        (Match.findOne as sinon.SinonStub).restore();
      });

      it('returns an error.', async () => {
        const response = await chai.request(app)
          .patch('/matches/' + 50 + '/finish');
        expect(response.body).to.be.deep.equal(error);
        expect(response.status).to.be.equal(httpStatusCode.NOT_FOUND);
      });

    });

    describe('when match id is valid.', () => {

      const returnpayload = {
        id: 1,
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      };

      const error = {
        code: 'NOT_FOUND',
        message: 'Match not found'
      }

      before(() => {
        sinon.stub(Match, 'findOne').resolves(returnpayload as unknown as Match);
      });
  
      after(() => {
        (Match.findOne as sinon.SinonStub).restore();
      });

      it('returns a message.', async () => {
        const response = await chai.request(app)
          .patch('/matches/' + 1 + '/finish');
        expect(response.body).to.be.deep.equal({ message: 'Finished' });
        expect(response.status).to.be.equal(httpStatusCode.OK);
      });

    });

  });
  
})