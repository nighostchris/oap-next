import * as React from 'react';
import axios from 'axios';
import { useQuery, gql } from '@apollo/client';
import { Button } from 'react-bootstrap';
import Table from '../global/Table';
import SyncCourseModal from './SyncCourseModal';

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

const GET_ALL_COURSES = gql`
  query getAllCourses {
    sections {
      name
      course {
        code
        name
        semester {
          semester
          year
        }
        is_shown
      }
    }
  }
`;

const CourseManage: React.FunctionComponent = () => {
  const [show, setShow] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [newCourseList, setNewCourseList] = React.useState<any[]>([]);
  const [addCourseList, setAddCourseList] = React.useState<boolean[]>([]);
  const [addSectionList, setAddSectionList] = React.useState<any[]>([]);
  const [loadingCourseList, setLoadingCourseList] = React.useState(false);
  const { loading, error, data } = useQuery(GET_ALL_COURSES);
  const courses: any[] = [];

  const tbody = () => {
    const temp: any[] = [];
    if (courses !== []) {
      courses.forEach((course) => {
        temp.push(tbodyGenerator(course.code, course.name, course.semester, course.year, course.section, course.isShown));
      });
    }
    return temp;
  };

  const getCoursesList = async () => {
    setLoadingCourseList(true);
    const axiosResponse = await axios.get('https://ust-courses.now.sh/api/courses');
    setAddCourseList([...new Array(axiosResponse.data.length).fill(false)]);
    const tempAddSectionList: any[] = [];
    axiosResponse.data.map((c: any) => {
      tempAddSectionList.push(new Array(c.sections.length).fill(false));
    });
    setAddSectionList([...tempAddSectionList]);
    setLoadingCourseList(false);
    setNewCourseList([...axiosResponse.data]);
  };

  if (error) {
    console.log(error);
  }

  if (!loading) {
    data.sections.forEach((section: any) => {
      courses.push({
        code: section.course.code,
        name: section.course.name,
        semester: section.course.semester.semester,
        year: section.course.semester.year,
        section: section.name,
        isShown: section.course.is_shown,
      });
    });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-xl-7 pt-4">
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
        <div className="col-12 col-xl-5 pt-4">
          <div className="header header-body">
            <h1 className="header-title">Manage Courses</h1>
          </div>
          <Button variant="primary" block onClick={() => { setShow(true); getCoursesList(); }}>Sync</Button>
          <SyncCourseModal
            show={show}
            setShow={setShow}
            newCourseList={newCourseList}
            addCourseList={addCourseList}
            addSectionList={addSectionList}
            loadingCourseList={loadingCourseList}
            setAddCourseList={setAddCourseList}
            setAddSectionList={setAddSectionList}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseManage;
