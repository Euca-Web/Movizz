import { Request, Response, NextFunction } from 'express';

export const validatePagination = (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (page < 1) {
    return res.status(400).json({ error: 'Page must be greater than 0' });
  }

  if (limit < 1 || limit > 100) {
    return res.status(400).json({ error: 'Limit must be between 1 and 100' });
  }

  next();
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
};
