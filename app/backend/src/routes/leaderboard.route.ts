import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRoute = Router();

const leaderboardController = new LeaderboardController();

leaderboardRoute
  .get('/home', (req, res) => leaderboardController.getAllHome(req, res))
  .get('/away', (req, res) => leaderboardController.getAllAway(req, res))
  .get('/', (req, res) => leaderboardController.getAll(req, res));

export default leaderboardRoute;
