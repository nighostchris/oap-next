import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../components/root-layout/Root';
import StudentManage from '../../components/manage/StudentManage';

const UserManagePage: NextPage = () => (
  <Root>
    <StudentManage />
  </Root>
);

export default UserManagePage;
