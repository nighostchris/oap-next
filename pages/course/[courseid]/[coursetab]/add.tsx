import * as React from 'react';
import { NextPage } from 'next';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Flatpickr from 'react-flatpickr';
import Root from '../../../../components/root-layout/Root';
import Select from '../../../../components/global/Select';

const Course: NextPage = () => {
  const router = useRouter();
  const [type, setType] = React.useState(router.asPath.includes('assignment') ? 'assignment' : 'lab');
  const emptyDateArray: Date[] = [];
  const [deadline, setDeadline] = React.useState(emptyDateArray);
  const [bgTime, setBGTime] = React.useState(emptyDateArray);
  const [lateTime, setLateTime] = React.useState(emptyDateArray);
  const [batchGrading, setBatchGrading] = React.useState(false);
  const [late, setLate] = React.useState(false);

  return (
    <Root>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-8">
            <div className="header mt-md-5">
              <div className="header-body">
                <div className="row align-items-center">
                  <div className="col">
                    <h1 className="header-title">Create a new coursework</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" />
            </div>
            <Select
              title="Type"
              value={type}
              setValue={setType}
              optionList={['Assignments', 'Labs']}
            />
            <div className="form-group">
              <label>Submission Deadline</label>
              <Flatpickr
                className="form-control"
                options={{ monthSelectorType: 'static' }}
                data-enable-time
                value={deadline}
                onChange={(d) => setDeadline(d)}
              />
            </div>
            <div className="row mb-6">
              <div className="col-12 col-md-6">
                <label className="mb-1">
                  Batch Grading Policy
                </label>
                <small className="form-text text-muted">
                  Choose when you want to specify the date for batch grading.
                  Otherwise, student's work will be graded immediately upon submission.
                </small>
                <Form.Check
                  type="switch"
                  label=""
                  id="custom-switch"
                  checked={batchGrading}
                  className="custom-checkbox-toggle"
                  onChange={() => setBatchGrading(!batchGrading)}
                />
              </div>
              <div className="col-12 col-md-6" style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Flatpickr
                  className="form-control"
                  options={{ monthSelectorType: 'static' }}
                  data-enable-time
                  disabled={!batchGrading}
                  value={bgTime}
                  onChange={(d) => setBGTime(d)}
                />
              </div>
            </div>
            <div className="row mb-6">
              <div className="col-12 col-md-6">
                <label className="mb-1">
                  Late Permission
                </label>
                <small className="form-text text-muted">
                  Choose when you allow late submission for students.
                </small>
                <Form.Check
                  type="switch"
                  label=""
                  id="custom-switch-1"
                  checked={late}
                  className="custom-checkbox-toggle"
                  onChange={() => setLate(!late)}
                />
              </div>
              <div className="col-12 col-md-6" style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Flatpickr
                  className="form-control"
                  options={{ monthSelectorType: 'static' }}
                  data-enable-time
                  disabled={!late}
                  value={lateTime}
                  onChange={(d) => setLateTime(d)}
                />
              </div>
            </div>
            <div className="form-group mb-6">
              <label>Skeleton Download Link (If available)</label>
              <input type="text" className="form-control" />
            </div>
            <Button className="mb-6" href={`${router.asPath.replace('/add', '')}`} variant="primary" block>
              Create
            </Button>
          </div>
        </div>
      </div>
    </Root>
  );
};

export default Course;
