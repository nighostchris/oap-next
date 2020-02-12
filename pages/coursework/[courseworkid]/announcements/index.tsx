import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../../components/root-layout/Root';
import AnnouncementsTab from '../../../../components/coursework/AnnouncementsTab';

const CourseworkAnnouncementsPage: NextPage = () => (
  <Root>
    <AnnouncementsTab />
  </Root>
);

export default CourseworkAnnouncementsPage;
