import * as React from 'react';
import Card from './global/Card';

const courses = [{
  code: '1021',
  title: 'Introduction to Computer Science',
  section: 'L1',
  instructor: 'LAM, Gibson',
},
{
  code: '2011',
  title: 'Programming with C++',
  section: 'L2',
  instructor: 'Li, Xin',
},
{
  code: '2012',
  title: 'Object-Oriented Programming and Data Structures',
  section: 'L2',
  instructor: 'Tsoi, Yau Chat',
},
{
  code: '3021',
  title: 'Java Programming',
  section: 'L1',
  instructor: 'Cheung, Shing Chi',
}];

const assignments = [{
  code: '2012',
  number: '1',
  title: 'Tic Tac Toe',
  dueDate: new Date(2019, 9, 15),
},
{
  code: '2012',
  number: '2',
  title: 'Bank System Design',
  dueDate: new Date(2019, 10, 15),
},
{
  code: '2012',
  number: '2',
  title: 'Bank System',
  dueDate: new Date(2019, 10, 15),
},
{
  code: '2012',
  number: '2',
  title: 'Bank System',
  dueDate: new Date(2019, 10, 15),
},
{
  code: '2012',
  number: '2',
  title: 'Bank System',
  dueDate: new Date(2019, 10, 15),
}];

const Dashboard: React.FunctionComponent = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12">
        <div style={{ padding: '30px' }}>
          <h1>Courses</h1>
          <div className="card-row">
            {
              courses.map((d, index) => (
                <Card
                  key={`${d.code}-${index}`}
                  type="team"
                  title={`COMP ${d.code}`}
                  link="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
                  content={`${d.title}`}
                  teamfooter={`${d.section} - ${d.instructor}`}
                />
              ))
            }
          </div>
          <h1>Assignments</h1>
          <div className="card-row">
            {
              assignments.map((d, index) => (
                <Card
                  key={`${d.code}-${index}`}
                  type="footer"
                  title={`Assignment ${d.number} ${d.title}`}
                  content={`COMP ${d.code}`}
                  footer={`Due Date: ${d.dueDate.getFullYear()}-${d.dueDate.getMonth() + 1}-${d.dueDate.getDate()}`}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
