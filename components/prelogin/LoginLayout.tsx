import * as React from 'react';
import { styled } from 'baseui';

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
  right: '0px',
  width: '500px',
  height: '100%',
  position: 'fixed',
});

const LoginLayout: React.FunctionComponent = () => {
  return (
    <Root>
      <RightContainer>
        <p>Hello</p>
      </RightContainer>
    </Root>
  );
};

export default LoginLayout;
