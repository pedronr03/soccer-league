import UserEntity from '../entities/User';
import User from '../database/models/User';

class LoginRepository {
  constructor(
    private readonly user = User,
  ) {}

  public async getByEmail(email: string): Promise<UserEntity | null> {
    return this.user.findOne({ where: { email } });
  }

  public async getById(id: number): Promise<UserEntity | null> {
    return this.user.findOne({ where: { id } });
  }
}

export default LoginRepository;
