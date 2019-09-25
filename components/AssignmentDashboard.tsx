import * as React from 'react'
//import Link from 'next/link';
import { styled } from 'baseui'
import { Button } from 'baseui/button'

const Dashboard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'calc(100% - 64px)',
});

const TabContainer = styled('div', {
  width: '100%',
  display: 'flex',
  marginBottom: '40px',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
});

const StyledButton = styled(Button, {
  width: '200px',
  borderRadius: '5px !important',
  padding: '8px 8px 8px 8px',
  backgroundColor: '#9e9e9e !important',
});

const Container = styled('div', {
  width: '90%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#eeeeee',
  border: '1px solid #bdbdbd',
  height: 'calc(100% - 128px)',
  borderRadius: '5px !important',
});

const SubContainer = styled('div', {
  width: '90%',
  marginBottom: '20px',
  backgroundColor: '#757575',
});

const AssignmentDashboard: React.FunctionComponent = () => {
  return (
    <Dashboard>
      <TabContainer>
        <StyledButton>Assignments</StyledButton>
        <StyledButton>Announcements</StyledButton>
        <StyledButton>Grades</StyledButton>
      </TabContainer>
      <Container>
        <SubContainer>
          <p>Hello</p>
        </SubContainer>
        <SubContainer>
          <p>Hello</p>
        </SubContainer>
        <SubContainer>
          <p>Hello</p>
        </SubContainer>
      </Container>     
    </Dashboard>
  )
}

export default AssignmentDashboard
