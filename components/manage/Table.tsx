import * as React from 'react';
import { styled } from 'baseui';
import { Label2 } from 'baseui/typography';
import { Minus } from 'styled-icons/boxicons-regular/Minus';
import { TableProps } from '../../utils/interface';

const RootTable = styled('div', {
  width: '100%',
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
    maxHeight: '600px',
  },
});

const HeaderRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  background: '#5ba8ec',
  width: 'calc(100% - 12px)',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
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
});

const ActionCell = styled(Label2, {
  padding: '6px 0',
  flex: '0.5 0.5 0px',
  textAlign: 'center',
});

const StyledMinus = styled(Minus, {
  ':hover': {
    cursor: 'pointer',
  },
});

const Table: React.FunctionComponent<TableProps> = ({ search, userlist, setUserlist }) => {
  const searchTable = () => userlist.filter((d) => {
    if (search !== '') {
      const nameResult = d.name.toLowerCase().includes(search.toLowerCase());
      const emailResult = d.email.toLowerCase().includes(search.toLowerCase());
      const idResult = d.id.toString().includes(search);
      return nameResult || emailResult || idResult;
    }
    return true;
  });

  const updateRow = (id: number) => {
    const temp = userlist;
    temp.splice(temp.findIndex((e) => e.id === id), 1);
    setUserlist([...temp]);
  };

  return (
    <RootTable>
      <HeaderRow>
        <Cell
          overrides={{
            Block: {
              style: {
                fontWeight: 'bold',
              },
            },
          }}
        >
          Name
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
          Email
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
          ID
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
          Role
        </Cell>
        <ActionCell />
      </HeaderRow>
      <StudentList>
        {
          searchTable().map((d, i) => (
            <Row key={`row-${i}`}>
              <Cell>{d.name}</Cell>
              <Cell>{d.email}</Cell>
              <Cell>{d.id}</Cell>
              <Cell>
                {
                  d.role === 1 ? 'Student' : (d.role === 2 ? 'Teaching Staff' : 'Admin')
                }
              </Cell>
              <ActionCell>
                <StyledMinus
                  size={26}
                  onClick={() => updateRow(d.id)}
                />
              </ActionCell>
            </Row>
          ))
        }
      </StudentList>
    </RootTable>
  );
};

export default Table;
