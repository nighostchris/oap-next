import * as React from 'react';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import { useRouter } from 'next/router';
import {
  H3, H5, Label2, Label3,
} from 'baseui/typography';
import { FileZip } from 'styled-icons/icomoon/FileZip';
import { Error } from 'styled-icons/boxicons-regular/Error';
import { XCircle } from 'styled-icons/boxicons-regular/XCircle';
import { CheckCircle } from 'styled-icons/boxicons-regular/CheckCircle';

const Dashboard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'calc(100% - 64px)',
});

const TabContainer = styled('div', {
  width: '100%',
  display: 'flex',
  marginBottom: '20px',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
});

const StyledButton = styled(Button, {
  padding: '5px 8px !important',
  width: '200px',
  fontSize: '14px !important',
  borderRadius: '5px !important',
  backgroundColor: '#1e88e5 !important',
});

const CourseCode = styled(H3, {
  marginBlockStart: '0px',
  marginBlockEnd: '10px',
});

const AssignmentTitle = styled(H5, {
  marginBlockStart: '0px',
});

const DueDate = styled(Label2, {

});

const SubmissionContainer = styled('div', {
  width: '60%',
  marginTop: '10px',
  marginBottom: '20px',
  minWidth: '700px',
  overflowY: 'auto',
});

const RecordContainer = styled('div', {
  display: 'flex',
  margin: '10px 0px',
  flexDirection: 'row',
  alignItems: 'center',
});

const ZipLogo = styled(FileZip, {
  width: '10%',
});

const SubName = styled(Label3, {
  width: '30%',
});

const SubSize = styled(Label3, {
  width: '20%',
  textAlign: 'right',
});

const SubTime = styled(Label3, {
  width: '30%',
  textAlign: 'right',
});

const StatusLogo = styled('div', {
  width: '10%',
  textAlign: 'right',
});

let submission = [{
  name: 'assignment1.zip',
  size: '273KB',
  time: new Date(2019, 9, 16, 10, 30, 27),
  status: 'success',
},
{
  name: 'assignment1.zip',
  size: '260KB',
  time: new Date(2019, 9, 16, 10, 27, 27),
  status: 'success',
},
{
  name: 'assignment1.zip',
  size: '256KB',
  time: new Date(2019, 9, 16, 10, 23, 27),
  status: 'warning',
},
{
  name: 'assignment1.zip',
  size: '232KB',
  time: new Date(2019, 9, 13, 10, 20, 27),
  status: 'success',
},
{
  name: 'assignment1.zip',
  size: '19KB',
  time: new Date(2019, 9, 3, 8, 10, 16),
  status: 'error',
},
];

submission = [...submission, ...submission, ...submission, ...submission];

const CourseDashboard: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid, assignmentid } = router.query;

  return (
    <Dashboard>
      <CourseCode>{String(courseid).toUpperCase()}</CourseCode>
      <AssignmentTitle>
        {`Assignment ${String(assignmentid).toUpperCase()}`}
      </AssignmentTitle>
      <TabContainer>
        <StyledButton>Upload Local File</StyledButton>
        <StyledButton>Upload Via OneDrive</StyledButton>
        <StyledButton>Upload Via Dropbox</StyledButton>
        <StyledButton>Upload Via Google Drive</StyledButton>
      </TabContainer>
      <DueDate>
        {`
          Due Date:
          2019-11-15 23:59:59
        `}
      </DueDate>
      <SubmissionContainer>
        {
          submission.map((s, index) => (
            <RecordContainer key={`sub-${index}`}>
              <ZipLogo size={20} />
              <SubName>{s.name}</SubName>
              <SubSize>{s.size}</SubSize>
              <SubTime>
                {`
                  ${s.time.getHours()}:${s.time.getMinutes()}:${s.time.getSeconds()}
                `}
              </SubTime>
              <StatusLogo>
                { s.status === 'success' && <CheckCircle size={24} color="green" /> }
                { s.status === 'warning' && <Error size={24} color="#f9a825" /> }
                { s.status === 'error' && <XCircle size={24} color="red" /> }
              </StatusLogo>
            </RecordContainer>
          ))
        }
      </SubmissionContainer>
    </Dashboard>
  );
};

export default CourseDashboard;
