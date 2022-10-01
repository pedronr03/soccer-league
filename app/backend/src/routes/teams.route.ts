import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsRoute = Router();
const teamsController = new TeamsController();

teamsRoute.get('/:id', (req, res) => teamsController.getById(req, res));

teamsRoute.get('/', (req, res) => teamsController.getAll(req, res));

export default teamsRoute;
