import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
import AddAssignmentBasic from './AddAssignmentBasic';
import AddAssignmentTimeConstraint from './AddAssignmentTimeConstraints';

const GET_COURSES = gql`
  query getCourses {
    courses {
      id
      code
      name
    }
  }
`;

const AddAssignmentController: React.FunctionComponent = () => {
  const emptyDateArray: Date[] = [];

  const query = useQuery(GET_COURSES);

  let courseIDList: any[] = [];
  let courseListSelect: any[] = [];

  const [activeTab, setActiveTab] = React.useState(1);

  const [courses, setCourses] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState('Assignments');
  const [description, setDescription] = React.useState('');
  const [descriptionHTML, setDescriptionHTML] = React.useState('');

  const [showAt, setShowAt] = React.useState(false);
  const [showAtTime, setShowAtTime] = React.useState(emptyDateArray);
  const [startCollectionAt, setStartCollectionAt] = React.useState(false);
  const [startCollectionTime, setStartCollectionTime] = React.useState(emptyDateArray);

  const [dueAt, setDueAt] = React.useState(emptyDateArray);
  const [stopCollectionAt, setStopCollectionAt] = React.useState(emptyDateArray);

  const [releaseGradeAt, setReleaseGradeAt] = React.useState(false);
  const [releaseGradeTime, setReleaseGradeTime] = React.useState(emptyDateArray);

  if (query.error) {
    console.log(query.error);
  }

  if (!query.loading) {
    courseListSelect = query.data.courses.map((course: any) => `${course.code} ${course.name}`);
    courseIDList = query.data.courses.map((course: any) => course.id);
  }

  const handleBack = (e: any) => {
    e.preventDefault();
    setActiveTab(activeTab - 1);
  }

  const handleNext = () => {
    setActiveTab(activeTab + 1);
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-8">
          <div className="header">
            <div className="header-body">
              <div className="row align-items-end">
                <div className="col">
                  <h1 className="header-title">
                    Create a new coursework
                  </h1>
                </div>
                <div className="col-auto">
                  <Nav fill variant="tabs" activeKey={activeTab} className="header-tabs">
                    {
                      ["info-circle", "calendar-alt", "file"].map((icon, index) => (
                        <Nav.Item key={`coursework-progress-${index}`}>
                          <Nav.Link eventKey={index} onClick={(e: any) => e.preventDefault()} style={{ cursor: 'default' }}>
                            <i className={`fas fa-${icon}`} />
                          </Nav.Link>
                        </Nav.Item>
                      ))
                    }
                  </Nav>
                </div>
              </div> 
            </div>
          </div>
          {
            activeTab === 0 && (
              <>
                <AddAssignmentBasic
                  courses={courses}
                  setCourses={setCourses}
                  courseIDList={courseIDList}
                  courseListSelect={courseListSelect}
                  title={title}
                  setTitle={setTitle}
                  type={type}
                  setType={setType}
                  description={description}
                  setDescription={setDescription}
                  descriptionHTML={descriptionHTML}
                  setDescriptionHTML={setDescriptionHTML}
                  handleNext={handleNext}
                />
              </>
            )
          }
          {
            activeTab === 1 && (
              <>
                <AddAssignmentTimeConstraint
                  showAt={showAt}
                  setShowAt={setShowAt}
                  showAtTime={showAtTime}
                  setShowAtTime={setShowAtTime}
                  startCollectionAt={startCollectionAt}
                  setStartCollectionAt={setStartCollectionAt}
                  startCollectionTime={startCollectionTime}
                  setStartCollectionTime={setStartCollectionTime}
                  dueAt={dueAt}
                  setDueAt={setDueAt}
                  stopCollectionAt={stopCollectionAt}
                  setStopCollectionAt={setStopCollectionAt}
                  releaseGradeAt={releaseGradeAt}
                  setReleaseGradeAt={setReleaseGradeAt}
                  releaseGradeTime={releaseGradeTime}
                  setReleaseGradeTime={setReleaseGradeTime}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              </>
            )
          }
          
          {/* <Button className="mb-6" href={`${router.asPath.replace('/add', '')}`} variant="primary" block>
            Create
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default AddAssignmentController;
