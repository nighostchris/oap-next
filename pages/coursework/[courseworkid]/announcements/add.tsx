import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../../components/root-layout/Root';
import AddAnnouncement from '../../../../components/coursework/AddAnnouncement';

const AddAnnouncementPage: NextPage = () => {
  return (
    <Root>
      <AddAnnouncement />
    </Root>
  );
};

export default AddAnnouncementPage;
