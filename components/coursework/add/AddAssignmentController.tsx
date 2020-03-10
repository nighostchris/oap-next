import React from 'react';
import { Nav } from 'react-bootstrap';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import AddAssignmentBasic from './AddAssignmentBasic';
import AddAssignmentTimeConstraint from './AddAssignmentTimeConstraints';
import AddAssignmentDetails from './AddAssignmentDetails';
import { useRouter } from 'next/router';
import { reverseTimestampConverter } from '../../../utilities/timestampConverter';

const GET_COURSES = gql`
  query getCourses {
    courses {
      id
      code
      name
    }
  }
`;

const GET_SECTION_ID = gql`
  query getSectionID($course_id: bigint!) {
    sections(where: {
      _and: [
        { students: { user: { itsc: { _eq: "kristopher" }}}},
        { course_id: { _eq: $course_id }}
      ]
    }) {
      id
    }
  }
`;

const INSERT_NEW_ASSIGNMENT = gql`
  mutation insertNewAssignment($course_id: bigint!, $description: String!, $description_html: String!, $name: String!) {
    insert_assignments(objects: {
      name: $name,
      course_id: $course_id,
      description: $description,
      description_html: $description_html
    }) {
      returning {
        id
      }
    }
  }
`;

const INSERT_NEW_ASSIGNMENT_CONFIG = gql`
  mutation insertNewAssignmentConfig($assignment_id: bigint!, $section_id: bigint!, $show_at: timestamp, $start_collection_at: timestamp,
    $due_at: timestamp!, $stop_collection_at: timestamp!, $release_grade_at: timestamp, $submission_chances: Int,
    $grade_immediately: Boolean!, $show_immediate_scores: Boolean!, $config_yaml: String!
  ) {
    insert_assignment_configs(objects: {
      assignment_id: $assignment_id,
      section_id: $section_id,
      show_at: $show_at,
      start_collection_at: $start_collection_at,
      due_at: $due_at,
      stop_collection_at: $stop_collection_at,
      release_grade_at: $release_grade_at,
      submission_chances: $submission_chances,
      grade_immediately: $grade_immediately,
      show_immediate_scores: $show_immediate_scores,
      config_yaml: $config_yaml
    }) {
      returning {
        id
      }
    }
  }
`;

const AddAssignmentController: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid } = router.query;
  const emptyDateArray: Date[] = [];

  let courseIDList: any[] = [];
  let courseListSelect: any[] = [];

  const [activeTab, setActiveTab] = React.useState(0);

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

  const [chances, setChances] = React.useState("0");
  const [gradeImmediately, setGradeImmediately] = React.useState(false);
  const [configYAML, setConfigYAML] = React.useState("");

  const [sectionid, setSectionID] = React.useState('');
  const [creatingNewAssignment, setCreatingNewAssignment] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleBack = (e: any) => {
    e.preventDefault();
    setActiveTab(activeTab - 1);
  }

  const handleNext = () => {
    setActiveTab(activeTab + 1);
  }

  const query = useQuery(GET_COURSES);

  const [getSectionID] = useLazyQuery(GET_SECTION_ID, {
    variables: { course_id: courseid },
    onCompleted: (data) => {
      setSectionID(data.sections[0].id);
      insertNewAssignment({
        variables: {
          name: title,
          course_id: courseIDList[courseListSelect.indexOf(courses)],
          description: description,
          description_html: descriptionHTML
        }
      });
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setCreatingNewAssignment(false);
    }
  });

  const [insertNewAssignment] = useMutation(INSERT_NEW_ASSIGNMENT, {
    onCompleted: (data) => {
      insertNewAssignmentConfig({
        variables: {
          assignment_id: data.insert_assignments.returning[0].id,
          section_id: sectionid,
          show_at: showAt ? reverseTimestampConverter(showAtTime[0]) : null,
          start_collection_at: startCollectionAt ? reverseTimestampConverter(startCollectionTime[0]) : null,
          due_at: reverseTimestampConverter(dueAt[0]),
          stop_collection_at: reverseTimestampConverter(stopCollectionAt[0]),
          release_grade_at: releaseGradeAt ? reverseTimestampConverter(releaseGradeTime[0]) : null,
          submission_chances: chances ? chances : null,
          grade_immediately: gradeImmediately,
          show_immediate_scores: releaseGradeAt ? true : false,
          config_yaml: configYAML
        }
      });
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setCreatingNewAssignment(false);
    }
  });

  const [insertNewAssignmentConfig] = useMutation(INSERT_NEW_ASSIGNMENT_CONFIG, {
    onCompleted: () => {
      setCreatingNewAssignment(false);
      router.push(`${router.asPath.replace('/add', '')}`);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setCreatingNewAssignment(false);
    }
  });

  const handleCreate = () => {
    setCreatingNewAssignment(true);
    getSectionID();
  }

  if (query.error) {
    console.log(query.error);
  }

  if (!query.loading) {
    courseListSelect = query.data.courses.map((course: any) => `${course.code} ${course.name}`);
    courseIDList = query.data.courses.map((course: any) => course.id);
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
            )
          }
          {
            activeTab === 1 && (
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
            )
          }
          {
            activeTab === 2 && (
              <AddAssignmentDetails
                chances={chances}
                setChances={setChances}
                gradeImmediately={gradeImmediately}
                setGradeImmediately={setGradeImmediately}
                configYAML={configYAML}
                setConfigYAML={setConfigYAML}
                handleBack={handleBack}
                handleCreate={handleCreate}
                creatingNewAssignment={creatingNewAssignment}
                errorMessage={errorMessage}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default AddAssignmentController;
