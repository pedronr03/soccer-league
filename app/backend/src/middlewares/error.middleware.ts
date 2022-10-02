import httpStatusCode from 'http-status-codes';
import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import CustomError from '../errors/CustomError';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
      code: err.code,
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(httpStatusCode.UNAUTHORIZED).json({
      message: 'Token must be a valid token',
      code: 'UNAUTHORIZED',
    });
  }

  return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Error',
    code: 'INTERNAL_ERROR',
  });
};

export default errorMiddleware;
