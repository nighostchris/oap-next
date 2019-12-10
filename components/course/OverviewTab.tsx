import * as React from 'react';
import Card from '../global/Card';

const infoList = [
  {
    category: 'Assignments',
    value: '4',
  },
  {
    category: 'Labs',
    value: '12',
  },
  {
    category: 'Created',
    value: 'Sept 1, 2019',
  },
];

const OverviewTab: React.FunctionComponent = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12 col-xl-8">
        <Card
          type="post"
          title="Assignment 1 - Tic Tac Toe"
          content="This time we are going to write a simple game - Tic Tac Toe. Let us go through some rules first..."
        />
        <Card
          type="post"
          title="Assignment 1 - Tic Tac Toe"
          content="This time we are going to write a simple game - Tic Tac Toe. Let us go through some rules first..."
        />
        <Card
          type="post"
          title="Assignment 1 - Tic Tac Toe"
          content="This time we are going to write a simple game - Tic Tac Toe. Let us go through some rules first..."
        />
        <Card
          type="post"
          title="Assignment 1 - Tic Tac Toe"
          content="This time we are going to write a simple game - Tic Tac Toe. Let us go through some rules first..."
        />
      </div>
      <div className="col-12 col-xl-4">
        <Card
          type="info"
          infoList={infoList}
        />
      </div>
    </div>
  </div>
);

export default OverviewTab;
