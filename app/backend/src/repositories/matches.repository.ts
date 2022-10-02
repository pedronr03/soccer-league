import Team from '../database/models/Team';
import Match from '../database/models/Match';
import CreateMatchDto from '../dto/create-match.dto';
import UpdateMatchDto from '../dto/update-match.dto';

class MatchesRepository {
  constructor(
    private readonly match = Match,
  ) {}

  public async getById(id: number) {
    return this.match.findOne({ where: { id } });
  }

  public async getAll() {
    return this.match.findAll({
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' }],
    });
  }

  public async getAllInProgress() {
    return this.match.findAll({
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' },
      ],
      where: { inProgress: true },
    });
  }

  public async getAllFinished() {
    return this.match.findAll({
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' },
      ],
      where: { inProgress: false },
    });
  }

  public async finishMatch(id: number) {
    return this.match.update({ inProgress: false }, { where: { id } });
  }

  public async startMatch(createMatchDto: CreateMatchDto) {
    return this.match.create(createMatchDto);
  }

  public async updateMatch(id: number, updateMatchDto: UpdateMatchDto) {
    return this.match.update(updateMatchDto, { where: { id } });
  }
}

export default MatchesRepository;
