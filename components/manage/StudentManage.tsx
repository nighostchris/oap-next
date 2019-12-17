import * as React from 'react';
import AddUser from './AddUser';
import AddUserToCourse from './AddUserToCourse';
import RemoveFromCourse from './RemoveFromCourse';
import ChangeSection from './ChangeSection';
import Popup from '../Popup';
import Table from '../global/Table';
import Select from '../global/Select';

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

const optionList = ['Select...', 'Add New', 'Add to Course', 'Remove from Course', 'Change Section'];

const StudentManage: React.FunctionComponent = () => {
  const [search, setSearch] = React.useState('');
  const [isPop, setIsPop] = React.useState(false);
  const [type, setType] = React.useState(optionList[0]);
  const [userlist, setUserlist] = React.useState([...users]);
  const tbody = () => {
    const temp: any[] = [];
    userlist.forEach((user) => {
      temp.push(tbodyGenerator(user.name, user.email, user.id, user.role));
    });
    return temp;
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
            <Select
              title="Action Type"
              value={type}
              setValue={setType}
              optionList={optionList}
            />
            {
              type !== undefined && type === optionList[1] && <AddUser setUserlist={setUserlist} />
            }
            {
              type !== undefined && type === optionList[2]
                && (
                  <AddUserToCourse
                    userlist={userlist}
                    setUserlist={setUserlist}
                    courseData={courseData}
                  />
                )
            }
            {
              type !== undefined && type === optionList[3]
              && (
                <RemoveFromCourse
                  userlist={userlist}
                  setUserlist={setUserlist}
                />
              )
            }
            {
              type !== undefined && type === optionList[4]
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
