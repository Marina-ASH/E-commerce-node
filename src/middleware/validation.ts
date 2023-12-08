import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validationMiddleware = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validationMiddleware;
