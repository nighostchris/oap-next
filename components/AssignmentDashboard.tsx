import * as React from 'react';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import { useRouter } from 'next/router';
import {
  H3, H5, H6, Label2, Label3,
} from 'baseui/typography';
import { FileZip } from 'styled-icons/icomoon/FileZip';
import { Error } from 'styled-icons/boxicons-regular/Error';
import { XCircle } from 'styled-icons/boxicons-regular/XCircle';
import { CheckCircle } from 'styled-icons/boxicons-regular/CheckCircle';

const Dashboard = styled('div', {
  display: 'flex',
  overflowY: 'auto',
  alignItems: 'center',
  flexDirection: 'column',
  height: 'calc(100% - 64px)',
  '::-webkit-scrollbar': {
    width: '.8rem',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '.8rem',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
    backgroundColor: 'rgba(128, 128, 128, .7)',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)',
  },
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
  width: '80%',
  marginTop: '10px',
  background: 'white',
  borderRadius: '8px',
  marginBottom: '20px',
  boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.2)',
});

const Tag = styled(H6, {
  background: '#66bb6a',
  marginBlockEnd: '0px',
  marginBlockStart: '0px',
  width: 'calc(100% - 20px)',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  padding: '5px 0px 5px 20px',
});

const CategoryContainer = styled('div', {
  display: 'flex',
  background: 'white',
  flexDirection: 'row',
});

const Category = styled('div', {
  marginTop: '10px',
  textAlign: 'center',
  width: 'calc(25% - 2.8px)',
});

const BreaklineWrapper = styled('div', {
  display: 'flex',
  background: 'white',
  alignItems: 'center',
  flexDirection: 'column',
});

const Breakline = styled('div', {
  width: '95%',
  borderBottom: '1px solid grey',
});

const RecordContainer = styled('div', {
  display: 'flex',
  padding: '20px 0px',
  textAlign: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  ':nth-child(even)': {
    background: 'rgba(0, 0, 0, 0.3)',
  },
});

const RecordOuterWrapper = styled('div', {
  height: '450px',
  margin: '5px 0 5px 5px',
  background: 'white',
  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    width: '.8rem',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '.8rem',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
    backgroundColor: 'rgba(128, 128, 128, .7)',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)',
  },
});

const FileWrapper = styled('div', {
  width: '25%',
  display: 'flex',
  flexDirection: 'row',
});

const ZipLogo = styled(FileZip, {
  width: '40%',
});

const SubName = styled(Label3, {
  width: '60%',
  textAlign: 'center',
});

const SubSize = styled(Label3, {
  width: '25%',
});

const SubTime = styled(Label3, {
  width: '25%',
});

const StatusLogo = styled('div', {
  width: '25%',
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
        <Tag>Submission Details</Tag>
        <CategoryContainer>
          {
            ['Filename', 'Size', 'Time', 'Status'].map((c) => (
              <Category>
                <Label2
                  overrides={{
                    Block: {
                      style: {
                        fontWeight: 'bold',
                      },
                    },
                  }}
                >
                  {c}
                </Label2>
              </Category>
            ))
          }
        </CategoryContainer>
        <BreaklineWrapper>
          <Breakline />
        </BreaklineWrapper>
        <RecordOuterWrapper>
          {
            submission.map((s, index) => (
              <RecordContainer key={`sub-${index}`}>
                <FileWrapper>
                  <ZipLogo size={20} />
                  <SubName>{s.name}</SubName>
                </FileWrapper>
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
        </RecordOuterWrapper>
      </SubmissionContainer>
    </Dashboard>
  );
};

export default CourseDashboard;
