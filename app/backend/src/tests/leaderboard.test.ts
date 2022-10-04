import * as jwt from '../utils/jwt';
import * as jwtlib from 'jsonwebtoken';
import httpStatusCode from 'http-status-codes';
import { awayLeaderboard, homeLeaderboard, mainLeaderboard } from './mocks/leaderboard.mock';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match';
import { sortLeaderboard } from '../utils/leaderboard';
chai.use(chaiHttp);

const { expect } = chai;

describe('leaderboard route test', () => {
  
  describe('/leaderboard', () => {

    before(() => {
    });

    after(() => {
    });

    it('returns main leaderboard.', async () => {
      const response = await chai.request(app).get('/leaderboard');
      expect(response.status).to.be.equal(httpStatusCode.OK);
      expect(response.body).to.be.equal(mainLeaderboard);
    });

  });

  describe('/leaderboard/away', () => {

    before(() => {
    });

    after(() => {
    });

    it('returns away leaderboard.', async () => {
      const response = await chai.request(app).get('/leaderboard/away');
      expect(response.status).to.be.equal(httpStatusCode.OK);
      expect(response.body).to.be.equal(homeLeaderboard);
    });

  });

  describe('/leaderboard/home', () => {

    before(() => {
    });

    after(() => {
    });

    it('returns home leaderboard.', async () => {
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.status).to.be.equal(httpStatusCode.OK);
      expect(response.body).to.be.equal(awayLeaderboard);
    });

  });
  
})