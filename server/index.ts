import express from 'express';
import next from 'next';
// import { auth } from 'express-openid-connect';
// import jwt from 'jsonwebtoken';

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
  //   handleCallback: async function (req, res) {
  //     const queryParams = Object.assign(req.query, req.params);
  //     jwt.verify(req.openidTokens, '7wKJNYFaKKg4FxUdi8_R75GGYsiWezvAbcdN1uSumE4', (err: any, payload: any) => {
  //       if (payload) {
  //         const hasuraPayload = {
  //           'iss': payload.iss,
  //           'sub': payload.sub,
  //           'exp': payload.exp,
  //           'iat': payload.iat,
  //           'nbf': payload.nbf,
  //           'name': payload.name,
  //           'departmentNumber': payload.departmentNumber,
  //           'email': payload.email,
  //           'https://hasura.io/jwt/claims': {
  //             'x-hasura-allowed-roles': ['student', 'staff', 'admin'],
  //             'x-hasura-default-role': 'student',
  //           },
  //         };
  //         const resignedToken = jwt.sign(hasuraPayload, 'testing', { algorithm: 'RS256' });
  //         app.render(req, res, '/', queryParams);
  //       } else {
  //         app.render(req, res, '/_error', Object.assign(queryParams, { statusCode: 403 }));
  //       }
  //     });
  //   },
  // }));

  server.all('*', (req, res) => requestHandler(req, res));

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready and serving at port ${port}`);
  });
});
