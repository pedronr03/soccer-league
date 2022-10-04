import httpStatusCode from 'http-status-codes';
import { awayLeaderboard, homeLeaderboard, mainLeaderboard } from './mocks/leaderboard.mock';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match';
chai.use(chaiHttp);

const { expect } = chai;

describe('leaderboard route test', () => {
  
  describe('/leaderboard', () => {

    before(() => {
      if (!Match.sequelize?.query) return;
      sinon.stub(Match.sequelize, 'query')
        .onFirstCall().resolves(homeLeaderboard as any)
        .onSecondCall().resolves(awayLeaderboard as any);
    });

    after(() => {
      if (!Match.sequelize?.query) return;
      (Match.sequelize.query as sinon.SinonStub).restore();
    });

    it('returns main leaderboard.', async () => {
      const response = await chai.request(app).get('/leaderboard');
      expect(response.status).to.be.equal(httpStatusCode.OK);
      expect(response.body).to.be.deep.equal(mainLeaderboard);
    });

  });

  describe('/leaderboard/away', () => {

    before(() => {
      if (!Match.sequelize?.query) return;
      sinon.stub(Match.sequelize, 'query').resolves(awayLeaderboard as any);
    });

    after(() => {
      if (!Match.sequelize?.query) return;
      (Match.sequelize.query as sinon.SinonStub).restore();
    });

    it('returns away leaderboard.', async () => {
      const response = await chai.request(app).get('/leaderboard/away');
      expect(response.status).to.be.equal(httpStatusCode.OK);
      expect(response.body).to.be.deep.equal(awayLeaderboard);
    });

  });

  describe('/leaderboard/home', () => {

    before(() => {
      if (!Match.sequelize?.query) return;
      sinon.stub(Match.sequelize, 'query').resolves(homeLeaderboard as any);
    });

    after(() => {
      if (!Match.sequelize?.query) return;
      (Match.sequelize.query as sinon.SinonStub).restore();
    });

    it('returns home leaderboard.', async () => {
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.status).to.be.equal(httpStatusCode.OK);
      expect(response.body).to.be.deep.equal(homeLeaderboard);
    });

  });
  
})