import { LeaderboardTeam } from '../types/Leaderboard';

export const mergeLeaderboard = (home: LeaderboardTeam, away: LeaderboardTeam) => {
  const merged: LeaderboardTeam = {
    name: home.name,
    goalsBalance: (home.goalsFavor + away.goalsFavor) - (home.goalsOwn + away.goalsOwn),
    totalPoints: home.totalPoints + away.totalPoints,
    totalGames: home.totalGames + away.totalGames,
    totalLosses: home.totalLosses + away.totalLosses,
    totalDraws: home.totalDraws + away.totalDraws,
    totalVictories: home.totalVictories + away.totalVictories,
    goalsFavor: home.goalsFavor + away.goalsFavor,
    goalsOwn: home.goalsOwn + away.goalsOwn,
    efficiency: '',
  };
  merged.efficiency = ((merged.totalPoints / (merged.totalGames * 3)) * 100).toFixed(2);
  return merged;
};

export const sortLeaderboard = (leaderboard: LeaderboardTeam[]) => leaderboard.sort((a, b) => (
  b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn
));
