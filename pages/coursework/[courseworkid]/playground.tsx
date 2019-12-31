import * as React from 'react';
import { NextPage } from 'next';
import { ButtonGroup, Button, Nav } from 'react-bootstrap';
import Root from '../../../components/root-layout/Root';

const Course: NextPage = () => (
  <Root>
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
        <div className="col-12 col-xl-3 px-0" style={{ borderRight: '1px solid #E3EBF6' }}>
          <Nav variant="tabs" defaultActiveKey="functions" className="nav-overflow nav-tabs-sm justify-content-center px-2">
            <Nav.Item>
              <Nav.Link eventKey="functions">Functions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="operators">Operators</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fields">Fields</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="col-12 col-xl-9 px-0" style={{ }}>
          <p>testing</p>
        </div>
      </div>
    </div>
  </Root>
);

export default Course;
