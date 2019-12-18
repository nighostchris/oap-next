import * as React from 'react';
import { Row } from 'react-bootstrap';
import Card from '../global/Card';

const GradeTab: React.FunctionComponent = () => (
  <div className="container-fluid">
    <div className="col-12">
      <Row>
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
      </Row>
    </div>
  </div>
);

export default GradeTab;
