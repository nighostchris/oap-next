import * as React from 'react';
import Link from 'next/link';
import { styled } from 'baseui';
import { Label3 } from 'baseui/typography';
import { printDate } from '../../utils/helper';

const Root = styled('div', {
  width: '90%',
  height: '90%',
  display: 'flex',
  overflowY: 'auto',
  background: 'white',
  borderRadius: '8px',
  alignItems: 'center',
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
});

const Container = styled('div', {
  width: '90%',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'row',
  borderRadius: '10px',
  marginBottom: '20px',
  backgroundColor: '#bdbdbd',
  ':first-child': {
    marginTop: '20px',
  },
  '@media (min-width: 320px) and (max-width: 480px)': {
    flexDirection: 'column',
  },
});

const LeftContainer = styled('div', {
  width: '70%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  '@media (min-width: 320px) and (max-width: 480px)': {
    width: '100%',
  },
});

const Dot = styled('span', {
  flexGrow: 2,
  color: '#1976d2',
  fontSize: '50px',
  textAlign: 'center',
  height: 'fit-content',
  '@media (min-width: 320px) and (max-width: 480px)': {
    margin: '0 10px',
  },
});

const Details = styled('div', {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  margin: '15px 0 15px 0',
  '@media (min-width: 320px) and (max-width: 480px)': {
    margin: '15px 5px 15px 0',
  },
});

const StyledLabel3 = styled(Label3, {
  ':not(:last-child)': {
    marginBottom: '10px',
  },
});

const Title = styled(StyledLabel3, {
  ':hover': {
    cursor: 'pointer',
  },
});

const Publish = styled(Label3, {
  width: '30%',
  textAlign: 'center',
  '@media (min-width: 320px) and (max-width: 480px)': {
    width: '100%',
    marginBottom: '10px',
  },
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
  <Root>
    {
      noti.map((d, i) => (
        <Container key={i}>
          <LeftContainer>
            <Dot>{ d.read && '•' }</Dot>
            <Details>
              <Link href="/notification/1">
                <Title
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
                </Title>
              </Link>
              <StyledLabel3>{d.publisher}</StyledLabel3>
              <StyledLabel3>{d.content}</StyledLabel3>
            </Details>
          </LeftContainer>
          <Publish
            overrides={{
              Block: {
                style: {
                  fontWeight: 'bold',
                },
              },
            }}
          >
            {printDate(d.publishTime)}
          </Publish>
        </Container>
      ))
    }
  </Root>
);

export default AnnounceTab;
