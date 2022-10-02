import { RequestHandler } from 'express';
import CustomError from '../errors/CustomError';
import { createMatchSchema } from '../schemas/matches.schema';

const createMatchMiddleware: RequestHandler = (req, _res, next) => {
  const { error } = createMatchSchema.validate(req.body);
  if (error) {
    throw new CustomError(400, 'BAD_REQUEST', error.message);
  }
  next();
};

export default createMatchMiddleware;
