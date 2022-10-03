import { QueryTypes } from 'sequelize';
import { InitialLeaderboardTeam, LeaderboardTeam } from '../types/Leaderboard';
import Match from '../database/models/Match';
import { homeQuery, awayQuery } from './queries/leaderboard.query';

class LeaderboardRepository {
  constructor(
    private readonly match = Match,
  ) {}

  public async getByType(teamType: 'home' | 'away') {
    const query = teamType === 'home' ? homeQuery : awayQuery;
    const leaderboard = await this.match
      .sequelize?.query(query, { raw: true, type: QueryTypes.SELECT }) as InitialLeaderboardTeam[];
    return leaderboard as LeaderboardTeam[];
  }
}

export default LeaderboardRepository;
