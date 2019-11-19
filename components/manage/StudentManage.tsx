import * as React from 'react';
import { styled } from 'baseui';
import { Search } from 'baseui/icon';
import { SIZE } from 'baseui/input';
import { Select, Value } from 'baseui/select';
import { H5, Label2 } from 'baseui/typography';
import Table from './Table';
import AddUser from './AddUser';

const Root = styled('div', {
  width: '100%',
  height: 'calc(100% - 64px)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
});

const LeftContainer = styled('div', {
  width: '50%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const RightContainer = styled('div', {
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
  margin: '20px 0 0 0',
});

const FormTitle = styled(H5, {
  marginBlockEnd: '0',
});

const BreakLine = styled('div', {
  height: '1px',
  width: '100%',
  margin: '15px 0',
  background: 'white',
});

const SubLabel = styled(Label2, {
  margin: '5px 0',
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

const data = [...mapData, ...mapData, ...mapData, ...mapData];

const StudentManage: React.FunctionComponent = () => {
  const [search, setSearch] = React.useState('');
  const [type, setType] = React.useState<Value>([]);

  const checkType = (value: string) => {
    try {
      return type[0].e === value;
    } catch (e) {
      return false;
    }
  };

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
      <RightContainer>
        <FormTitle
          overrides={{
            Block: {
              style: {
                fontSize: '26px',
                fontWeight: 'bold',
              },
            },
          }}
        >
          Manage Users
        </FormTitle>
        <BreakLine />
        <SubLabel
          overrides={{
            Block: {
              style: {
                fontSize: '15px',
              },
            },
          }}
        >
          Action Type
        </SubLabel>
        <Select
          size={SIZE.compact}
          options={[
            { id: 'Add New', e: 'an' },
            { id: 'Add to Course', e: 'atc' },
            { id: 'Remove', e: 'r' },
            { id: 'Remove from Course', e: 'rfc' },
            { id: 'Change Section', e: 'cs' },
          ]}
          labelKey="id"
          valueKey="e"
          onChange={({ value }) => setType(value)}
          value={type}
          overrides={{
            Root: {
              style: {
                outline: 'teal .5px solid',
                marginTop: '5px',
              },
            },
          }}
        />
        {
          type !== undefined ? (checkType('an') && <AddUser />) : undefined
        }
      </RightContainer>
    </Root>
  );
};

export default StudentManage;
