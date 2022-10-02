import { RequestHandler } from 'express';
import { validateAccessToken } from '../utils/jwt';
import CustomError from '../errors/CustomError';

const tokenValidate: RequestHandler = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) throw new CustomError(404, 'NOT_FOUND', 'Token not found');
  const decoded = validateAccessToken(token);
  res.locals.user = decoded;
  next();
};

export default tokenValidate;
