import express from 'express';
import Api from './api.js';
import logger from './logger.js';

const app = express();
const api = new Api();

app.set('trust proxy', true);

app.get('*', logger.req, (req, res) =>
  api
    .request(req)
    .then(apiRes => res.send(apiRes))
    .catch(err => {
      logger.err(err);
      res.status(500).send(err.message);
    })
);

app.listen(3056);
