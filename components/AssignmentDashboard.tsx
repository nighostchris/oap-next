import * as React from 'react';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import {
  H5, H6, Label2, Label3,
} from 'baseui/typography';
import { FileUploader } from 'baseui/file-uploader';
import { FileZip } from 'styled-icons/icomoon/FileZip';
import { Error } from 'styled-icons/boxicons-regular/Error';
import { XCircle } from 'styled-icons/boxicons-regular/XCircle';
import { CheckCircle } from 'styled-icons/boxicons-regular/CheckCircle';
import { printDate } from '../utils/helper';
import Link from 'next/link';

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

const UploadContainer = styled('div', {
  width: '90%',
  display: 'flex',
  marginTop: '30px',
  background: 'white',
  borderRadius: '8px',
  flexDirection: 'row',
  boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.2)',

});

const AssignmentDetails = styled('div', {
  width: 'calc(30% - 40px)',
  display: 'flex',
  marginLeft: '40px',
  flexDirection: 'column',
  justifyContent: 'center',
});

const FileUploaderWrapper = styled('div', {
  width: '40%',
  display: 'flex',
  margin: '10px 0',
  alignItems: 'center',
});

const TabContainer = styled('div', {
  width: '30%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
});

const StyledButton = styled(Button, {
  width: '200px',
  padding: '5px 8px !important',
  fontSize: '14px !important',
  borderRadius: '5px !important',
  backgroundColor: '#1e88e5 !important',
});

const CourseCode = styled(H5, {
  marginBottom: '10px',
  marginBlockEnd: '0px',
  marginBlockStart: '0px',
});

const AssignmentID = styled(H5, {
  marginBottom: '10px',
  marginBlockEnd: '0px',
  marginBlockStart: '0px',
});

const AssignmentTitle = styled(AssignmentID, {
  marginBottom: '25px !important',
});

const SubmissionContainer = styled('div', {
  width: '80%',
  marginTop: '30px',
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
  color: 'blue',
  textAlign: 'center',
  ':hover': {
    cursor: 'pointer',
  },
});

const SubSize = styled(Label3, {
  width: '25%',
});

const SubTime = styled(Label3, {
  width: '25%',
});

const StatusLogo = styled('div', {
  width: '25%',
  ':hover': {
    cursor: 'pointer',
  },
});

const StatusBar = styled('div', {
  width: '80%',
  display: 'flex',
  flexDirection: 'row',
});

const Description = styled(Label2, {
  marginLeft: '5px',
  marginRight: '40px',
});

const data = {
  id: 1,
  courseid: 'comp2012',
  title: 'Tic Tac Toe',
  dueDate: new Date(2019, 10, 16, 23, 59, 59),
};

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
  return (
    <Dashboard>
      <UploadContainer>
        <AssignmentDetails>
          <CourseCode>{String(data.courseid).toUpperCase()}</CourseCode>
          <AssignmentID>
            {`Assignment ${String(data.id).toUpperCase()}`}
          </AssignmentID>
          <AssignmentTitle>
            {data.title}
          </AssignmentTitle>
          <Label2
            overrides={{
              Block: {
                style: {
                  fontWeight: 'bold',
                },
              },
            }}
          >
            {`Due: ${printDate(data.dueDate)}`}
          </Label2>
        </AssignmentDetails>
        <FileUploaderWrapper>
          <FileUploader
            overrides={{
              Root: {
                style: {
                  width: '100%',
                },
              },
            }}
          />
        </FileUploaderWrapper>
        <TabContainer>
          <StyledButton>Upload Via OneDrive</StyledButton>
          <StyledButton>Upload Via Dropbox</StyledButton>
          <StyledButton>Upload Via Google Drive</StyledButton>
        </TabContainer>
      </UploadContainer>
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
                <Link href="/submission/1">
                  <StatusLogo>
                    { s.status === 'success' && <CheckCircle size={24} color="green" /> }
                    { s.status === 'warning' && <Error size={24} color="#f9a825" /> }
                    { s.status === 'error' && <XCircle size={24} color="red" /> }
                  </StatusLogo>
                </Link>
              </RecordContainer>
            ))
          }
        </RecordOuterWrapper>
      </SubmissionContainer>
      <StatusBar>
        <CheckCircle size={24} color="green" />
        <Description
          overrides={{
            Block: {
              style: {
                fontWeight: 'bold',
              },
            },
          }}
        >
          Successful
        </Description>
        <Error size={24} color="#f9a825" />
        <Description
          overrides={{
            Block: {
              style: {
                fontWeight: 'bold',
              },
            },
          }}
        >
          Warning
        </Description>
        <XCircle size={24} color="red" />
        <Description
          overrides={{
            Block: {
              style: {
                fontWeight: 'bold',
              },
            },
          }}
        >
          Error
        </Description>
      </StatusBar>
    </Dashboard>
  );
};

export default CourseDashboard;
