import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesRoute = Router();

const matchesController = new MatchesController();

matchesRoute.get('/', (req, res) => matchesController.getAll(req, res));

export default matchesRoute;
