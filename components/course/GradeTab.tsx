import * as React from 'react'
import Link from 'next/link'
import { styled } from 'baseui'
import { printDate } from '../../utils/helper'
import { Label1, Label2, Label3 } from 'baseui/typography'
import { Detail } from 'styled-icons/boxicons-solid/Detail'

const Table = styled('div', {
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  //backgroundColor: '#bdbdbd',
})

const Header = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  border: '2px solid #e0e0e0',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
})

const HeaderTag = styled(Label1, {
  width: '22%',
  margin: '10px 0px',
  textAlign: 'center',
})

const TableBody = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '2px solid #e0e0e0',
  borderTop: 'unset !important',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
})

const Row = styled('div', {
  width: '100%',
  display: 'flex',
  padding: '20px 0px',
  flexDirection: 'column',
  ':not(:last-child)': {
    borderBottom: '2px solid #e0e0e0',
  },
})

const LeftContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
})

const RowContent = styled(Label2, {
  width: '22%',
  textAlign: 'center',
})

const Title = styled(RowContent, {
  color: '#1565c0',
  ':hover': {
    cursor: 'pointer',
  },
})

const Due = styled(Label3, {
  width: '22%',
  textAlign: 'center',
})

const StyledDetail = styled(Detail, {
  ':hover': {
    cursor: 'pointer',
  },
})

const Details = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent:'center',
})

const ExpandedContent = styled(Label2, {
  width: '100%',
  textAlign: 'center',
})

const ExpandedBottom = styled('div', {
  width: '80%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
})

const ExpandedLeft = styled('div', {
  display: 'flex',
  marginRight: '15%',
  flexDirection: 'column',
})

const Chart = styled('div', {
  width: '100px',
  backgroundColor: 'red',
})

const Breakline = styled('div', {
  width: '80%',
  margin: '20px 0 0 0',
  borderBottom: '1px solid white',
})

const ScoreDetails = styled(Label2, {
  margin: '5px 0 15px 0px',
})

const Conclusion = styled('div', {
  width: '100%',
  display: 'flex',
  marginTop: '20px',
  flexDirection: 'row',
})

const tagMap = ['Name', 'Due', 'Score', 'Out Of'];

const data = new Array(5).fill({
  title: 'Tic Tac Toe',
  dueDate: new Date(2019, 8, 16, 11, 59, 59),
  score: 90,
  full: 100,
  mean: 60,
  high: 90,
  low: 20,
});

const GradeTab: React.FunctionComponent = () => {
  let totalScore: number = 0;
  let totalFull: number = 0;
  data.forEach((d) => totalScore += d.score);
  data.forEach((d) => totalFull += d.full);

  const [activeDetails, setActiveDetails] = React.useState(Array(data.length).fill(false));

  const helperSetActiveDetails = (i: any) => {
    let temp = activeDetails;
    temp[i] = !temp[i];
    setActiveDetails([...temp]);
  }

  return (
    <Table>
      <Header>
        {
          tagMap.map((t, i) => (
            <HeaderTag key={`header-${i}`}
              overrides={{
                Block: {
                  style: {
                    fontWeight: 'bold',
                  }
                }
              }}
            >
              {t}
            </HeaderTag>
          ))
        }
      </Header>
      <TableBody>
        {
          data.map((d, i) => (
            <Row key={i}>
              <LeftContainer>
                <Link href="/">
                  <Title
                    overrides={{
                      Block: {
                        style: {
                          fontWeight: 'bold',
                        }
                      }
                    }}
                  >
                    {d.title}
                  </Title>
                </Link>
                <Due>{printDate(d.dueDate)}</Due>              
                <RowContent
                  overrides={{
                    Block: {
                      style: {
                        fontWeight: 'bold',
                      }
                    }
                  }}
                >
                  {d.score}
                </RowContent>              
                <RowContent
                  overrides={{
                    Block: {
                      style: {
                        fontWeight: 'bold',
                      }
                    }
                  }}
                >
                  {d.full}
                </RowContent>
                <StyledDetail size="20" onClick={() => helperSetActiveDetails(i)}/>
              </LeftContainer>
              <Details style={{ display: activeDetails[i] ? undefined : 'none' }}>
                <Breakline />
                <ScoreDetails
                  overrides={{
                    Block: {
                      style: {
                        fontWeight: 'bold',
                      },
                    }
                  }}
                >
                  Score Details
                </ScoreDetails>
                <ExpandedBottom>
                  <ExpandedLeft>
                    <ExpandedContent>{`High: ${d.high}`}</ExpandedContent>
                    <ExpandedContent>{`Mean: ${d.mean}`}</ExpandedContent>
                    <ExpandedContent>{`Low: ${d.low}`}</ExpandedContent>
                  </ExpandedLeft>
                  <Chart />
                </ExpandedBottom>
              </Details>
            </Row>
          ))
        }
      </TableBody>
      <Conclusion>
        <Label1>{`Total: ${String(totalScore/totalFull * 100).slice(0, 2)}%`}</Label1>
      </Conclusion>
    </Table>
  )
}

export default GradeTab
