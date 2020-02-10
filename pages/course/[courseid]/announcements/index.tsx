import { NextPage } from 'next';
import Root from '../../../../components/root-layout/Root';
import AnnouncementsTab from '../../../../components/course/AnnouncementsTab';

const CourseAnnouncementsPage: NextPage = () => (
  <Root>
    <AnnouncementsTab />
  </Root>
);

export default CourseAnnouncementsPage;
