import { Router } from 'express';
import tokenValidate from '../middlewares/token-validate.middleware';
import MatchesController from '../controllers/matches.controller';

const matchesRoute = Router();

const matchesController = new MatchesController();

matchesRoute
  .patch('/:id/finish', (req, res) => matchesController.finishMatch(req, res))
  .patch('/:id', (req, res) => matchesController.updateMatch(req, res))
  .get('/', (req, res) => matchesController.getAll(req, res))
  .post('/', tokenValidate, (req, res) => matchesController.startMatch(req, res));

export default matchesRoute;
