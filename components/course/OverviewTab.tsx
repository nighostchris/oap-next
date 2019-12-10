import * as React from 'react';
import Card from '../global/Card';

/*
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
*/

const OverviewTab: React.FunctionComponent = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12 col-xl-8">
        <Card
          type="post"
          title="Assignment 1 - Tic Tac Toe"
          content="This time we are going to write a simple game - Tic Tac Toe. Let us go through some rules first..."
        />
      </div>
      <div className="col-12 col-xl-4">

      </div>
    </div>
  </div>
);

export default OverviewTab;
