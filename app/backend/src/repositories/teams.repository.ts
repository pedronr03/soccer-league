import Team from '../database/models/Team';

class TeamsRepository {
  constructor(
    private readonly team = Team,
  ) {}

  public async getAll() {
    return this.team.findAll();
  }

  public async getById(id: number) {
    return this.team.findOne({ where: { id } });
  }
}

export default TeamsRepository;
