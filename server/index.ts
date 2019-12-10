import express from 'express';
import cookieParser from 'cookie-parser';
import next from 'next';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const requestHandler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  server.get('/auth/callback', (req, res) => {
    res.cookie('ticket', req.query.ticket);
    console.log(req.query.ticket);
    res.redirect('/dashboard');
  });

  server.all('*', (req, res, next) => {
    if (req.cookies.ticket) {
      next();
    } else {
      res.redirect('https://cas.ust.hk/cas/login?service=http://oap.ust.dev:3000/auth/callback');
    }
  } ,(req, res) => {
    return requestHandler(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready and serving at port ${port}`);
  });
});