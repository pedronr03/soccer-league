import CustomError from '../errors/CustomError';
import TeamsRepository from '../repositories/teams.repository';

class TeamsService {
  constructor(
    private readonly teamsRepository = new TeamsRepository(),
  ) {}

  public async getAll() {
    return this.teamsRepository.getAll();
  }

  public async getById(id: number) {
    const team = await this.teamsRepository.getById(id);
    if (!team) {
      throw new CustomError(404, 'NOT_FOUND', 'Team not found');
    }
    return team;
  }
}

export default TeamsService;
