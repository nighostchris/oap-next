import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { timestampConverter } from '../../utilities/timestampConverter';

const GET_ALL_ANNOUNCEMENTS = gql`
  query getAllAnnouncements {
    announcements(where: {course: {sections: {students: {user: {itsc: {_eq: "kristopher"}}}}}}) {
      id
      title
      publish_at
      course {
        code
      }
    }
  }
`;

const NotiDashboard: React.FunctionComponent = () => {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState('');
  const announcements: any[] = [];

  const { loading, error, data } = useQuery(GET_ALL_ANNOUNCEMENTS);

  const filterAnnouncement = () => {
    return announcements.filter((announcement) => announcement.title.includes(keyword));
  }
  
  if (error) {
    console.log(error);
  }

  if (!loading) {
    data.announcements.forEach((announcement: any) => {
      announcements.push({
        id: announcement.id,
        title: announcement.title,
        publish_at: announcement.publish_at,
        course: announcement.course.code
      });
    });
  }

  return (
    <div className="container-fluid">
      <div className="col-12">
        <div className="card" style={{ flex: 1 }} data-toggle="lists">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="card-header-title">
                  Notifications
                </h2>
              </div>
            </div>
          </div>
          <div className="card-header">
            <div className="row">
              <div className="col-12">
                <form>
                  <div className="input-group input-group-flush input-group-merge">
                    <input
                      type="search"
                      value={keyword}
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                      className="form-control form-control-prepended search"
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <span className="fe fe-search" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-lg list-group-flush list my-n4">
              {
                filterAnnouncement().map((announcement, index) => (
                  <li key={`listItem-${index}`} className="list-group-item px-0">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <div className="avatar avatar-lg">
                          <span className="avatar-title rounded bg-white text-secondary">
                            <span className="fas fa-bullhorn" style={{ fontSize: '32px' }} />
                          </span>
                        </div>
                      </div>
                      <div className="col ml-n2">
                        <h4 className="card-title mb-1 name">
                          <a href={`${router.asPath}/${announcement.id}`}>{announcement.title}</a>
                        </h4>
                        <p className="card-text small text-muted">
                          {`By ${announcement.course} on ${timestampConverter(new Date(announcement.publish_at), false)}`}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotiDashboard;
