import * as React from 'react';
import Card from '../global/Card';

/*
const noti = [{
  title: 'Solutions for Assignment 4 are now available',
  publisher: 'Wallace',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 26, 9, 0, 0),
  read: false,
},
{
  title: 'Solutions for Assignment 3 are now available',
  publisher: 'Kevin',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 15, 9, 0, 0),
  read: false,
},
{
  title: 'Solutions for Assignment 2 are now available',
  publisher: 'Desmond',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 3, 9, 0, 0),
  read: true,
},
{
  title: 'Solutions for Assignment 1 are now available',
  publisher: 'Wallace',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 1, 9, 0, 0),
  read: true,
},
{
  title: 'Solutions for Assignment 3 are now available',
  publisher: 'Kevin',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 15, 9, 0, 0),
  read: false,
},
{
  title: 'Solutions for Assignment 2 are now available',
  publisher: 'Desmond',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 3, 9, 0, 0),
  read: true,
},
{
  title: 'Solutions for Assignment 1 are now available',
  publisher: 'Wallace',
  content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.',
  publishTime: new Date(2019, 10, 1, 9, 0, 0),
  read: true,
},
];
*/

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

const content = "<p>I've spent a lot of time thinking about our design process and trying to figure out a better order for us to tackle things. Right now it feels like we're everywhere with tools and process, so here's my suggestion:</p><ol><li><strong>Define the goals</strong>: Create a template for expressing what the purpose of a project is and why we're investing time and money in tackling it.</li><li><strong>Sketch a solution</strong>: Use tried and true paper and pencil to express ideas and share them with others at the company before going too deep on design.</li><li><strong>User test with Figma</strong>: Use the page linking in Figma to get a rough clickable prototype and test this with real users.</li><li><strong>Prototype with code</strong>: Built and HTML/CSS with dummied data to test how things feel before building a true front-end.</li></ol>";

const AnnouncementTab: React.FunctionComponent = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12 col-xl-9">
        {
          [0, 1, 2, 3, 4, 5].map(() => (
            <Card
              type="post"
              title="Assignment 1 - Tic Tac Toe"
              content={content}
            />
          ))
        }
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
