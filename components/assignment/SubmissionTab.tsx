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


const thead = ['Filename', 'Size', 'Time', 'Status'];
const tbody = [
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
  <><td><i className="fas fa-clock" />assignment1.zip</td><td>273KB</td><td>Dec 11 2019 10:30:27</td><td><i className="fas fa-clock" /></td></>,
];

const AnnouncementTab: React.FunctionComponent = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12 col-xl-9">
        <Table
          thead={thead}
          tbody={tbody}
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
