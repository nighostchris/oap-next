import * as React from 'react';
import { ButtonGroup, Button, Nav } from 'react-bootstrap';
import DragCard from './Functions';
import DropBoard from './DropBoard';
import Assertions from './Assertions';
import LogicStatements from './LogicStatements';

const TestCaseBoard: React.FunctionComponent = () => {
  const [leftBarTab, setLeftBarTab] = React.useState('operators');

  return (
    <div className="col-12 px-0" style={{ height: '100vh' }}>
      <div className="row mx-0 align-items-center justify-content-center" style={{ height: '60px', borderBottom: '1px solid #E3EBF6' }}>
        <ButtonGroup style={{ justifySelf: 'center' }}>
          <Button variant="secondary">Diagram</Button>
          <Button variant="outline-secondary">Code</Button>
        </ButtonGroup>
        <Button className="mr-3" variant="outline-primary" style={{ position: 'absolute', right: '4.4rem' }}>Discard</Button>
        <Button variant="outline-primary" style={{ position: 'absolute', right: '.75rem' }}>Save</Button>
      </div>
      <div className="row mx-0" style={{ height: 'calc(100% - 60px)' }}>
        <div className="col-12 col-xl-4 px-0" style={{ borderRight: '1px solid #E3EBF6' }}>
          <Nav fill variant="tabs" activeKey={leftBarTab} className="nav-overflow nav-tabs-sm justify-content-center px-2">
            <Nav.Item>
              <Nav.Link eventKey="functions" onSelect={() => setLeftBarTab('functions')}>Functions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="operators" onSelect={() => setLeftBarTab('operators')}>Operators</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fields" onSelect={() => setLeftBarTab('fields')}>Fields</Nav.Link>
            </Nav.Item>
          </Nav>
          {
            leftBarTab === 'functions'
              && (
                <div>
                  <DragCard funcName="getName" parameters={0} />
                  <DragCard funcName="hasReadyUnits" parameters={1} />
                </div>
              )
          }
          {
            leftBarTab === 'operators'
              && (
                <div>
                  <Assertions funcName="AssertSame" parameters={2} />
                  <Assertions funcName="AssertEquals" parameters={2} />
                  <Assertions funcName="AssertTrue" parameters={1} />
                  <Assertions funcName="AssertFalse" parameters={1} />
                  <LogicStatements operators=">" />
                  <LogicStatements operators="<" />
                  <LogicStatements operators="==" />
                  <LogicStatements operators="!=" />
                </div>
              )
          }
        </div>
        <div className="col-12 col-xl-8 px-0" style={{ overflowX: 'auto' }}>
          <DropBoard testCaseName="Test Case 1" />
        </div>
      </div>
    </div>
  );
};

export default TestCaseBoard;
