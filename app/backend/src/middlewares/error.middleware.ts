import httpStatusCode from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import CustomError from '../errors/CustomError';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
      code: err.code,
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(httpStatusCode.UNAUTHORIZED).json({
      message: 'Invalid token',
      code: 'UNAUTHORIZED',
    });
  }

  return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Error',
    code: 'INTERNAL_ERROR',
  });
};

export default errorMiddleware;
