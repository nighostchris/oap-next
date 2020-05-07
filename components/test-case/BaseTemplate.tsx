import * as React from 'react';
import { useDrop } from 'react-dnd-cjs';
import { ButtonGroup, Button, Nav, Form } from 'react-bootstrap';
import { StatelessDataInput } from './DataInput';
import { StatelessAssertion } from './Assertions';
import { StatelessAssertionFunction, StatelessFunction } from './Functions';
import { TestCase, StatelessTestCase } from './TestCase';
import { TestCaseContext, testsReducer } from './contexts/TestCaseContext';
import { StatelessInstance, StatelessParameter } from './Instance';

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
  const [fieldsDrawerOpen, setFieldsDrawerOpen] = React.useState(true);
  const [leftBarTab, setLeftBarTab] = React.useState('fields');
  const [testsState, testsDispatch] = React.useReducer(testsReducer, { tests: [], variables: [] });

  console.log(testsState);

  const handleDeleteDropItem = (item: any) => {
    if (item.hasOwnProperty('id')) {
      if (item.type === 'test') {
        testsDispatch({ type: 'REMOVE_TEST', id: item.id });
      }
    }
  };

  const [{ isOver }, dropBin] = useDrop({
    accept: ['test'],
    drop: (item) => handleDeleteDropItem(item),
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

  console.log(fieldsDrawerOpen);

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
        <div
          className={`px-0 ${fieldsDrawerOpen && "col-12 col-xl-3"}`}
          style={{ borderRight: '1px solid #E3EBF6', height: '100%', display: 'flex', flexDirection: 'row' }}
        >
          <div style={{ width: `${fieldsDrawerOpen ? "calc(100% - 20px)" : "0px"}` }}>
            <Nav
              fill
              variant="tabs"
              activeKey={leftBarTab}
              className="nav-overflow nav-tabs-sm justify-content-center px-2"
              style={{ display: `${!fieldsDrawerOpen ? 'none' : 'flex'}` }}
            >
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
                  <div className="test-case-field">
                    <StatelessTestCase />
                    <StatelessAssertion name="assertEquals" />
                    <StatelessDataInput />
                    <StatelessAssertionFunction name="getName" params={1} />
                    <StatelessInstance />
                    <StatelessParameter />
                    <StatelessFunction name="addUnit" params={["object", "char", "string", "number", "boolean"]} />
                  </div>
                )
            }
          </div>
          <div style={{ width: '20px', backgroundColor: '#6E84A3', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <i
              className={`fas fa-caret-${fieldsDrawerOpen ? "left" : "right"}`}
              style={{ fontSize: '30px', color: 'white', cursor: 'pointer' }}
              onClick={() => setFieldsDrawerOpen(!fieldsDrawerOpen)}
            />
          </div>
        </div>
        <TestCaseContext.Provider value={{ state: testsState, dispatch: testsDispatch }}>
          <div
            style={{ width: `${!fieldsDrawerOpen && 'calc(100% - 21px)'}`}}
            className={`px-0 drop-test-case-board ${fieldsDrawerOpen && "col-12 col-xl-9"}`}
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
            <div className="drop-bin">
              <div ref={dropBin} className="px-0 mx-4 mt-4">
                <div className="card mb-0" style={{ border: '1px dashed #D2DDEC', textAlign: 'center' }}>
                  <div className="card-body" style={{ height: '100px', lineHeight: '52px', fontWeight: 'bold' }}>
                    Drop here to DELETE
                  </div>
                </div>
              </div>
              <div
                ref={dropTest}
                className="mt-3"
                style={{ display: 'flex', flexDirection: 'row', height: '100%', background: isOverDropTest ? '#95AAC9' : undefined }}
              >
                {
                  testsState.tests.map((test: any) => (
                    <TestCase id={test.id} name={test.name} child={test.child} />
                  ))
                }
              </div>
            </div>
          </div>
        </TestCaseContext.Provider>
      </div>
    </div>
  );
};

export default BaseTemplate;
