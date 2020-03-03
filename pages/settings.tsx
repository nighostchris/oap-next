import * as React from 'react';
import { NextPage } from 'next';
import { Button } from 'react-bootstrap';
import Root from '../components/root-layout/Root';

const SettingPage: NextPage = () => {
  return (
    <Root>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-8">
            <div className="header mt-md-5">
              <div className="header-body">
                <div className="row align-items-center">
                  <div className="col">
                    <h1 className="header-title">Settings</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Dummy Field</label>
              <small className="form-text text-muted">
                Description
              </small>
            </div>
            <Button href="/settings" variant="primary">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Root>
  );
}

export default SettingPage;
