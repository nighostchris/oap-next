import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import StudentManage from '../../components/manage/StudentManage';

const StudentManagePage: NextPage = () => (
  <Layout>
    <StudentManage />
  </Layout>
);

export default StudentManagePage;
