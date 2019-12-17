import * as React from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from '../global/Select';

interface UserlistProps {
  setUserlist: (value: Array<any> | ((prevVar: Array<any>) => Array<any>)) => void,
}

const optionList = [
  { id: 'Student', e: 's' },
  { id: 'Teaching Staff', e: 'ts' },
  { id: 'Admin', e: 'a' },
];

const AddUser: React.FunctionComponent<UserlistProps> = ({ setUserlist }) => {
  const [nname, setNName] = React.useState('');
  const [nemail, setNEmail] = React.useState('');
  const [nid, setNID] = React.useState('');
  const [nrole, setNRole] = React.useState(optionList[0]);

  const updateUserList = () => {
    const newUser = {
      name: nname,
      email: nemail,
      id: nid,
      role: nrole.e === 's' ? 1 : nrole.e === 'ts' ? 2 : 3,
    };
    setUserlist((oldArray: Array<any>) => [...oldArray, newUser]);
  };

  return (
    <>
      <h2>Register New User</h2>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control value={nname} onChange={(e: any) => setNName(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={nemail} onChange={(e: any) => setNEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>User ID</Form.Label>
        <Form.Control value={nid} onChange={(e: any) => setNID(e.target.value)} />
      </Form.Group>
      <Select
        title="Role"
        optionList={optionList}
        value={nrole}
        setValue={setNRole}
        displayColumn="id"
      />
      <Button block variant="primary" onClick={() => updateUserList()}>
        Submit
      </Button>
    </>
  );
};

export default AddUser;
