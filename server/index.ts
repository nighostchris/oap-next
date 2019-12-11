import express from 'express';
import session from 'express-session';
import next from 'next';
const CASAuthentication = require('express-cas-authentication');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const requestHandler = app.getRequestHandler();

const cas = new CASAuthentication({
  cas_url     : 'https://cas.ust.hk/cas',
  cas_version: '2.0',
  service_url : 'http://oap.ust.dev:3000'
});

app.prepare().then(() => {
  const server = express();
  server.use(session({
    secret: 'super secret key',
    resave: false,
    saveUninitialized: true
  }));

  server.all('*', (req, _, next) => {
    if (process.env.NODE_ENV === 'production' && req.session) {
      cas.bounce();
    } else {
      next();
    }
  }, (req, res) => {
    return requestHandler(req, res);
  });
  

  server.listen(port, () => {
    console.log(`> Ready and serving at port ${port}`);
  });
});