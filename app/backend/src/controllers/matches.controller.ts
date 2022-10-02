import httpStatusCode from 'http-status-codes';
import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import CreateMatchDto from '../dto/create-match.dto';
import UpdateMatchDto from '../dto/update-match.dto';

class MatchesController {
  constructor(
    private readonly matchesService = new MatchesService(),
  ) {}

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await this.verifyMatchStatus(inProgress as string);
    return res.status(httpStatusCode.OK).json(matches);
  }

  public async startMatch(req: Request, res: Response) {
    const match = await this.matchesService.startMatch(req.body as CreateMatchDto);
    return res.status(httpStatusCode.CREATED).json(match);
  }

  public async finishMatch(req: Request, res: Response) {
    await this.matchesService.finishMatch(+req.params.id);
    return res.status(httpStatusCode.OK).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response) {
    const match = await this.matchesService.updateMatch(+req.params.id, req.body as UpdateMatchDto);
    return res.status(httpStatusCode.OK).json(match);
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
