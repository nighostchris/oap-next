import * as React from 'react';
import List from '../global/List';
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

const listItem = [
  {
    content: {
      title: 'Assignment 1 - Tic Tac Toe',
      subtitle: 'Released by Desmond Tsoi on Dec 9, 2019',
      button: {
        title: 'Download',
        link: '',
      },
    },
    avatar: {
      type: 'icon',
      src: 'fe fe-pie-chart',
    },
  },
  {
    content: {
      title: 'Assignment 2 - Bank System',
      subtitle: 'Released by Desmond Tsoi on Dec 9, 2019',
      button: {
        title: 'Download',
        link: '',
      },
    },
    avatar: {
      type: 'img',
      src: 'https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg',
    },
  },
];

const AssignmentsTab: React.FunctionComponent = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12">
        <Card
          type="list"
          title="Assignments"
          sortable
          searchable
        >
          <List listItem={listItem} />
        </Card>
      </div>
    </div>
  </div>
);

export default AssignmentsTab;
