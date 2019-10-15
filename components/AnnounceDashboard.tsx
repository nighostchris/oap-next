import * as React from 'react'
import { styled } from 'baseui'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { Button } from 'baseui/button';
import { Label1, Label3 } from 'baseui/typography';

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
  padding: '8px',
  width: '200px',
  borderRadius: '5px !important',
  backgroundColor: '#9e9e9e !important',
});

const Container = styled('div', {
  width: '90%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#eeeeee',
  border: '1px solid #bdbdbd',
  height: 'calc(100% - 208px)',
  padding: '20px 0',
  borderRadius: '5px !important',
});

const SubContainer = styled('div', {
  width: '90%',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '20px',
  backgroundColor: '#e0e0e0',
  border: '1px solid #9e9e9e',
});

const LeftContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const AssignmentTag = styled(Label1, {
  width: '90%',
  marginBottom: '5px',
  fontWeight: "bolder",
});

const CourseTitle = styled(AssignmentTag, {
  fontSize: '22px',
  marginBottom: '20px !important',
});

const Title = styled(Label3, {
  fontWeight: 700,
});

const Announcer = styled(Label3, {

});

const Content = styled(Label3, {

});

const Publish = styled(Label3, {

});

const AnnounceDashboard: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid } = router.query;

  return (
    <Dashboard>
      <TabContainer>
        <StyledButton>Assignments</StyledButton>
        <Link href={`/courses/${courseid}/announcement`}>
          <StyledButton>Announcements</StyledButton>
        </Link>
        <StyledButton>Grades</StyledButton>
      </TabContainer>
      <CourseTitle>{String(courseid).toUpperCase()}</CourseTitle>
      <Container>
        <SubContainer>
          <LeftContainer>
            <Title>Solutions for Assignment 4 are now available</Title>
            <Announcer>TA 1</Announcer>
            <Content>You can find the solutions below: Ass4_Fall_2017_solutions.pdf.</Content>
          </LeftContainer>
          <Publish>2019-11-26 9:00</Publish>
        </SubContainer>
      </Container>
    </Dashboard>
  )
}

export default AnnounceDashboard
