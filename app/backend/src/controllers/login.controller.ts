import { Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';
import LoginService from '../services/login.service';
import UserCredentials from '../types/UserCredentials';

class LoginController {
  constructor(
    private readonly loginService = new LoginService(),
  ) {}

  public async login(req: Request, res: Response) {
    const token = await this.loginService.login(req.body as UserCredentials);
    return res.status(httpStatusCode.OK).json({ token });
  }

  public async validate(_req: Request, res: Response) {
    const { id } = res.locals.user;
    const role = await this.loginService.validate(id);
    return res.status(httpStatusCode.OK).json({ role });
  }
}

export default LoginController;
