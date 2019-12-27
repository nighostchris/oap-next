import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import TextEditor from '../../../../components/global/TextEditor';
import Root from '../../../../components/root-layout/Root';

const AddAnnouncement: NextPage = () => {
  const [customTime, setCustomTime] = React.useState(false);
  const emptyDateArray: Date[] = [];
  const [date, setDate] = React.useState(emptyDateArray);
  const router = useRouter();

  return (
    <Root>
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
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Content</label>
              <TextEditor />
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
            <Button href={`${router.asPath.replace('/add', '')}`} variant="primary" block>Create</Button>
          </div>
        </div>
      </div>
    </Root>
  );
};

export default AddAnnouncement;
