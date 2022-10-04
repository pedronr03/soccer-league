import { QueryTypes } from 'sequelize';
import { LeaderboardTeam } from '../types/Leaderboard';
import Match from '../database/models/Match';
import { homeQuery, awayQuery } from './queries/leaderboard.query';
import { mergeLeaderboard, sortLeaderboard } from '../utils/leaderboard';

class LeaderboardRepository {
  constructor(
    private readonly match = Match,
  ) {}

  public async getByType(teamType: 'home' | 'away') {
    const query = teamType === 'home' ? homeQuery : awayQuery;
    const leaderboard = await this.match.sequelize
      ?.query(query, { raw: true, type: QueryTypes.SELECT }) as LeaderboardTeam[];
    return leaderboard as LeaderboardTeam[];
  }

  public async getAll() {
    const [home, away] = await Promise.all(['home', 'away']
      .map((type) => this.getByType(type as 'home' | 'away')));
    const newLeaderboard = home.map((homeTeam) => {
      const awayTeam = away.find(({ name }) => name === homeTeam.name) as LeaderboardTeam;
      const merged = mergeLeaderboard(homeTeam, awayTeam);
      return merged as LeaderboardTeam;
    });
    return sortLeaderboard(newLeaderboard);
  }
}

export default LeaderboardRepository;
