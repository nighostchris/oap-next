import * as React from 'react';
import Card from '../global/Card';

/*
const assignments = [{
  id: '1',
  title: 'Tic Tac Toe',
  submitted: true,
  dueDate: new Date(2019, 8, 15, 11, 59, 59),
  chance: 2,
},
{
  id: '4',
  title: 'Tic Tac Toe 2',
  submitted: true,
  dueDate: new Date(2019, 8, 15, 11, 59, 59),
  chance: 1,
},
{
  id: '2',
  title: 'Bank System',
  submitted: false,
  dueDate: new Date(2019, 9, 20, 23, 59, 59),
  chance: 3,
},
{
  id: '3',
  title: 'Tic Tac Toe 3',
  submitted: false,
  dueDate: new Date(2019, 8, 16, 11, 59, 59),
  chance: 3,
}];
*/

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
