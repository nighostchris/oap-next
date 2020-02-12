import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
import Card from '../global/Card';
import CourseDashboardHeader from './CourseDashboardHeader';
import { timestampConverter, reverseTimestampConverter } from '../../utilities/timestampConverter';

const content = "<p>I've spent a lot of time thinking about our design process and trying to figure out a better order for us to tackle things. Right now it feels like we're everywhere with tools and process, so here's my suggestion:</p><ol><li><strong>Define the goals</strong>: Create a template for expressing what the purpose of a project is and why we're investing time and money in tackling it.</li><li><strong>Sketch a solution</strong>: Use tried and true paper and pencil to express ideas and share them with others at the company before going too deep on design.</li><li><strong>User test with Figma</strong>: Use the page linking in Figma to get a rough clickable prototype and test this with real users.</li><li><strong>Prototype with code</strong>: Built and HTML/CSS with dummied data to test how things feel before building a true front-end.</li></ol>";

const GET_ANNOUNCEMENTS_TAB_DATA = gql`
  query getAnnouncementsTabData($id: bigint!, $now: timestamp!) {
    courses(where: {id: {_eq: $id}}) {
      created_at
      assignments {
        id
      }
      announcements(where: {publish_at: {_lte: $now}}, order_by: {publish_at: desc}) {
        title
        content
        publish_at
      }
    }
  }
`;

const AnnouncementsTab: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid } = router.query;
  const { loading, error, data } = useQuery(GET_ANNOUNCEMENTS_TAB_DATA, {
    variables: { id: courseid, now: reverseTimestampConverter(new Date()) }
  });
  const infoList = [];
  let announcementsList: any[] = [];

  if (error) {
    console.log(error);
  }

  if (!loading) {
    infoList.push({
      category: 'Assignments',
      value: String(data.courses[0].assignments.length),
    }, {
      category: 'Created',
      value: timestampConverter(new Date(data.courses[0].created_at), false),
    });

    announcementsList = data.courses[0].announcements;
  }

  return (
    <>
      <CourseDashboardHeader activeTab={0} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-xl-9">
            {
              announcementsList.map((ann, index) => (
                <Card
                  key={`announcement-${index}`}
                  type="post"
                  title={ann.title}
                  content={ann.content}
                  publish_at={ann.publish_at}
                />
              ))
            }
          </div>
          <div className="col-12 col-xl-3">
            <Card
              type="info"
              infoList={infoList}
            />
            <Button href={`${router.asPath}/add`} variant="primary" block>New Announcement</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementsTab;
