import * as React from 'react';
import { useDrop } from 'react-dnd-cjs';
import { ButtonGroup, Button, Nav } from 'react-bootstrap';
import { StatelessDataInput } from './DataInput';
import { StatelessAssertion } from './Assertions';
import { TestCase, StatelessTestCase } from './TestCase';
import { TestCaseContext, testsReducer } from './contexts/TestCaseContext';

const BaseTemplate: React.FunctionComponent = () => {
  const [leftBarTab, setLeftBarTab] = React.useState('fields');
  const [testsState, testsDispatch] = React.useReducer(testsReducer, { tests: [] });

  console.log(testsState);

  const deleteDrop = (item: any) => {
    if (item.type === 'assertions') {
      const temp = item.child;
      temp.splice(item.pos, 1);
      item.setValue([...temp]);
    }
    if (item.type === 'dataInput' || item.type === 'logicStatements' || item.type === 'functions') {
      const temp = item.parent;
      temp[item.pos] = undefined;
      item.setParent([...temp]);
    }
  };

  const [{ isOver }, dropBin] = useDrop({
    accept: ['dataInput', 'functions', 'logicStatements', 'assertions'],
    drop: (item) => deleteDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOverDropTest }, dropTest] = useDrop({
    accept: ['test'],
    drop: () => testsDispatch({ type: 'ADD_TEST' }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

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
            {/* <Nav.Item>
              <Nav.Link eventKey="functions" onSelect={() => setLeftBarTab('functions')}>Functions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="operators" onSelect={() => setLeftBarTab('operators')}>Operators</Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link eventKey="fields" onSelect={() => setLeftBarTab('fields')}>Fields</Nav.Link>
            </Nav.Item>
          </Nav>
          {/* {
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
          } */}
          {
            leftBarTab === 'fields'
              && (
                <div>
                  <StatelessDataInput />
                  <StatelessTestCase />
                  <StatelessAssertion name="assertEquals" />
                  <StatelessDataInput />
                </div>
              )
          }
        </div>
        <div
          ref={dropTest}
          className="col-12 col-xl-8 px-0"
          style={{
            display: 'flex',
            overflowX: 'auto',
            flexDirection: 'row',
            background: isOverDropTest ? 'grey' : undefined,
          }}
        >
          {
            testsState.tests.map((test: any) => (
              <TestCaseContext.Provider value={{ state: testsState, dispatch: testsDispatch }}>
                <TestCase id={test.id} name={test.name} child={test.child} />
              </TestCaseContext.Provider>
            ))
          }
          <i
            ref={dropBin}
            className="fas fa-archive"
            style={{
              background: isOver ? 'grey' : undefined,
              position: 'absolute',
              top: '20px',
              right: '20px',
              fontSize: '40px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BaseTemplate;
