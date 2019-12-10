import * as React from 'react';
import { NextPage } from 'next';
import Root from '../components/root-layout/Root';
import DNDPlayground from '../components/DND/DNDPlayground';

const Playground: NextPage = () => (
  <Root>
    <DNDPlayground />
  </Root>
);

export default Playground;
