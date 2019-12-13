import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../components/root-layout/Root';
import NotiDashboard from '../../components/notification/NotiDashboard';

const NotificationPage: NextPage = () => (
  <Root>
    <NotiDashboard />
  </Root>
);

export default NotificationPage;
