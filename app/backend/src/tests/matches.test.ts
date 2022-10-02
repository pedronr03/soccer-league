import httpStatusCode from 'http-status-codes';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { findAll, findAllFinished, findAllInProgress } from './mocks/matches.mock';
import Match from '../database/models/Match';
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
  
})