import * as React from 'react';
import Dropzone from 'react-dropzone';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Card from '../global/Card';
import Table from '../global/Table';
import CourseworkDashboardHeader from './CourseworkDashboardHeader';
import { timestampConverter } from '../../utilities/timestampConverter';

const thead = ['Filename', 'Size', 'Submission Time', 'Status'];

const tbodyGenerator = (name: string, size: string, time: string, status: string) => (
  <>
    <td><i className="fas fa-file-archive" style={{ marginRight: '10px' }} />{name}</td>
    <td>{size}</td>
    <td>{time}</td>
    <td>
      <i
        className={status === 'success' ? 'fas fa-check-circle' : (status === 'warning'
          ? 'fas fa-exclamation-triangle' : 'fas fa-times-circle')}
        style={{ color: status === 'success' ? '#00A660' : (status === 'warning' ? '#F6C343' : '#D01A3B') }}
      />
    </td>
  </>
);

const tbody = () => {
  const temp = [];
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      temp.push(tbodyGenerator('assignment1.zip', '273KB', 'Dec 11 2019 10:30:27', 'success'));
    } else if (i % 3 === 0) {
      temp.push(tbodyGenerator('assignment2.zip', '36KB', 'Dec 11 2019 10:30:27', 'warning'));
    } else {
      temp.push(tbodyGenerator('assignment3.zip', '185KB', 'Dec 11 2019 10:30:27', 'error'));
    }
  }
  return temp;
};

const GET_SUBMISSIONS_TAB_DATA = gql`
  query getSubmissionsTabData($id: bigint!) {
    assignments(where: {id: {_eq: $id}}) {
      created_at
    }
  }
`;

const SubmissionsTab: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseworkid } = router.query;
  const { loading, error, data } = useQuery(GET_SUBMISSIONS_TAB_DATA, {
    variables: { id: courseworkid }
  });
  const infoList = [];

  if (error) {
    console.log(error);
  }

  if (!loading) {
    infoList.push({
      category: 'Created',
      value: timestampConverter(new Date(data.assignments[0].created_at), false),
    });
  }

  return(
    <>
      <CourseworkDashboardHeader activeTab={1} />
      <div className="container-fluid">
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {
            ({ getRootProps, getInputProps }) => (
              <section className="dropzone dropzone-single mb-3 dz-clickable">
                <div {...getRootProps()} className="dz-default dz-message">
                  <input {...getInputProps()} />
                  <p className="mb-0">Drag here and upload</p>
                </div>
              </section>
            )
          }
        </Dropzone>
        <div className="row">
          <div className="col-12 col-xl-9">
            <Table
              thead={thead}
              tbody={tbody()}
              bordered
              textAlign="center"
            />
          </div>
          <div className="col-12 col-xl-3">
            <Card
              type="info"
              infoList={infoList}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionsTab;
