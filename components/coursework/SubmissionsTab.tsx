import * as React from 'react';
import Dropzone from 'react-dropzone';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Card from '../global/Card';
import Table from '../global/Table';
import CourseworkDashboardHeader from './CourseworkDashboardHeader';
import { timestampConverter } from '../../utilities/timestampConverter';

const GET_SUBMISSIONS_TAB_DATA = gql`
  query getSubmissionsTabData($id: bigint!) {
    assignments(where: {id: {_eq: $id}}) {
      created_at
      assignment_configs {
        due_at
      }
    }
    submissions(where: {
      assignment_config: {
        assignment_id: {
          _eq: $id
        }
      },
      user: {
        itsc: {
          _eq: "kristopher"
        }
      }
    }) {
      upload_name
      size
      created_at
      fail_reason
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
  const submissionsList: any[] = [];
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

  if (error) {
    console.log(error);
  }

  if (!loading) {
    infoList.push({
      category: 'Created',
      value: timestampConverter(new Date(data.assignments[0].created_at), false)
    }, {
      category: 'Due At',
      value: timestampConverter(new Date(data.assignments[0].assignment_configs[0].due_at), true)
    });

    data.submissions.forEach((submission: any) => {
      let status;

      if (submission.fail_reason === null) {
        status = 'success'
      } else {
        status = 'failure'
      }

      submissionsList.push(tbodyGenerator(
        submission.upload_name,
        submission.size,
        timestampConverter(new Date(submission.created_at), true),
        status
      ));
    })
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
              tbody={submissionsList}
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
