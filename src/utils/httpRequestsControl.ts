import {NextFunction, Request, Response} from 'express';

export const allowOnlyPut = (req: Request, res: Response, next: NextFunction) => {

  if (req.method !== 'PUT') {

    return res.status(400).send(`Method ${req.method} not allowed. Only accepts PUT method.`);

  }
  return next();

};

export const allowOnlyPost = (req: Request, res: Response, next: NextFunction) => {

  if (req.method !== 'POST') {

    return res.status(400).send(`Method ${req.method} not allowed. Only accepts POST method.`);

  }
  return next();

};

