import fetch from 'node-fetch';
import express from 'express';
import config from './config.js';
import generateCredentials from './auth.js';

const app = express();

const apiRequest = async ({ method, body, token, path, query = {} }) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  if (token) {
    options.headers['Authorization'] = token;
  }

  const url = new URL(`${config.url}${path}`);
  Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const resJson = await res.json();
  return resJson;
};

const generateToken = () =>
  apiRequest({ method: 'POST', body: generateCredentials(), path: config.auth });

const redirectRequest = params => apiRequest({ method: 'GET', ...params });

app.get('*', async function (req, res) {
  try {
    const { token } = await generateToken();
    const { path, query } = req;

    const apiResponse = await redirectRequest({ path, query, token });

    res.send(apiResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.listen(3000);
