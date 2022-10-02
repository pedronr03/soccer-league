import { RequestHandler } from 'express';
import CustomError from '../errors/CustomError';
import loginSchema from '../schemas/login.schema';

const loginValidate: RequestHandler = (req, _res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) throw new CustomError(400, 'BAD_REQUEST', 'All fields must be filled');
  next();
};

export default loginValidate;
