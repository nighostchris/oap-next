import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../components/root-layout/Root';
import NotiContainer from '../../components/notification/NotiContainer';

const Notification: NextPage = () => (
  <Root>
    <NotiContainer />
  </Root>
);

export default Notification;
