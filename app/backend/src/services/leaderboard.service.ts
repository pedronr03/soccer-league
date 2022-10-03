import LeaderboardRepository from '../repositories/leaderboard.repository';

class LeaderboardService {
  constructor(
    private readonly leadeboardRepository = new LeaderboardRepository(),
  ) {}

  public async getByType(teamType: 'home' | 'away') {
    return this.leadeboardRepository.getByType(teamType);
  }
}

export default LeaderboardService;
