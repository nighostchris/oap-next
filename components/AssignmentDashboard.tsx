import * as React from 'react'
import { styled } from 'baseui'
import { Button } from 'baseui/button'
// import { useRouter } from 'next/router'
// import { Label1, Label3, Label4 } from 'baseui/typography'

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
  padding: '5px 8px',
  width: '200px',
  fontSize: '14px !important',
  borderRadius: '5px !important',
  backgroundColor: '#1e88e5 !important',
});

/*
const SubmitButton = styled(Button, {
  width: '150px',
  marginLeft: 'auto',
  marginRight: '40px',
  fontWeight: "bolder",
  fontSize: '14px !important',
  padding: '5px !important',
  borderRadius: '5px !important',
  backgroundColor: '#4caf50 !important',
});
*/

const CourseDashboard: React.FunctionComponent = () => {
  // const router = useRouter();
  // const { courseid } = router.query;

  return (
    <Dashboard>
      <TabContainer>
        <StyledButton>Upload Local File</StyledButton>
        <StyledButton>Upload Via OneDrive</StyledButton>
        <StyledButton>Upload Via Dropbox</StyledButton>
        <StyledButton>Upload Via Google Drive</StyledButton>
      </TabContainer>
    </Dashboard>
  )
}

export default CourseDashboard
