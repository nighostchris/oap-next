import * as React from 'react';
import { styled } from 'baseui';
import { H5, Label1, Label2 } from 'baseui/typography';
import { Select, Value } from 'baseui/select';
import { SIZE, Input } from 'baseui/input';
import { Search } from 'baseui/icon';
import { Button } from 'baseui/button';
import Table from './Table';

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

const Subtitle = styled(Label1, {
  margin: '20px 0 10px 0',
});

const SubLabel = styled(Label2, {
  margin: '5px 0',
});

const StyledButton = styled(Button, {
  marginTop: '30px',
  padding: '3px !important',
  fontSize: '14px !important',
  borderRadius: '5px !important',
  backgroundColor: '#1e88e5 !important',
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
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [id, setID] = React.useState('');
  const [role, setRole] = React.useState<Value>([]);

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
        <Subtitle
          overrides={{
            Block: {
              style: {
                fontWeight: 'bold',
              },
            },
          }}
        >
          Register New User
        </Subtitle>
        <SubLabel
          overrides={{
            Block: {
              style: {
                fontSize: '15px',
              },
            },
          }}
        >
          Name
        </SubLabel>
        <Input
          value={name}
          size={SIZE.compact}
          onChange={(e: any) => setName(e.target.value)}
          overrides={{
            Root: {
              style: {
                outline: 'teal .5px solid',
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
        <SubLabel
          overrides={{
            Block: {
              style: {
                fontSize: '15px',
              },
            },
          }}
        >
          Email
        </SubLabel>
        <Input
          value={email}
          size={SIZE.compact}
          onChange={(e: any) => setEmail(e.target.value)}
          overrides={{
            Root: {
              style: {
                outline: 'teal .5px solid',
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
        <SubLabel
          overrides={{
            Block: {
              style: {
                fontSize: '15px',
              },
            },
          }}
        >
          Student ID
        </SubLabel>
        <Input
          value={id}
          size={SIZE.compact}
          onChange={(e: any) => setID(e.target.value)}
          overrides={{
            Root: {
              style: {
                outline: 'teal .5px solid',
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
        <SubLabel
          overrides={{
            Block: {
              style: {
                fontSize: '15px',
              },
            },
          }}
        >
          Role
        </SubLabel>
        <Select
          size={SIZE.compact}
          options={[
            { id: 'Student', e: 's' },
            { id: 'Teaching Staff', e: 'ts' },
            { id: 'Admin', e: 'a' },
          ]}
          labelKey="id"
          valueKey="e"
          onChange={({ value }) => setRole(value)}
          value={role}
          overrides={{
            Root: {
              style: {
                outline: 'teal .5px solid',
              },
            },
          }}
        />
        <StyledButton>Submit</StyledButton>
      </RightContainer>
    </Root>
  );
};

export default StudentManage;
