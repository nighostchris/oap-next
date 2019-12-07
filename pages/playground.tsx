import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import DNDPlayground from '../components/DND/DNDPlayground';

const Playground: NextPage = () => (
  <Layout>
    <DNDPlayground />
  </Layout>
);

export default Playground;
