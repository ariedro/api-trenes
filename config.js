export default {
  url: 'https://api-servicios.sofse.gob.ar/v1',
  auth: '/auth/authorize',
  cipher: [
    { in: /a/g, out: ['#t', '#j'] },
    { in: /e/g, out: ['#x', '#p'] },
    { in: /i/g, out: ['#f', '#w'] },
    { in: /o/g, out: ['#l', '#8'] },
    { in: /u/g, out: ['#7', '#0'] },
    { in: /=/g, out: ['#g', '#v'] },
  ],
  cacheFileName: 'token.dat',
};
