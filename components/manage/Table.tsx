import * as React from 'react';
import { styled } from 'baseui';
import { /*Label1, Label2, Label3*/ } from 'baseui/typography';
import { TableProps } from '../../utils/interface';

const RootTable = styled('table', {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
});

const Header = styled('th', {
  top: '0',
  padding: '8px',
  position: 'sticky',
  textAlign: 'center',
  background: '#5ba8ec',
  ':first-child': {
    borderTopLeftRadius: '5px',
  },
  ':last-child': {
    borderTopRightRadius: '5px',
  },
});

const Cell = styled('td', {
  padding: '6px',
  textAlign: 'center',
});

const TableRow = styled('tr', {
  backgroundColor: 'white',
  ':nth-child(odd)': {
    backgroundColor: '#e0e0e0',
  },
});

const Table: React.FunctionComponent<TableProps> = ({ row }) => {
  return (
    <RootTable>
      <TableRow>
        <Header>Name</Header>
        <Header>Email</Header>
        <Header>Student ID</Header>
      </TableRow>
      {
        row.map((d, i) => (
          <TableRow key={`row-${i}`}>
            <Cell>{d.name}</Cell>
            <Cell>{d.email}</Cell>
            <Cell>{d.id}</Cell>
          </TableRow>
        ))
      }
    </RootTable>
  );
};

export default Table;
