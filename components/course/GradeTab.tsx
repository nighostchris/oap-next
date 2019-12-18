import * as React from 'react';
import { Row } from 'react-bootstrap';
import Card from '../global/Card';

const infoList = [
  { category: 'Assignments', value: '25%' },
  { category: 'Labs', value: '10%' },
  { category: 'Project', value: '15%' },
  { category: 'Midterm Exam', value: '25%' },
  { category: 'Final Exam', value: '25%' },
];

const GradeTab: React.FunctionComponent = () => (
  <div className="container-fluid">
    <Row>
      <div className="col-12 col-xl-4">
        <div className="card px-2">
          <h2 className="pt-4 px-1" style={{ textAlign: 'center' }}>Assignment 1 - Tic Tac Toe</h2>
          <Card
            type="stat"
            title="Marks"
            content="95/100"
            icon="fas fa-spell-check"
          />
          <Card
            type="stat"
            title="High"
            content="100"
            icon="fas fa-arrow-up"
          />
          <Card
            type="stat"
            title="Low"
            content="0"
            icon="fas fa-arrow-down"
          />
          <Card
            type="stat"
            title="Mean"
            content="17.3"
            icon="fas fa-balance-scale"
          />
          <Card
            type="stat"
            title="Standard Deviation"
            content="30.57"
            icon="fas fa-chart-area"
          />
        </div>
      </div>
      <div className="col-12 col-xl-4">
        <Card
          type="info"
          infoList={infoList}
        />
      </div>
    </Row>
  </div>
);

export default GradeTab;
