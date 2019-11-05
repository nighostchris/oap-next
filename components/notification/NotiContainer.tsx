import * as React from 'react';
import { styled } from 'baseui';
import { Label2 } from 'baseui/typography';

const Root = styled('div', {
  width: '100%',
  display: 'flex',
  overflowY: 'auto',
  justifyContent: 'center',
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

const NotificationContainer = styled('div', {
  width: '70%',
  marginTop: '40px',
  background: 'white',
  position: 'relative',
  height: 'fit-content',
  border: '1px solid rgba(0, 0, 0, .5)',
  '@media (min-width: 320px) and (max-width: 480px)': {
    width: '85%',
  },
});

const HeaderBar = styled('div', {
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  background: '#90a4ae',
  '@media (min-width: 320px) and (max-width: 480px)': {
    height: 'fit-content',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Title = styled(Label2, {
  marginLeft: '20px',
  '@media (min-width: 320px) and (max-width: 480px)': {
    margin: '10px',
  },
});

const Button = styled('button', {
  right: '20px',
  padding: '8px',
  color: 'white',
  border: 'unset',
  outline: 'none',
  fontSize: '14px',
  minWidth: '150px',
  position: 'absolute',
  width: 'fit-content',
  fontWeight: 'bolder',
  background: '#1e88e5',
  ':hover': {
    cursor: 'pointer',
  },
  '@media (min-width: 320px) and (max-width: 480px)': {
    right: '0',
    marginBottom: '10px',
    position: 'relative',
  },
});

const Body = styled('div', {
  padding: '20px',
  height: '550px',
  overflowY: 'auto',
  marginBottom: '64px',
  width: 'calc(100% - 40px)',
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
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
  '@media (min-width: 320px) and (max-width: 480px)': {
    height: '400px',
  },
});

const BottomBar = styled('div', {
  bottom: '0',
  width: '100%',
  height: '64px',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  background: '#90a4ae',
});

const m = `1. As we know, directly apply the DFT/IDFT formulas
  is not so efficient since we need 4 nested loops for u, v, x and y
  Actually, the 2-D DFT is separable into 2 1-D DFTs. We can rewrite
  the DFT formula as follows,`.repeat(20);

const data = {
  title: 'New Announcement: HW4 posted. Please finish it before xxxxx',
  time: new Date(2019, 8, 25, 13, 15, 15),
  id: '1',
  publisher: 'Desmond',
  read: false,
  message: m,
};

const NotiContainer: React.FunctionComponent = () => {
  return (
    <Root>
      <NotificationContainer>
        <HeaderBar>
          <Title
            overrides={{
              Block: {
                style: {
                  fontWeight: 'bold',
                },
              },
            }}
          >
            {data.title}
          </Title>
          {
            !data.read && <Button>Mark as seen</Button>
          }
        </HeaderBar>
        <Body>
          {data.message}
        </Body>
        <BottomBar>
          <Title
            overrides={{
              Block: {
                style: {
                  fontWeight: 'bold',
                },
              },
            }}
          >
            {data.publisher}
          </Title>
        </BottomBar>
      </NotificationContainer>
    </Root>
  );
};

export default NotiContainer;
