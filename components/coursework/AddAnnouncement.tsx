import * as React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Form, Button, Spinner } from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import TextEditor from '../global/TextEditor';
import { reverseTimestampConverter } from '../../utilities/timestampConverter';

const GET_COURSE_FROM_ASSIGNMENT_ID = gql`
  query getCourseFromAssignmentID($id: bigint!) {
    assignments(where: {id: {_eq: $id}}) {
      course {
        id
      }
    }
  }
`;

const INSERT_NEW_ANNOUNCEMENT = gql`
  mutation insertNewAnnouncement($title: String!, $content: String!, $course_id: bigint!, $assignment_id: bigint!, $publish_at: timestamp!) {
    insert_announcements(objects: {title: $title, content: $content, course_id: $course_id, assignment_id: $assignment_id, publish_at: $publish_at}) {
      returning {
        id
      }
    }
  }
`;

const AddAnnouncement: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseworkid } = router.query;
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [date, setDate] = React.useState<Date[]>([]);
  const [inserting, setInserting] = React.useState(false);
  const [customTime, setCustomTime] = React.useState(false);
  const [insertA, { loading, error, data }] = useMutation(INSERT_NEW_ANNOUNCEMENT);
  const query = useQuery(GET_COURSE_FROM_ASSIGNMENT_ID, {
    variables: { id: courseworkid }
  });
  let courseid: number;

  if (query.error) {
    console.log(error);
  }

  if (!query.loading) {
    courseid = query.data.assignments[0].course.id;
  }

  const insertAnnouncement = () => {
    setInserting(true);
    insertA({
      variables: {
        title: title,
        content: content,
        course_id: courseid,
        assignment_id: courseworkid,
        publish_at: customTime ? reverseTimestampConverter(date[0]) : reverseTimestampConverter(new Date())
      }
    });

    if (error) {
      setInserting(false);
      console.log(error);
    }
  
    if (!loading) {
      if (error === undefined) {
        setInserting(false);
        router.push(`${router.asPath.replace('/add', '')}`);
      }
    }
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-8">
          <div className="header mt-md-5">
            <div className="header-body">
              <div className="row align-items-center">
                <div className="col">
                  <h1 className="header-title">Create a new announcement</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Content</label>
            <TextEditor content={content} setContent={setContent} />
          </div>
          <div className="row mb-6">
            <div className="col-12 col-md-6">
              <label className="mb-1">
                Custom Publish Time
              </label>
              <small className="form-text text-muted">
                Choose when you want to schedule the publishing time of announcement.
                Otherwise, it will be published immediately.
              </small>
              <Form.Check
                type="switch"
                label=""
                id="custom-switch"
                checked={customTime}
                className="custom-checkbox-toggle"
                onChange={() => setCustomTime(!customTime)}
              />
            </div>
            <div className="col-12 col-md-6" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Flatpickr
                className="form-control"
                options={{ monthSelectorType: 'static' }}
                data-enable-time
                disabled={!customTime}
                value={date}
                onChange={(d) => setDate(d)}
              />
            </div>
          </div>
          {
            !inserting && (
              <Button variant="primary" block onClick={() => insertAnnouncement()}>Create</Button>
            )
          }
          {
            inserting && (
              <Button variant="primary" block disabled>
                <Spinner as="span" animation="border" size="sm" role="status" />
                <span className="sr-only">Loading...</span>
              </Button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncement;
