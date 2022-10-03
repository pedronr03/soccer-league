export const homeQuery = `
  SELECT T.team_name                                                     name,
  COUNT(T.id)                                                            totalGames,
  CAST(SUM(M.home_team_goals) AS SIGNED)                                 goalsFavor,
  CAST(SUM(M.away_team_goals) AS SIGNED)                                 goalsOwn,
  CAST(SUM(M.home_team_goals - M.away_team_goals) AS SIGNED)             goalsBalance,
  CAST(SUM(M.home_team_goals > M.away_team_goals) AS SIGNED)             totalVictories,
  CAST(SUM(M.home_team_goals = M.away_team_goals) AS SIGNED)             totalDraws,
  CAST(SUM(M.home_team_goals < M.away_team_goals) AS SIGNED)             totalLosses,
  (CAST(SUM(M.home_team_goals > M.away_team_goals) AS SIGNED)
      * 3 + CAST(SUM(M.home_team_goals = M.away_team_goals) AS SIGNED))  totalPoints,
  ROUND(((CAST(SUM(M.home_team_goals > M.away_team_goals) AS SIGNED)
              * 3 + CAST(SUM(M.home_team_goals = M.away_team_goals) AS SIGNED))
            / (COUNT(T.id) * 3) * 100), 2)                               efficiency
  FROM TRYBE_FUTEBOL_CLUBE.teams T
  JOIN TRYBE_FUTEBOL_CLUBE.matches M ON T.id = M.home_team
  WHERE M.in_progress = false
  GROUP BY T.id
  ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;

export const awayQuery = `
  SELECT T.team_name                                                     name,
  COUNT(T.id)                                                            totalGames,
  CAST(SUM(M.away_team_goals) AS SIGNED)                                 goalsFavor,
  CAST(SUM(M.home_team_goals) AS SIGNED)                                 goalsOwn,
  CAST(SUM(M.away_team_goals - M.home_team_goals) AS SIGNED)             goalsBalance,
  CAST(SUM(M.away_team_goals > M.home_team_goals) AS SIGNED)             totalVictories,
  CAST(SUM(M.away_team_goals = M.home_team_goals) AS SIGNED)             totalDraws,
  CAST(SUM(M.away_team_goals < M.home_team_goals) AS SIGNED)             totalLosses,
  (CAST(SUM(M.away_team_goals > M.home_team_goals) AS SIGNED)
      * 3 + CAST(SUM(M.away_team_goals = M.home_team_goals) AS SIGNED))  totalPoints,
  ROUND(((CAST(SUM(M.away_team_goals > M.home_team_goals) AS SIGNED)
              * 3 + CAST(SUM(M.away_team_goals = M.home_team_goals) AS SIGNED))
            / (COUNT(T.id) * 3) * 100), 2)                               efficiency
  FROM TRYBE_FUTEBOL_CLUBE.teams T
  JOIN TRYBE_FUTEBOL_CLUBE.matches M ON T.id = M.away_team
  WHERE M.in_progress = false
  GROUP BY T.id
  ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;
