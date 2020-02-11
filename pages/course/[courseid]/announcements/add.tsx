import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../../components/root-layout/Root';
import AddAnnouncement from '../../../../components/course/AddAnnouncement';

const AddAnnouncementPage: NextPage = () => {
  return (
    <Root>
      <AddAnnouncement />
    </Root>
  );
};

export default AddAnnouncementPage;
