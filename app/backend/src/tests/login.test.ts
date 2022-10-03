import * as jwt from '../utils/jwt';
import * as jwtlib from 'jsonwebtoken';
import httpStatusCode from 'http-status-codes';
import { findUserByEmail, dtos, findUserById } from './mocks/users.mock';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

describe('login route test.', () => {

  describe('/login', () => {

    const errorDatabase = {
      code: 'UNAUTHORIZED',
      message: 'Incorrect email or password'
    };

    const errorPayload = {
      code: 'BAD_REQUEST',
      message: 'All fields must be filled'
    };

    describe('when the route receives a valid payload.', () => {

      const payload = dtos.valid;

      before(() => {
        sinon.stub(User, 'findOne').resolves(findUserByEmail(payload.email) as User);
      })

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
      })

      it('returns a jwt token.', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(payload);
        expect(response.status).to.be.equal(httpStatusCode.OK);
        expect(response.body).to.have.property('token');
      })
    
    })

    describe('when the route does not receives an email.', () => {

      const payload = dtos.undefinedEmail;

      it('returns an error.', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(payload);
        expect(response.status).to.be.equal(httpStatusCode.BAD_REQUEST);
        expect(response.body).to.be.deep.equal(errorPayload);
      })
    
    })

    describe('when the route does not receives an password.', () => {

      const payload = dtos.undefinedPassword;

      it('returns an error.', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(payload);
        expect(response.status).to.be.equal(httpStatusCode.BAD_REQUEST);
        expect(response.body).to.be.deep.equal(errorPayload);
      })
    
    })

    describe('when the route receives a invalid email.', () => {

      const payload = dtos.invalidEmail;

      before(() => {
        sinon.stub(User, 'findOne').resolves(findUserByEmail(payload.email) as User);
      })

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
      })

      it('returns an error.', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(payload);
        expect(response.status).to.be.equal(httpStatusCode.UNAUTHORIZED);
        expect(response.body).to.be.deep.equal(errorDatabase);
      })
    
    })

    describe('when the route receives a invalid password.', () => {

      const payload = dtos.invalidPassword;

      before(() => {
        sinon.stub(User, 'findOne').resolves(findUserByEmail(payload.email) as User);
      })

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
      })

      it('returns an error.', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(payload);
        expect(response.status).to.be.equal(httpStatusCode.UNAUTHORIZED);
        expect(response.body).to.be.deep.equal(errorDatabase);
      })
    
    })

  })

  describe('/login/receive', () => {

    const errortoken = {
      message: 'Token must be a valid token',
      code: 'UNAUTHORIZED',
    };

    const errorTokenNotFound = {
      message: 'Token not found',
      code: 'NOT_FOUND',
    };

    const errorUserNotFound = {
      message: 'User not found',
      code: 'NOT_FOUND',
    };

    describe('when the route receives a valid token.', () => {

      before(() => {
        sinon.stub(User, 'findOne').resolves(findUserById(2) as User);
        sinon.stub(jwtlib, 'decode').returns({ id: 2 });
        sinon.stub(jwtlib, 'verify').returns();
      })

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
        (jwtlib.decode as sinon.SinonStub).restore();
        (jwtlib.verify as sinon.SinonStub).restore();
      })

      it('returns user role.', async () => {
        const response = await chai
          .request(app)
          .get('/login/validate')
          .set({ Authorization: token });
        expect(response.status).to.be.equal(httpStatusCode.OK);
        expect(response.body).to.be.deep.equal({ role: 'user' });
      })
    
    })

    describe('when the route does not receives a token.', () => {

      before(() => {
        sinon.stub(User, 'findOne').resolves(findUserById(2) as User);
        sinon.stub(jwt, 'validateAccessToken').returns({ id: 2 });
      })

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
        (jwt.validateAccessToken as sinon.SinonStub).restore();
      })

      it('returns an error.', async () => {
        const response = await chai
          .request(app)
          .get('/login/validate');
        expect(response.status).to.be.equal(httpStatusCode.NOT_FOUND);
        expect(response.body).to.be.deep.equal(errorTokenNotFound);
      })
    
    })

    describe('when the route receives a token but its invalid.', () => {

      it('returns an error.', async () => {
        const response = await chai
          .request(app)
          .get('/login/validate')
          .set({ Authorization: token });
        expect(response.status).to.be.equal(httpStatusCode.UNAUTHORIZED);
        expect(response.body).to.be.deep.equal(errortoken);
      })
    
    })

    describe('when the route receives a token but the token payload is invalid.', () => {
    
      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
        sinon.stub(jwt, 'validateAccessToken').returns({ id: 5 });
      })

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
        (jwt.validateAccessToken as sinon.SinonStub).restore();
      })

      it('returns an error.', async () => {
        const response = await chai
          .request(app)
          .get('/login/validate')
          .set({ Authorization: token });
        expect(response.status).to.be.equal(httpStatusCode.NOT_FOUND);
        expect(response.body).to.be.deep.equal(errorUserNotFound);
      })
      
    })

  })

});
