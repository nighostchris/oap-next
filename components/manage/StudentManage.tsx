import * as React from 'react';
import { SIZE } from 'baseui/input';
import { Select, Value } from 'baseui/select';
import AddUser from './AddUser';
import AddUserToCourse from './AddUserToCourse';
import RemoveFromCourse from './RemoveFromCourse';
import ChangeSection from './ChangeSection';
import Popup from '../Popup';
import Table from '../global/Table';

const courseData = [{
  code: '1021',
  title: 'Introduction to Computer Science',
  section: 2,
},
{
  code: '2011',
  title: 'Programming with C++',
  section: 3,
}];

const users = [
  {
    name: 'Desmond Tsoi', email: 'desmond', id: '12345678', role: 3, reg: [{ code: '1021', section: 1 }],
  },
  {
    name: 'Wallace', email: 'wallm', id: '27587374', role: 2, reg: [{ code: '1021', section: 1 }],
  },
  {
    name: 'Testing', email: 'testing', id: '22063948', role: 1, reg: [{ code: '1021', section: 1 }],
  },
  {
    name: 'Test', email: 'test', id: '29582012', role: 1, reg: [],
  },
  {
    name: 'Kris', email: 'kristopher', id: '57389402', role: 3, reg: [],
  },
  {
    name: 'Testing', email: 'testing123', id: '22743948', role: 1, reg: [],
  },
  {
    name: 'Testing', email: 'testing456', id: '22496182', role: 1, reg: [],
  },
];

const thead = ['Name', 'Email', 'ID', 'Role'];

const tbodyGenerator = (name: string, email: string, id: string, role: number) => (
  <>
    <td>{name}</td>
    <td>{email}</td>
    <td>{id}</td>
    <td>{role === 1 ? 'Student' : (role === 2 ? 'Teaching Staff' : 'Admin')}</td>
  </>
);

const tbody = () => {
  const temp: any[] = [];
  users.forEach((user) => {
    temp.push(tbodyGenerator(user.name, user.email, user.id, user.role));
  });
  return temp;
};

const StudentManage: React.FunctionComponent = () => {
  const [search, setSearch] = React.useState('');
  const [isPop, setIsPop] = React.useState(false);
  const [type, setType] = React.useState<Value>([]);
  const [userlist, setUserlist] = React.useState([...users]);

  const checkType = (value: string) => {
    try {
      return type[0].e === value;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-xl-7">
          <Popup
            isPop={isPop}
          />
          <div className="input-group input-group-merge mb-3">
            <input
              type="text"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-control form-control-prepended"
            />
            <div className="input-group-prepend">
              <div className="input-group-text">
                <span className="fas fa-search" />
              </div>
            </div>
          </div>
          <Table
            thead={thead}
            tbody={tbody()}
            bordered
            textAlign="center"
          />
        </div>
        <div className="col-12 col-xl-5">
          <div className="header header-body">
            <h1 className="header-title">Manage Users</h1>
          </div>
          <div className="form-group">
            <label>Action Type</label>
            <Select
              size={SIZE.compact}
              options={[
                { id: 'Add New', e: 'an' },
                { id: 'Add to Course', e: 'atc' },
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
              type !== undefined && checkType('an') && <AddUser setUserlist={setUserlist} />
            }
            {
              type !== undefined && checkType('atc')
                && (
                  <AddUserToCourse
                    userlist={userlist}
                    setUserlist={setUserlist}
                    courseData={courseData}
                  />
                )
            }
            {
              type !== undefined && checkType('rfc')
              && (
                <RemoveFromCourse
                  userlist={userlist}
                  setUserlist={setUserlist}
                />
              )
            }
            {
              type !== undefined && checkType('cs')
              && (
                <ChangeSection
                  userlist={userlist}
                  setUserlist={setUserlist}
                  courseData={courseData}
                  setIsPop={setIsPop}
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManage;
