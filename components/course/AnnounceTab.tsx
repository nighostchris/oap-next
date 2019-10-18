import * as React from 'react';
import { styled } from 'baseui';
import { Label3 } from 'baseui/typography';
import { printDate } from '../../utils/helper';

const Container = styled('div', {
  width: '90%',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'row',
  borderRadius: '10px',
  backgroundColor: '#bdbdbd',
  ':not(:last-child)': {
    marginBottom: '20px',
  },
});

const Dot = styled('span', {
  color: '#1976d2',
  fontSize: '50px',
  marginLeft: '20px',
});

const LeftContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '15px 0 15px 30px',
});

const StyledLabel3 = styled(Label3, {
  ':not(:last-child)': {
    marginBottom: '10px',
  },
});

const Publish = styled(Label3, {
  right: '20px',
  position: 'absolute',
});

const noti = [{
  title: 'Solutions for Assignment 4 are now available',
  publisher: 'Wallace',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 26, 9, 0, 0),
  read: false,
},
{
  title: 'Solutions for Assignment 3 are now available',
  publisher: 'Kevin',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 15, 9, 0, 0),
  read: false,
},
{
  title: 'Solutions for Assignment 2 are now available',
  publisher: 'Desmond',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 3, 9, 0, 0),
  read: true,
},
{
  title: 'Solutions for Assignment 1 are now available',
  publisher: 'Wallace',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 1, 9, 0, 0),
  read: true,
},
{
  title: 'Solutions for Assignment 3 are now available',
  publisher: 'Kevin',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 15, 9, 0, 0),
  read: false,
},
{
  title: 'Solutions for Assignment 2 are now available',
  publisher: 'Desmond',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 3, 9, 0, 0),
  read: true,
},
{
  title: 'Solutions for Assignment 1 are now available',
  publisher: 'Wallace',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 1, 9, 0, 0),
  read: true,
},
];

const AnnounceTab: React.FunctionComponent = () => (
  <>
    {
      noti.map((d, i) => (
        <Container key={i}>
          <Dot>{ d.read && '•' }</Dot>
          <LeftContainer>
            <StyledLabel3
              overrides={{
                Block: {
                  style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                  },
                },
              }}
            >
              {d.title}
            </StyledLabel3>
            <StyledLabel3>{d.publisher}</StyledLabel3>
            <StyledLabel3>{d.content}</StyledLabel3>
          </LeftContainer>
          <Publish>{printDate(d.publishTime)}</Publish>
        </Container>
      ))
    }
  </>
);

export default AnnounceTab;
