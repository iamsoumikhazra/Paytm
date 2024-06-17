import express from 'express';
import createError from 'http-errors';

const errorRouter = express.Router();

errorRouter.get('/', (req, res, next) => {
  next(createError(400, 'This is a bad request'));
});

export default errorRouter;
