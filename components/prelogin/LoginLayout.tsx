import * as React from 'react';
import Router from 'next/router';
import { styled } from 'baseui';
import { Input } from 'baseui/input';

const Root = styled('div', {
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  marginRight: '500px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url("/static/images/hkust.jpg")',
});

const RightContainer = styled('div', {
  top: '20%',
  right: '0px',
  height: '60%',
  width: '500px',
  display: 'flex',
  position: 'fixed',
  alignItems: 'center',
  flexDirection: 'column',
  '@media (min-width: 320px) and (max-width: 480px)': {
    width: '100% !important',
  },
});

const Button = styled('button', {
  padding: '8px',
  color: 'white',
  border: 'unset',
  outline: 'none',
  fontSize: '14px',
  minWidth: '150px',
  marginTop: '40px',
  width: 'fit-content',
  fontWeight: 'bolder',
  background: '#1e88e5',
  ':hover': {
    cursor: 'pointer',
  },
});

const LoginLayout: React.FunctionComponent = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = () => {
    if (username === 'test' && password === 'test') {
      Router.push('/dashboard');
    }
  };

  return (
    <Root>
      <RightContainer>
        <img
          style={{ maxWidth: '90%' }}
          src="/static/images/ust_logo.png"
          alt=""
        />
        <img
          style={{ marginTop: '20px', maxWidth: '90%' }}
          src="/static/images/cse_logo.png"
          alt=""
        />
        <Input
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
          placeholder="Username: test"
          overrides={{
            Root: {
              style: {
                width: '80%',
                marginTop: '20px',
                backgroundColor: 'white',
                outline: '#607d8b .5px solid',
              },
            },
            InputContainer: {
              style: (props) => {
                const { $isFocused } = props;
                return {
                  borderColor: $isFocused ? 'transparent' : 'transparent',
                };
              },
            },
          }}
        />
        <Input
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          placeholder="Password: test"
          overrides={{
            Root: {
              style: {
                width: '80%',
                marginTop: '20px',
                backgroundColor: 'white',
                outline: '#607d8b .5px solid',
              },
            },
            InputContainer: {
              style: (props) => {
                const { $isFocused } = props;
                return {
                  borderColor: $isFocused ? 'transparent' : 'transparent',
                };
              },
            },
          }}
        />
        <Button
          onClick={login}
        >
          Login
        </Button>
      </RightContainer>
    </Root>
  );
};

export default LoginLayout;
