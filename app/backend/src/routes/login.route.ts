import { Router } from 'express';
import loginValidate from '../middlewares/login-validate.middleware';
import LoginController from '../controllers/login.controller';
import tokenValidate from '../middlewares/token-validate.middleware';

class LoginRoute {
  constructor(
    public readonly route = Router(),
    private readonly loginController = new LoginController(),
  ) {
    this.setRoutes();
  }

  private setRoutes() {
    this.route.post(
      '/',
      loginValidate,
      (req, res) => this.loginController.login(req, res),
    );
    this.route.get(
      '/validate',
      tokenValidate,
      (req, res) => this.loginController.validate(req, res),
    );
  }
}

export default LoginRoute;
