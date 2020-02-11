import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import CourseworkDashboardHeader from './CourseworkDashboardHeader';

const SettingsTab: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <>
      <CourseworkDashboardHeader activeTab={3} />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-8">
            <div className="form-group">
              <label>Dummy</label>
            </div>
            <Button href={`${router.asPath.replace('settings', 'playground')}`} variant="primary" block className="mb-5">Drag and Drop Playground</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsTab;
