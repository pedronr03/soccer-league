import httpStatusCode from 'http-status-codes';
import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(
    private readonly matchesService = new MatchesService(),
  ) {}

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await this.verifyMatchStatus(inProgress as string);
    return res.status(httpStatusCode.OK).json(matches);
  }

  private async verifyMatchStatus(inProgress: string) {
    let matches;
    switch (true) {
      case inProgress === 'true':
        matches = await this.matchesService.getAllInProgress();
        break;
      case inProgress === 'false':
        matches = await this.matchesService.getAllFinished();
        break;
      default:
        matches = await this.matchesService.getAll();
    }
    return matches;
  }
}

export default MatchesController;
