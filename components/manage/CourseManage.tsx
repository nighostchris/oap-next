import * as React from 'react';
import { Button } from 'react-bootstrap';
import Table from '../global/Table';

const courses = [
  {
    code: 'COMP1021', name: 'Introduction to Computer Science', semester: 1930, year: 2020, section: 'L1', isShown: false,
  },
];

const thead = ['Code', 'Name', 'Semester', 'Year', 'Section', 'Public'];

const tbodyGenerator = (code: string, name: string, semester: number, year: number, section: string, isShown: boolean) => (
  <>
    <td>{code}</td>
    <td>{name}</td>
    <td>{semester}</td>
    <td>{year}</td>
    <td>{section}</td>
    <td>{isShown ? 'Public' : 'Private'}</td>
  </>
);

const CourseManage: React.FunctionComponent = () => {
  const [search, setSearch] = React.useState('');
  const tbody = () => {
    const temp: any[] = [];
    courses.forEach((course) => {
      temp.push(tbodyGenerator(course.code, course.name, course.semester, course.year, course.section, course.isShown));
    });
    return temp;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-xl-7">
          <div className="input-group input-group-merge mb-3 pt-4">
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
            <h1 className="header-title">Manage Courses</h1>
          </div>
          <Button variant="primary" block>Sync</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseManage;
