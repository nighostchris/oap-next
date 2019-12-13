import * as React from 'react';
import Card from '../global/Card';

const listItem = [
  {
    content:
    {
      title: 'Assignment 1 is released', subtitle: 'By COMP2012 on Dec 9, 2019', button: { title: 'Mark as Read', link: '' }, link: '/notifications/1',
    },
    avatar: <span className="avatar-title rounded bg-white text-secondary"><span className="fas fa-bullhorn" style={{ fontSize: '32px' }} /></span>,
  },
  {
    content:
    {
      title: 'Assignment 2 is released', subtitle: 'By COMP2012 on Dec 9, 2019', button: { title: 'Mark as Read', link: '' }, link: '/notifications/2',
    },
    avatar: <span className="avatar-title rounded bg-white text-secondary"><span className="fas fa-bullhorn" style={{ fontSize: '32px' }} /></span>,
  },
];

// mark all as seen function

const NotiDashboard: React.FunctionComponent = () => {
  return (
    <div className="container-fluid">
      <div className="col-12">
        <div className="header header-body">
          <h1 className="header-title">Notifications</h1>
        </div>
        <Card
          type="list"
          title="Notifications"
          listItem={listItem}
          sortable
          searchable
        />
      </div>
    </div>
  );
};

export default NotiDashboard;
