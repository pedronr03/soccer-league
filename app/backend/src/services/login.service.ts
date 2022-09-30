import * as bcrypt from 'bcryptjs';
import UserCredentials from '../types/UserCredentials';
import LoginRepository from '../repositories/login.repository';
import CustomError from '../errors/CustomError';
import { createAccessToken } from '../utils/jwt';

class LoginService {
  constructor(
    private readonly loginRepository = new LoginRepository(),
  ) {}

  public async login(data: UserCredentials): Promise<string> {
    const user = await this.loginRepository.getByEmail(data.email);
    if (!user) throw new CustomError(401, 'UNAUTHORIZED', 'Incorrect email or password');
    const validation = bcrypt.compareSync(data.password, user.password);
    if (!validation) throw new CustomError(401, 'UNAUTHORIZED', 'Incorrect email or password');
    const token = createAccessToken(user.id);
    return token;
  }

  public async validate(id: number): Promise<string> {
    const user = await this.loginRepository.getById(id);
    if (!user) throw new CustomError(404, 'NOT_FOUND', 'User not found');
    return user.role;
  }
}

export default LoginService;
