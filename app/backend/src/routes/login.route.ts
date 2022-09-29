import { Router } from 'express';
import loginValidate from '../middlewares/login-validate.middleware';
import LoginController from '../controllers/login.controller';
import tokenValidate from '../middlewares/token-validate.middleware';

const loginRoute = Router();

const loginController = new LoginController();

loginRoute.post('/', loginValidate, (req, res) => loginController.login(req, res));

loginRoute.get('/validate', tokenValidate, (req, res) => loginController.validate(req, res));

export default loginRoute;
