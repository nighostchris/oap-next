import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../components/root-layout/Root';
import SettingsTab from '../../../components/coursework/SettingsTab';

const CourseworkSettingsPage: NextPage = () => (
  <Root>
    <SettingsTab />
  </Root>
);

export default CourseworkSettingsPage;
