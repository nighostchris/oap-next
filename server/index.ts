import express from 'express';
import next from 'next';
// import { auth } from 'express-openid-connect';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const requestHandler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  // server.use(auth({
  //   issuerBaseURL: 'https://castest.ust.hk/cas/oidc',
  //   baseURL: 'https://oap.ust.dev',
  //   clientID: '20003',
  //   clientSecret: '7wKJNYFaKKg4FxUdi8_R75GGYsiWezvAbcdN1uSumE4',
  //   appSessionSecret: 'testingonly',
  //   authorizationParams: {
  //     response_type: 'token',
  //     scope: 'openid email profile',
  //   },
  // }));

  server.all('*', (req, res) => requestHandler(req, res));

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready and serving at port ${port}`);
  });
});
