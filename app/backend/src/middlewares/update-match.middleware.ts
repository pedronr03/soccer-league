import { RequestHandler } from 'express';
import CustomError from '../errors/CustomError';
import { updateMatchSchema } from '../schemas/matches.schema';

const updateMatchMiddleware: RequestHandler = (req, _res, next) => {
  const { error } = updateMatchSchema.validate(req.body);
  if (error) {
    throw new CustomError(400, 'BAD_REQUEST', error.message);
  }
  next();
};

export default updateMatchMiddleware;
