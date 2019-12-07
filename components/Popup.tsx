import * as React from 'react';
import { styled } from 'baseui';
import { Label2 } from 'baseui/typography';
import { PopupProps } from '../utils/interface';

const Pop = styled('div', {
  bottom: '0px',
  width: '400px',
  height: '36px',
  borderRadius: '5px',
  marginBottom: '15px',
  position: 'absolute',
  background: '#277a92',
  boxShadow: '5px 5px 10px grey',
});

const PopText = styled(Label2, {
  lineHeight: '36px',
  marginLeft: '15px',
});

const Popup: React.FunctionComponent<PopupProps> = ({ isPop }) => (
  <Pop
    style={{
      visibility: isPop ? 'visible' : 'hidden',
    }}
  >
    <PopText
      overrides={{
        Block: {
          style: {
            color: 'white',
            fontWeight: 'bold',
          },
        },
      }}
    >
      Demo popup after action
    </PopText>
  </Pop>
);

export default Popup;
