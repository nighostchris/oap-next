import * as React from 'react';
import { useDrop } from 'react-dnd-cjs';
import { ButtonGroup, Button, Nav, Form } from 'react-bootstrap';
import { StatelessDataInput } from './DataInput';
import { StatelessAssertion } from './Assertions';
import { StatelessAssertionFunction } from './Functions';
import { TestCase, StatelessTestCase } from './TestCase';
import { TestCaseContext, testsReducer } from './contexts/TestCaseContext';
import { StatelessInstance } from './Instance';

const testReflectionResult = [{
  class: ""
}, {
  class: "Archer",
  params: ["char", "int", "int", "boolean"]
}, {
  class: "Player",
  params: ["string"]
}];

const BaseTemplate: React.FunctionComponent = () => {
  const [leftBarTab, setLeftBarTab] = React.useState('fields');
  const [testsState, testsDispatch] = React.useReducer(testsReducer, { tests: [], variables: [] });

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
                  <StatelessTestCase />
                  <StatelessAssertion name="assertEquals" />
                  <StatelessDataInput />
                  <StatelessAssertionFunction name="getName" />
                  <StatelessInstance />
                </div>
              )
          }
        </div>
        <TestCaseContext.Provider value={{ state: testsState, dispatch: testsDispatch }}>
          <div
            ref={dropTest}
            className="col-12 col-xl-8 px-0"
            style={{
              height: '100%',
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'auto',
              flexDirection: 'column',
              background: isOverDropTest ? 'grey' : undefined,
            }}
          >
            <div className="px-0 mx-4 mt-4">
              <div className="card mb-0" style={{ width: 'fit-content', minWidth: '400px' }}>
                <div className="card-body">
                  <h3 className="card-title mb-4">Pre-Setup Stage</h3>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {
                      testsState.variables.map((varSelect: any, index: number) => (
                        <div className="card card-body mr-4 mb-0" style={{ minWidth: '250px' }}>
                          <Form.Group>
                            <Form.Label>Class</Form.Label>
                            <Form.Control
                              as="select"
                              value={varSelect.class}
                              onChange={(e) => {
                                let classValue = (e.target as HTMLInputElement).value;
                                if (classValue !== "") {
                                  testsDispatch({
                                    type: 'MODIFY_VARIABLE_CLASS',
                                    vid: index,
                                    class: classValue,
                                    params: testReflectionResult.filter((result) => result.class === (e.target as HTMLInputElement).value)[0].params
                                  });
                                }
                              }}
                            >
                              {
                                testReflectionResult.map((result) => result.class).map((option, index) => (
                                  <option key={`type-option-${index}`}>
                                    {option}
                                  </option>
                                ))
                              }
                            </Form.Control>
                          </Form.Group>
                          {
                            varSelect.class !== "" && (
                              <Form.Group>
                                <Form.Label>
                                  Variable Name
                                </Form.Label>
                                <input
                                  value={varSelect.name}
                                  onChange={(e) => testsDispatch({
                                    type: 'MODIFY_VARIABLE_NAME',
                                    vid: index,
                                    name: e.target.value
                                  })}
                                  className="form-control form-control-prepended"
                                />
                              </Form.Group>
                            )
                          }
                          <Form.Group className="mb-0">
                            { varSelect.params.length ? <Form.Label>Constructor Parameters</Form.Label> : undefined }
                            {
                              varSelect.params.map((param: any, pIndex: number) => (
                                param.type !== "boolean"
                                  ? (
                                    <input
                                      value={param.value}
                                      onChange={(e) => testsDispatch({
                                        type: 'MODIFY_VARIABLE_PARAMS',
                                        vid: index,
                                        pid: pIndex,
                                        param: { type: param.type, value: e.target.value }
                                      })}
                                      className={`form-control form-control-prepended ${ pIndex !== varSelect.params.length - 1 ? "mb-4" : undefined }`}
                                    />
                                  )
                                  : (
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="True / False"
                                      checked={param.value}
                                      onChange={() => testsDispatch({
                                        type: 'MODIFY_VARIABLE_PARAMS',
                                        vid: index,
                                        pid: pIndex,
                                        param: { type: param.type, value: !param.value }
                                      })}
                                      className={`${ pIndex !== varSelect.params.length - 1 && "mb-4" }`}
                                    />
                                  )
                              ))
                            }
                          </Form.Group>
                        </div>
                      ))
                    }
                    <Button
                      variant="outline-primary"
                      onClick={() => testsDispatch({ type: 'ADD_VARIABLE' })}
                      style={{ fontSize: '36px', fontWeight: 'bold', width: '100px' }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
            {
              testsState.tests.map((test: any) => (
                <TestCase id={test.id} name={test.name} child={test.child} />
              ))
            }
            </div>
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
        </TestCaseContext.Provider>
      </div>
    </div>
  );
};

export default BaseTemplate;
