import MatchesRepository from '../repositories/matches.repository';

class MatchesService {
  constructor(
    private readonly matchesRepository = new MatchesRepository(),
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
}

export default MatchesService;
