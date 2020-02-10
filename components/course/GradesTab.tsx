import * as React from 'react';
import { Row } from 'react-bootstrap';
import CourseDashboardHeader from './CourseDashboardHeader';
import Card from '../global/Card';

const infoList = [
  { category: 'Assignments', value: '25%' },
  { category: 'Labs', value: '10%' },
  { category: 'Project', value: '15%' },
  { category: 'Midterm Exam', value: '25%' },
  { category: 'Final Exam', value: '25%' },
];

const data = {
  title: 'Assignment 1 - Tic Tac Toe',
  details: [
    { title: 'Marks', content: '95/100', icon: 'fas fa-spell-check' },
    { title: 'High', content: '100', icon: 'fas fa-arrow-up' },
    { title: 'Low', content: '0', icon: 'fas fa-arrow-down' },
    { title: 'Mean', content: '17.3', icon: 'fas fa-balance-scale' },
    { title: 'Standard Deviation', content: '30.57', icon: 'fas fa-chart-area' },
  ],
};

const overall = {
  assignments: [
    { title: 'Tic Tac Toe', mark: 95, full: 100 },
    { title: 'Bank System', mark: 99, full: 120 },
  ],
  labs: [
    { title: 'Tic Tac Toe', mark: 95, full: 100 },
    { title: 'Bank System', mark: 99, full: 120 },
  ],
  projects: [
    { title: 'Tic Tac Toe', mark: 95, full: 100 },
  ],
  exams: [
    { title: 'Midterm Exam', mark: 77, full: 100 },
    { title: 'Final Exam', mark: 50, full: 100 },
  ],
};

const stats = Array(5).fill(data);

const generateTable = (category: any, title: string) => {
  if (category) {
    return (
      <>
        <h3 className="text-left">{title}</h3>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th className="px-0 bg-transparent border-top-0"><span className="h6">Name</span></th>
                <th className="px-0 bg-transparent border-top-0"><span className="h6">Marks</span></th>
                <th className="px-0 bg-transparent border-top-0"><span className="h6">Out Of</span></th>
                <th className="px-0 bg-transparent border-top-0 text-right"><span className="h6">%</span></th>
              </tr>
            </thead>
            <tbody>
              {
                category.map((c: any, index: number) => (
                  <tr key={`${title}-${index}`}>
                    <td className="px-0">{c.title}</td>
                    <td className="px-0">{c.mark}</td>
                    <td className="px-0">{c.full}</td>
                    <td className="px-0 text-right">{`${(c.mark / c.full * 100).toPrecision(3)}%`}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return undefined;
};

const GradesTab: React.FunctionComponent = () => (
  <>
    <CourseDashboardHeader activeTab={2} />
    <div className="container-fluid">
      <Row>
        <div className="col-12 col-xl-8">
          <div className="card card-body pt-5 px-5">
            <h2 className="text-center">Course Overall Grade</h2>
            { generateTable(overall.assignments, 'Assignments') }
            { generateTable(overall.labs, 'Labs') }
            { generateTable(overall.projects, 'Projects') }
            { generateTable(overall.exams, 'Exams') }
            <div className="table-responsive">
              <table className="table mb-4">
                <thead>
                  <tr>
                    <th className="px-0"><span className="h6">Category</span></th>
                    <th colSpan={2} className="px-0 text-right"><span className="h6">%</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-0 border-top border-top-2"> <strong>Assignments</strong> </td>
                    <td colSpan={2} className="px-0 text-right border-top border-top-2"><span className="h3">22%</span></td>
                  </tr>
                  <tr>
                    <td className="px-0 border-top border-top-2"> <strong>Labs</strong> </td>
                    <td colSpan={2} className="px-0 text-right border-top border-top-2"><span className="h3">25%</span></td>
                  </tr>
                  <tr>
                    <td className="px-0 border-top border-top-2"> <strong>Total</strong> </td>
                    <td colSpan={2} className="px-0 text-right border-top border-top-2"><span className="h3">47%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {
            stats.map((stat, index: number) => (
              <div className="card px-2">
                <h2 key={`stat-${index}`} className="card-title text-center pt-4 pb-3">
                  <a href="/coursework/1/grade">{stat.title}</a>
                </h2>
                {
                  stat.details.map((detail: any, index2: number) => (
                    <Card
                      key={`stat-card-${index2}`}
                      type="stat"
                      title={detail.title}
                      content={detail.content}
                      icon={detail.icon}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
        <div className="col-12 col-xl-4">
          <Card
            type="info"
            infoList={infoList}
          />
        </div>
      </Row>
    </div>
  </>
);

export default GradesTab;
