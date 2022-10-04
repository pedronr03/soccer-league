import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(
    private readonly leaderboardService = new LeaderboardService(),
  ) {}

  public async getAllHome(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getByType('home');
    return res.status(200).json(leaderboard);
  }

  public async getAllAway(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getByType('away');
    return res.status(200).json(leaderboard);
  }

  public async getAll(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getAll();
    return res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
