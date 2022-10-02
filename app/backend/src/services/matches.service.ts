import CustomError from '../errors/CustomError';
import CreateMatchDto from '../dto/create-match.dto';
import UpdateMatchDto from '../dto/update-match.dto';
import MatchesRepository from '../repositories/matches.repository';
import TeamsRepository from '../repositories/teams.repository';

class MatchesService {
  constructor(
    private readonly matchesRepository = new MatchesRepository(),
    private readonly teamsRepository = new TeamsRepository(),
  ) {}

  public async getAll() {
    return this.matchesRepository.getAll();
  }

  public async getAllFinished() {
    return this.matchesRepository.getAllFinished();
  }

  public async getAllInProgress() {
    return this.matchesRepository.getAllInProgress();
  }

  public async startMatch(createMatchDto: CreateMatchDto) {
    if (createMatchDto.awayTeam === createMatchDto.homeTeam) {
      throw new CustomError(
        401,
        'UNAUTHORIZED',
        'It is not possible to create a match with two equal teams',
      );
    }
    const teams = [createMatchDto.awayTeam, createMatchDto.homeTeam];
    await Promise.all(teams.map((id) => this.validateTeam(id)));
    return this.matchesRepository.startMatch(createMatchDto);
  }

  public async finishMatch(id: number) {
    await this.getById(id);
    return this.matchesRepository.finishMatch(id);
  }

  public async updateMatch(id: number, updateMatchDto: UpdateMatchDto) {
    const match = await this.getById(id);
    await this.matchesRepository.updateMatch(id, updateMatchDto);
    return match;
  }

  private async validateTeam(id: number) {
    const team = await this.teamsRepository.getById(id);
    if (!team) throw new CustomError(404, 'NOT_FOUND', 'There is no team with such id!');
    return team;
  }

  private async getById(id: number) {
    const match = await this.matchesRepository.getById(id);
    if (!match) throw new CustomError(404, 'NOT_FOUND', 'Match not found');
    return match;
  }
}

export default MatchesService;
