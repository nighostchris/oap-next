import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import Card from '../global/Card';
import Dropdown from '../global/Dropdown';
import CourseDashboardHeader from './CourseDashboardHeader';
import { timestampConverter, reverseTimestampConverter, differentialTimestampConverter } from '../../utilities/timestampConverter';

const content = "<p>I've spent a lot of time thinking about our design process and trying to figure out a better order for us to tackle things. Right now it feels like we're everywhere with tools and process, so here's my suggestion:</p><ol><li><strong>Define the goals</strong>: Create a template for expressing what the purpose of a project is and why we're investing time and money in tackling it.</li><li><strong>Sketch a solution</strong>: Use tried and true paper and pencil to express ideas and share them with others at the company before going too deep on design.</li><li><strong>User test with Figma</strong>: Use the page linking in Figma to get a rough clickable prototype and test this with real users.</li><li><strong>Prototype with code</strong>: Built and HTML/CSS with dummied data to test how things feel before building a true front-end.</li></ol>";

const GET_ANNOUNCEMENTS_TAB_DATA = gql`
  query getAnnouncementsTabData($id: bigint!, $now: timestamp!) {
    courses(where: {id: {_eq: $id}}) {
      created_at
      assignments {
        id
      }
      announcements(where: {publish_at: {_lte: $now}}, order_by: {publish_at: desc}) {
        id
        title
        content
        publish_at
      }
    }
  }
`;

const DELETE_ANNOUNCEMENT_BY_ID = gql`
  mutation deleteAnnouncement($announcement_id: bigint!) {
    delete_announcements(where: {id: {_eq: $announcement_id}}) {
      returning {
        id
      }
    }
  }
`;

const AnnouncementsTab: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid } = router.query;

  // const infoList: any[] = [];
  // let announcementsList: any[] = [];

  const [infoList, setInfoList]: any[] = React.useState([]);
  const [announcementsList, setAnnouncementsList]: any[] = React.useState([]);

  const [getAnnouncementsTabData] = useLazyQuery(GET_ANNOUNCEMENTS_TAB_DATA, {
    variables: { id: courseid, now: reverseTimestampConverter(new Date()) },
    onCompleted: (data) => {
      setInfoList([{
        category: 'Assignments',
        value: String(data.courses[0].assignments.length),
      }, {
        category: 'Created',
        value: timestampConverter(new Date(data.courses[0].created_at), false),
      }]);
  
      setAnnouncementsList(data.courses[0].announcements);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const [deleteAnnouncementByID] = useMutation(DELETE_ANNOUNCEMENT_BY_ID, {
    onCompleted: () => {
      getAnnouncementsTabData();
    },
    onError: (error) => {
      console.log(error);
    }
  });

  useEffect(() => {
    getAnnouncementsTabData();
  }, []);

  return (
    <>
      <CourseDashboardHeader activeTab={0} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-xl-9">
            {
              announcementsList.map((ann: any, index: number) => (
                <div className="card mx-2" style={{ flex: 1 }} key={`announcement-${index}`}>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <div className="avatar">
                            <img
                              alt="..."
                              src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
                              className="avatar-img rounded-circle"
                            />
                          </div>
                        </div>
                        <div className="col ml-n2">
                          <h4 className="card-title mb-1">
                            {ann.title}
                          </h4>
                          <p className="card-text small text-muted">
                            <span className="fe fe-clock" />
                            {` ${differentialTimestampConverter(new Date(ann.publish_at))}`}
                          </p>
                        </div>
                        <div className="col-auto">
                          <Dropdown
                            menu={[
                              { title: 'Delete', func: () => deleteAnnouncementByID({ variables: { announcement_id: ann.id } }) }
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mb-3 quill-html">
                      <section dangerouslySetInnerHTML={{ __html: ann.content }} />
                    </p>
                  </div>
                </div>
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
