import React from 'react';
import { useRouter } from 'next/router';
import { Button, Nav } from 'react-bootstrap';
import AddAssignmentBasic from './AddAssignmentBasic';
import AddAssignmentTimeConstraint from './AddAssignmentTimeConstraints';

const AddAssignmentController: React.FunctionComponent = () => {
  const router = useRouter();
  const emptyDateArray: Date[] = [];
  const [activeTab, setActiveTab] = React.useState(0);

  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState('assignment');
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

  const handleBack = (e: any) => {
    e.preventDefault();
    setActiveTab(activeTab - 1);
  }

  const handleNext = (e: any) => {
    e.preventDefault();
    setActiveTab(activeTab + 1);
  }

  const handleActiveTab = (e: any, tabNumber: number) => {
    e.preventDefault();
    setActiveTab(tabNumber);
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
                        <Nav.Item>
                          <Nav.Link eventKey={index} onClick={(e: any) => handleActiveTab(e, index)}>
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
                  title={title}
                  setTitle={setTitle}
                  type={type}
                  setType={setType}
                  description={description}
                  setDescription={setDescription}
                  descriptionHTML={descriptionHTML}
                  setDescriptionHTML={setDescriptionHTML}
                />
                <Button
                  block
                  href="#"
                  className="mb-6"
                  variant="primary"
                  onClick={(e: any) => handleNext(e)}
                >
                  Next
                </Button>
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
                />
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <div className="col-12 col-md-5">
                    <Button
                      block
                      href="#"
                      className="mb-6"
                      variant="primary"
                      onClick={(e: any) => handleBack(e)}
                    >    
                      Back
                    </Button>
                  </div>
                  <div className="col-12 col-md-5">
                    <Button
                      block
                      href="#"
                      className="mb-6"
                      variant="primary"
                      onClick={(e: any) => handleNext(e)}
                    >    
                      Next
                    </Button>
                  </div>
                </div>
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
