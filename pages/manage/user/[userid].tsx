import * as React from 'react';
import { styled } from 'baseui';
import { NextPage } from 'next';
import { Avatar } from 'baseui/avatar';
import { Label2 } from 'baseui/typography';
import Root from '../../../components/root-layout/Root';

const Container = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 'calc(100% - 64px)',
  justifyContent: 'space-evenly',
});

const Left = styled('div', {
  width: '25%',
  height: '80%',
  display: 'flex',
  borderRadius: '5px',
  background: 'white',
  alignItems: 'center',
  flexDirection: 'column',
});

const Right = styled('div', {
  width: '65%',
  height: '80%',
  borderRadius: '5px',
  background: 'white',
});

const Header = styled('div', {
  width: '100%',
  height: '40px',
  background: '#90a4ae',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
});

const HeaderTag = styled(Label2, {
  marginLeft: '15px',
  lineHeight: '40px',
});

const InfoWrapper = styled('div', {
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
});

const StyledInfo = styled(Label2, {
  margin: '10px 0',
});

const Table = styled('div', {
  width: '100%',
  height: 'calc(100% - 40px)',
});

const StudentList = styled('div', {
  display: 'flex',
  overflowY: 'scroll',
  maxHeight: '400px',
  height: 'fit-content',
  flexDirection: 'column',
  '::-webkit-scrollbar': {
    width: '.8rem',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
    borderRadius: '.8rem',
    backgroundColor: 'rgba(128, 128, 128, .7)',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)',
  },
  '@media (min-height: 800px)': {
    maxHeight: 'calc(100% - 38px)',
  },
});

const HeaderRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  background: '#5ba8ec',
  width: 'calc(100% - 12px)',
});

const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'white',
  ':nth-child(odd)': {
    backgroundColor: '#e0e0e0',
  },
});

const Cell = styled(Label2, {
  flex: '1 1 0px',
  padding: '6px 0',
  textAlign: 'center',
  border: '1px solid black',
  borderRight: 'unset',
});

const Code = styled(Cell, {
  flex: '.7 .7 0px',
  border: '1px solid black',
  borderRight: 'unset',
});

const Section = styled(Cell, {
  flex: '.5 .5 0px',
  border: '1px solid black',
  borderRight: '1px solid black',
});

const SingleUserPage: NextPage = () => (
  <Root>
    <Container>
      <Left>
        <Header>
          <HeaderTag
            overrides={{
              Block: {
                style: {
                  fontWeight: 'bold',
                },
              },
            }}
          >
            User Info
          </HeaderTag>
        </Header>
        <Avatar
          name="Jane Doe"
          size="200px"
          src="https://api.adorable.io/avatars/285/10@adorable.io.png"
          overrides={{
            Root: {
              style: {
                margin: '20px 0',
              },
            },
          }}
        />
        <InfoWrapper>
          <StyledInfo>
            Name: Desmond Tsoi
          </StyledInfo>
          <StyledInfo>
            Email: desmond
          </StyledInfo>
          <StyledInfo>
            ID: 12345678
          </StyledInfo>
          <StyledInfo>
            Role: Admin
          </StyledInfo>
        </InfoWrapper>
      </Left>
      <Right>
        <Header>
          <HeaderTag
            overrides={{
              Block: {
                style: {
                  fontWeight: 'bold',
                },
              },
            }}
          >
            Courses
          </HeaderTag>
        </Header>
        <Table>
          <HeaderRow>
            <Code
              overrides={{
                Block: {
                  style: {
                    fontWeight: 'bold',
                  },
                },
              }}
            >
              Code
            </Code>
            <Cell
              overrides={{
                Block: {
                  style: {
                    fontWeight: 'bold',
                  },
                },
              }}
            >
              Title
            </Cell>
            <Cell
              overrides={{
                Block: {
                  style: {
                    fontWeight: 'bold',
                  },
                },
              }}
            >
              Instructor
            </Cell>
            <Section
              overrides={{
                Block: {
                  style: {
                    fontWeight: 'bold',
                  },
                },
              }}
            >
              Section
            </Section>
          </HeaderRow>
          <StudentList>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
            <Row>
              <Code>COMP1021</Code>
              <Cell>Introduction to Computer Science</Cell>
              <Cell>Gibson Lam</Cell>
              <Section>L1</Section>
            </Row>
          </StudentList>
        </Table>
      </Right>
    </Container>
  </Root>
);

export default SingleUserPage;
