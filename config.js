export default {
  url: 'https://apiarribos.sofse.gob.ar/v1',
  auth: '/auth/authorize',
  cipher: [
    { in: /a/g, out: ['#t', '#t'] },
    { in: /e/g, out: ['#x', '#p'] },
    { in: /i/g, out: ['#f', '#w'] },
    { in: /o/g, out: ['#l', '#8'] },
    { in: /u/g, out: ['#7', '#0'] },
    { in: /=/g, out: ['#g', '#v'] },
  ],
};
