const timestamp = () => new Date().toISOString();

export default {
  log: message => console.log(`[${timestamp()}]`, message),
  err: message => console.error(`[${timestamp()}]`, message),
  req: (req, _res, next) => {
    console.log(`[${timestamp()}] ${req.ip} ${req.path}`);
    next();
  },
};
