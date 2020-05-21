import React from 'react';
import { Nav } from 'react-bootstrap';
import { StatelessTestCase } from '../TestCase';
import { StatelessAssertion } from '../Assertions';
import { StatelessDataInput } from '../DataInput';
import { StatelessAssertionFunction, StatelessFunction } from '../Functions';

interface FieldsPanelProps {
  fieldsDrawerOpen: boolean
  setFieldsDrawerOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void
  leftBarTab: string
  setLeftBarTab: (value: string | ((prevVar: string) => string)) => void
  testReflectionResult: any
}

const FieldsPanel: React.FunctionComponent<FieldsPanelProps> = ({
  fieldsDrawerOpen, setFieldsDrawerOpen, leftBarTab, setLeftBarTab, testReflectionResult,
}) => {
  return (
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
          <Nav.Item>
            <Nav.Link eventKey="function" onSelect={() => setLeftBarTab('function')}>Function</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="assertion" onSelect={() => setLeftBarTab('assertion')}>Assertion</Nav.Link>
          </Nav.Item>
        </Nav>
        {
          leftBarTab === 'assertion' && (
            <div className="test-case-field">
              <StatelessTestCase />
              <StatelessAssertion name="assertEquals" />
              <StatelessAssertion name="assertTrue" />
              <StatelessAssertion name="assertFalse" />
              <StatelessDataInput />
              {
                testReflectionResult.map((result: any) => (
                  Object.entries(result.method).map(([key, value]: [string, any]) => (
                    <StatelessAssertionFunction name={key} params={["object", ...value]} />
                  ))
                ))
              }
            </div>
          )
        }
        {
          leftBarTab === 'function'
            && (
              <div className="test-case-field">
                <StatelessTestCase />
                {
                  testReflectionResult.map((result: any) => (
                    Object.entries(result.method).map(([key, value]: [string, any]) => (
                      <StatelessFunction name={key} params={["object", ...value]} />
                    ))
                  ))
                }
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
  );
};

export default FieldsPanel;