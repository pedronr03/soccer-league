import { Router } from 'express';
import tokenValidate from '../middlewares/token-validate.middleware';
import MatchesController from '../controllers/matches.controller';
import createMatchMiddleware from '../middlewares/create-match.middleware';
import updateMatchMiddleware from '../middlewares/update-match.middleware';

const matchesRoute = Router();

const matchesController = new MatchesController();

matchesRoute
  .patch('/:id/finish', (req, res) => matchesController.finishMatch(req, res))
  .patch('/:id', updateMatchMiddleware, (req, res) => matchesController.updateMatch(req, res))
  .get('/', (req, res) => matchesController.getAll(req, res))
  .post(
    '/',
    tokenValidate,
    createMatchMiddleware,
    (req, res) => matchesController.startMatch(req, res),
  );

export default matchesRoute;
