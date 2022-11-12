import express from 'express';
import Api from './api.js';

const app = express();
const api = new Api();

app.get('*', (req, res) =>
  api
    .request(req)
    .then(apiRes => res.send(apiRes))
    .catch(err => {
      console.error(err);
      res.status(500).send(err.message);
    })
);

app.listen(3000);
