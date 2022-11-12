import config from './config.js';

class Encoder {
  constructor(str) {
    this.str = str;
  }
  base64() {
    this.str = Buffer.from(this.str).toString('base64');
    return this;
  }
  cipher(step) {
    this.str = config.cipher.reduce((acc, curr) => acc.replace(curr.in, curr.out[step]), this.str);
    return this;
  }
  reverse() {
    this.str = this.str.split('').reverse().join('');
    return this;
  }
  timestamp() {
    const date = new Date().toISOString().split(/-|T|:/);
    this.str = `${date[0]}${date[1]}${date[2]}sofse`;
    return this;
  }
  toString() {
    return this.str;
  }
  url() {
    this.str = encodeURIComponent(this.str);
    return this;
  }
}

const generateUsername = () => new Encoder().timestamp().base64().toString();

const encodePass = str =>
  new Encoder(str).base64().cipher(0).reverse().base64().cipher(1).reverse().url().toString();

const generateCredentials = () => {
  const username = generateUsername();
  const password = encodePass(username);
  return { username, password };
};

export default generateCredentials;
