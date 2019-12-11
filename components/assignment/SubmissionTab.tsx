import * as React from 'react';
import Card from '../global/Card';
import Table from '../global/Table';

const infoList = [
  {
    category: 'Created',
    value: 'Nov 1, 2019',
  },
  {
    category: 'Due Date',
    value: 'Nov 30, 2019',
  },
];

const thead = ['Filename', 'Size', 'Submission Time', 'Status'];

const tbodyGenerator = (name: string, size: string, time: string, status: string) => (
  <>
    <td><i className="fas fa-file-archive" style={{ marginRight: '10px' }} />{name}</td>
    <td>{size}</td>
    <td>{time}</td>
    <td>
      <i
        className={status === 'success' ? 'fas fa-check-circle' : (status === 'warning'
          ? 'fas fa-exclamation-triangle' : 'fas fa-times-circle')}
        style={{ color: status === 'success' ? '#00A660' : (status === 'warning' ? '#F6C343' : '#D01A3B') }}
      />
    </td>
  </>
);

const tbody = () => {
  const temp = [];
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      temp.push(tbodyGenerator('assignment1.zip', '273KB', 'Dec 11 2019 10:30:27', 'success'));
    } else if (i % 3 === 0) {
      temp.push(tbodyGenerator('assignment2.zip', '36KB', 'Dec 11 2019 10:30:27', 'warning'));
    } else {
      temp.push(tbodyGenerator('assignment3.zip', '185KB', 'Dec 11 2019 10:30:27', 'error'));
    }
  }
  return temp;
};


const AnnouncementTab: React.FunctionComponent = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12 col-xl-9">
        <Table
          thead={thead}
          tbody={tbody()}
          bordered
          textAlign="center"
        />
      </div>
      <div className="col-12 col-xl-3">
        <Card
          type="info"
          infoList={infoList}
        />
      </div>
    </div>
  </div>
);

export default AnnouncementTab;
