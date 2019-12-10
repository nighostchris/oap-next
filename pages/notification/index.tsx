import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../components/root-layout/Root';
import NotificationLayout from '../../components/notification/NotificationLayout';

const NotificationPage: NextPage = () => (
  <Root>
    <NotificationLayout />
  </Root>
);

export default NotificationPage;
