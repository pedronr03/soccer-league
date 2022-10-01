import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamsController {
  constructor(
    private readonly teamsService = new TeamsService(),
  ) {}

  public async getAll(_req: Request, res: Response) {
    const teams = await this.teamsService.getAll();
    return res.status(200).json(teams);
  }

  public async getById(req: Request, res: Response) {
    const team = await this.teamsService.getById(+req.params.id);
    return res.status(200).json(team);
  }
}

export default TeamsController;
