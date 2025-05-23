import fetch from 'node-fetch';
import config from './config.js';
import generateCredentials from './auth.js';
import cache from './cache.js';
import logger from './logger.js';

const UNAUTH = 'Unauthorized';

class Api {
  constructor() {
    this.token = cache.load();
  }

  async generateToken() {
    const { token } = await this.internalRequest({
      method: 'POST',
      body: generateCredentials(),
      path: config.auth,
    });
    this.token = token;
    cache.save(token);
    logger.log(`Generated new token: ${token}`);
  }

  async request(params) {
    try {
      if (this.isTokenExpired()) {
        throw new Error(UNAUTH);
      }
      const res = await this.internalRequest(params);
      return res;
    } catch (err) {
      if (err.message === UNAUTH) {
        await this.generateToken();
        const res = await this.internalRequest(params);
        return res;
      }
      throw err;
    }
  }

  async internalRequest({ method = 'GET', body, path, query = {} }) {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    if (this.token) {
      options.headers.Authorization = this.token;
    }

    const url = new URL(`${config.url}${path}`);
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(res.status === 403 ? UNAUTH : res.statusText);
    }
    const resJson = await res.json();
    return resJson;
  }

  isTokenExpired() {
    if (!this.token) {
      return true;
    }
    const tokenData = JSON.parse(Buffer.from(this.token.split('.')[1], 'base64').toString());
    const expirationDate = tokenData.exp * 1000;
    const now = new Date().getTime();
    return now > expirationDate;
  }
}

export default Api;
