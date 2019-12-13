import * as React from 'react';
import Card from '../global/Card';

interface CourseworkTabProps {
  title: string
  coursework: Array<any>
}

const CourseworkTab: React.FunctionComponent<CourseworkTabProps> = ({ title, coursework }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12">
        <Card
          type="list"
          title={title}
          listItem={coursework}
          sortable
          searchable
        />
      </div>
    </div>
  </div>
);

export default CourseworkTab;
