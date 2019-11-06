import * as React from 'react';
import { styled } from 'baseui';
import { /*Label1, Label2, Label3*/ } from 'baseui/typography';
import { Search } from 'baseui/icon';
import Table from './Table';

const Root = styled('div', {
  width: '100%',
  height: '100%',
});

const LeftContainer = styled('div', {
  width: '40%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const SearchContainer = styled('div', {
  width: '100%',
  height: '36px',
  display: 'flex',
  background: 'white',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: '50px',
});

const StyledSearch = styled(Search, {
  minWidth: '15%',
  color: '#606770',
});

const StyledInput = styled('input', {
  outline: '0',
  width: '80%',
  height: '100%',
  border: 'unset',
  fontSize: '16px',
  padding: '0 10px 0 0',
  background: 'transparent',
});

const TableWrapper = styled('div', {
  width: '100%',
  height: '80%',
  overflowY: 'auto',
  maxHeight: '450px',
  borderRadius: '5px',
  margin: '20px 0 0 0',
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

const mapData = [{
  name: 'Desmond Tsoi',
  email: 'desmond',
  id: '12345678',
},
{
  name: 'Wallace',
  email: 'wallm',
  id: '27587374',
},
{
  name: 'Testing',
  email: 'testing',
  id: '22063948',
},
{
  name: 'Test',
  email: 'test',
  id: '29582012',
},
{
  name: 'Kris',
  email: 'kristopher',
  id: '57389402',
}];

const data = [...mapData, ...mapData, ...mapData];

const StudentManage: React.FunctionComponent = () => {
  const [search, setSearch] = React.useState('');

  const searchTable = (s: string) => data.filter((d) => {
    if (s !== '') {
      const nameResult = d.name.toLowerCase().includes(s.toLowerCase());
      const emailResult = d.email.toLowerCase().includes(s.toLowerCase());
      const idResult = d.id.toString().includes(s);
      return nameResult || emailResult || idResult;
    }
    return true;
  });

  return (
    <Root>
      <LeftContainer>
        <SearchContainer>
          <StyledSearch size={26} />
          <StyledInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
        <TableWrapper>
          <Table
            row={searchTable(search)}
          />
        </TableWrapper>
      </LeftContainer>
    </Root>
  );
};

export default StudentManage;
