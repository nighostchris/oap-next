import * as React from 'react';
import { styled } from 'baseui';
import { H3, H6, Label2 } from 'baseui/typography';
import { Markunread } from 'styled-icons/material/Markunread';
import { printDate } from '../utils/helper';

const Root = styled('div', {
  width: '100%',
  display: 'flex',
  overflowY: 'auto',
  flexDirection: 'row',
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

const Container = styled('div', {
  width: '100%',
  padding: '20px',
});

const HeaderBar = styled('div', {
  width: '100%',
  height: '64px',
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  alignItems: 'center',
  '@media (min-width: 320px) and (max-width: 480px)': {
    height: 'fit-content',
    flexDirection: 'column',
  },
});

const StyledH3 = styled(H3, {
  marginLeft: '20px',
  marginBlockStart: '0px',
  marginBlockEnd: '0px',
  '@media (min-width: 320px) and (max-width: 480px)': {
    margin: '0 0 10px 0',
  },
});

const ButtonGroup = styled('div', {
  flexGrow: 8,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  '@media (min-width: 320px) and (max-width: 480px)': {
    marginBottom: '10px',
  },
});

const Button = styled('button', {
  padding: '8px',
  color: 'white',
  border: 'unset',
  outline: 'none',
  fontSize: '14px',
  minWidth: '150px',
  borderRadius: '5px',
  width: 'fit-content',
  fontWeight: 'bolder',
  background: '#1e88e5',
  ':last-child': {
    marginLeft: '20px',
  },
  ':hover': {
    cursor: 'pointer',
  },
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
});

const NotificationContainer = styled('div', {
  background: 'white',
  borderRadius: '8px',
  margin: '10px 0 30px 20px',
  boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.2)',
  '@media (min-width: 320px) and (max-width: 480px)': {
    margin: '10px 0 30px 0',
  },
});

const Tag = styled(H6, {
  background: '#5ba8ec',
  marginBlockEnd: '0px',
  marginBlockStart: '0px',
  width: 'calc(100% - 20px)',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  padding: '5px 0px 5px 20px',
});

const CategoryContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
});

const Category = styled('div', {
  marginTop: '10px',
  textAlign: 'center',
});

const BreaklineWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

const Breakline = styled('div', {
  width: '95%',
  borderBottom: '1px solid grey',
});

const NotiWrap = styled('div', {
  width: '100%',
  display: 'flex',
  height: '300px',
  overflowY: 'scroll',
  flexDirection: 'column',
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

const Row = styled('div', {
  display: 'flex',
  padding: '10px 0px',
  textAlign: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  ':nth-child(even)': {
    background: 'rgba(0, 0, 0, 0.3)',
  },
});

const data = {
  title: 'New Announcement: HW4 posted',
  time: new Date(2019, 8, 25, 13, 15, 15),
  id: '1',
  read: false,
};

const data2 = {
  title: 'COMP2012 Announcement: You may check your assignment 4 score now.',
  time: new Date(2019, 7, 25, 13, 15, 15),
  read: true,
};

const newData = Array(3).fill(data);
const readData = Array(50).fill(data2);

const NotificationLayout: React.FunctionComponent = () => {
  const [showArchive, setShowArchive] = React.useState(false);

  const decideWidth = (i: number) => {
    if (i === 0) {
      return 'calc(40% - 4.8px)';
    }
    if (i === 1) {
      return 'calc(40% - 4.8px)';
    }
    return 'calc(20% - 4.8px)';
  };

  const printRow = (d: any) => (
    d.map((c: any, i: number) => (
      <Row>
        <div style={{ width: '40%' }}>
          <Label2 key={`title-${i}`}>{c.title}</Label2>
        </div>
        <div style={{ width: '40%' }}>
          <Label2 key={`time-${i}`}>{printDate(c.time)}</Label2>
        </div>
        <Markunread size={26} style={{ width: '20%' }} />
      </Row>
    ))
  );

  const checkArchive = (i: number) => {
    if (i === 0 || showArchive) {
      return undefined;
    }
    return 'none';
  };

  return (
    <Root>
      <Container>
        <HeaderBar>
          <StyledH3
            overrides={{
              Block: {
                style: {
                  fontWeight: 'bold',
                },
              },
            }}
          >
            Notifications
          </StyledH3>
          <ButtonGroup>
            <Button>Mark all as seen</Button>
            <Button onClick={() => setShowArchive(!showArchive)}>Show Archive</Button>
          </ButtonGroup>
        </HeaderBar>
        {
          ['New', 'Archive'].map((e, index) => (
            <NotificationContainer
              key={`noti-${index}`}
              style={{ display: checkArchive(index) }}
            >
              <Tag
                overrides={{
                  Block: {
                    style: {
                      fontWeight: 'bold',
                    },
                  },
                }}
              >
                {e}
              </Tag>
              <CategoryContainer>
                {
                  ['Title', 'Time', 'Mark As Seen'].map((c, i) => (
                    <Category style={{ width: decideWidth(i) }}>
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
              <NotiWrap>
                { index === 0 ? printRow(newData) : printRow(readData) }
              </NotiWrap>
            </NotificationContainer>
          ))
        }
      </Container>
    </Root>
  );
};

export default NotificationLayout;
