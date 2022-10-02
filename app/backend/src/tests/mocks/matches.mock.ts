const allMatches = [
  {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "home_team": 16,
      "away_team": 8,
      "teamHome": {
          "id": 16,
          "teamName": "São Paulo"
      },
      "teamAway": {
          "id": 8,
          "teamName": "Grêmio"
      }
  },
  {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "home_team": 9,
      "away_team": 14,
      "teamHome": {
          "id": 9,
          "teamName": "Internacional"
      },
      "teamAway": {
          "id": 14,
          "teamName": "Santos"
      }
  },
  {
      "id": 3,
      "homeTeam": 4,
      "homeTeamGoals": 3,
      "awayTeam": 11,
      "awayTeamGoals": 0,
      "inProgress": false,
      "home_team": 4,
      "away_team": 11,
      "teamHome": {
          "id": 4,
          "teamName": "Corinthians"
      },
      "teamAway": {
          "id": 11,
          "teamName": "Napoli-SC"
      }
  },
  {
      "id": 4,
      "homeTeam": 3,
      "homeTeamGoals": 0,
      "awayTeam": 2,
      "awayTeamGoals": 0,
      "inProgress": true,
      "home_team": 3,
      "away_team": 2,
      "teamHome": {
          "id": 3,
          "teamName": "Botafogo"
      },
      "teamAway": {
          "id": 2,
          "teamName": "Bahia"
      }
  },
  {
      "id": 5,
      "homeTeam": 7,
      "homeTeamGoals": 1,
      "awayTeam": 10,
      "awayTeamGoals": 1,
      "inProgress": true,
      "home_team": 7,
      "away_team": 10,
      "teamHome": {
          "id": 7,
          "teamName": "Flamengo"
      },
      "teamAway": {
          "id": 10,
          "teamName": "Minas Brasília"
      }
  },
  {
      "id": 6,
      "homeTeam": 5,
      "homeTeamGoals": 1,
      "awayTeam": 13,
      "awayTeamGoals": 1,
      "inProgress": true,
      "home_team": 5,
      "away_team": 13,
      "teamHome": {
          "id": 5,
          "teamName": "Cruzeiro"
      },
      "teamAway": {
          "id": 13,
          "teamName": "Real Brasília"
      }
  },
  {
      "id": 7,
      "homeTeam": 12,
      "homeTeamGoals": 2,
      "awayTeam": 6,
      "awayTeamGoals": 2,
      "inProgress": false,
      "home_team": 12,
      "away_team": 6,
      "teamHome": {
          "id": 12,
          "teamName": "Palmeiras"
      },
      "teamAway": {
          "id": 6,
          "teamName": "Ferroviária"
      }
  }
];

export const findAll = () => allMatches;

export const findAllFinished = () => allMatches.filter(({ inProgress }) => !inProgress);

export const findAllInProgress = () => allMatches.filter(({ inProgress }) => inProgress);
