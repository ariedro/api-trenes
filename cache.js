import config from './config.js';
import fs from 'fs';

const ENOENT = 'ENOENT';

export default {
  save: data => fs.writeFileSync(config.cacheFileName, data),
  load: () => {
    try {
      const data = fs.readFileSync(config.cacheFileName).toString();
      return data;
    } catch (err) {
      if (err.code == ENOENT) {
        fs.writeFileSync(config.cacheFileName, '');
        return '';
      }
      throw err;
    }
  },
};
