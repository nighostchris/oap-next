import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import Dropdown from '../global/Dropdown';
import CourseDashboardHeader from './CourseDashboardHeader';
import { timestampConverter } from '../../utilities/timestampConverter';

const GET_COURSEWORKTAB_DATA = gql`
  query getCourseData($id: bigint!) {
    courses(where: {id: {_eq: $id}}) {
      assignments {
        id
        name
        created_at
      }
    }
  }
`;

const DELETE_COURSEWORK = gql`
  mutation deleteCoursework($id: bigint!) {
    delete_assignments(where: {id: {_eq: $id}}) {
      returning {
        id
      }
    }
  }
`;

const DELETE_ANNOUNCEMENT_BY_COURSEWORK_ID = gql`
  mutation deleteAnnouncement($coursework_id: bigint!) {
    delete_announcements(where: {assignment_id: {_eq: $coursework_id}}) {
      returning {
        assignment_id
      }
    }
  }
`;

const DELETE_ASSIGNMENT_CONFIG = gql`
  mutation deleteAssignmentConfig($coursework_id: bigint!) {
    delete_assignment_configs(where: {assignment_id: {_eq: $coursework_id}}) {
      returning {
        assignment_id
      }
    }
  }
`;

const CourseworksTab: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid } = router.query;

  const [mode, setMode] = React.useState(0);
  const [keyword, setKeyword] = React.useState('');
  const [listItem, setListItem]: any[] = React.useState([]);
  const listItemDropdown = [{ title: 'Asc', func: () => setMode(1) }, { title: 'Dsc', func: () => setMode(2) }];

  const [getCourseworkTabData] = useLazyQuery(GET_COURSEWORKTAB_DATA, {
    variables: { id: courseid },
    onCompleted: (data) => {
      let temp: any[] = [];
      data.courses[0].assignments.forEach((assignment: any) => {
        temp.push({
          id: assignment.id,
          content: {
            title: assignment.name,
            subtitle: `Released by Desmond Tsoi on ${timestampConverter(new Date(assignment.created_at), false)}`,
            button: {
              title: 'Download',
              link: '',
            },
            link: `/coursework/${assignment.id}/announcements`,
          },
          avatar: <span className="avatar-title rounded bg-white text-secondary"><span className="fas fa-flask" style={{ fontSize: '32px' }} /></span>,
        });
      });

      setListItem([...temp]);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  React.useEffect(() => {
    getCourseworkTabData();
  }, []);

  const [deleteAssignmentConfig] = useMutation(DELETE_ASSIGNMENT_CONFIG);
  
  const [deleteAnnouncementByCourseworkID] = useMutation(DELETE_ANNOUNCEMENT_BY_COURSEWORK_ID);
  
  const [deleteCoursework] = useMutation(DELETE_COURSEWORK);

  const handleDeleteCoursework = (id: any) => {
    deleteAnnouncementByCourseworkID({ variables: { coursework_id: id } })
      .then(() => {
        deleteAssignmentConfig({ variables: { coursework_id: id } })
          .then(() => {
            deleteCoursework({ variables: { id: id } })
              .then(() => getCourseworkTabData())
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }

  const compareListItem = (a: any, b: any) => {
    if (a.content.title > b.content.title) {
      return -1;
    }
    if (a.content.title < b.content.title) {
      return 1;
    }
    return 0;
  };
  
  const filterListItem = (listItem: (Array<any> | undefined), keyword: string, mode: number) => {
    if (listItem) {
      const filtered = listItem.filter(
        (item) => item.content.title.toLowerCase().includes(keyword),
      );
      switch (mode) {
        case 0:
          return filtered;
        case 1:
          return filtered.sort(compareListItem);
        default:
          return filtered.sort(compareListItem).reverse();
      }
    } else {
      return [];
    }
  };

  return (
    <>
      <CourseDashboardHeader activeTab={1} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Button href="courseworks/add" variant="primary" block className="mb-5">New Coursework</Button>
            <div className="card" style={{ flex: 1 }} data-toggle="lists">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-header-title">Courseworks</h4>
                  </div>
                  <div className="col-auto">
                    <Dropdown title="Sort By" menu={listItemDropdown} />
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
                    filterListItem(listItem, keyword, mode).map((item, index) => (
                      <li key={`listItem-${index}`} className="list-group-item px-0">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <div className="avatar avatar-lg">{item.avatar}</div>
                          </div>
                          <div className="col ml-n2">
                            <h4 className="card-title mb-1 name">
                              <a href={item.content.link}>{item.content.title}</a>
                            </h4>
                            <p className="card-text small text-muted">
                              {item.content.subtitle}
                            </p>
                          </div>
                          <div className="col-auto">
                            {
                              item.content.button
                                && (
                                  <a href={item.content.button.link} className="btn btn-sm btn-white d-none d-md-inline-block">
                                    {item.content.button.title}
                                  </a>
                                )
                            }
                          </div>
                          <div className="col-auto">
                            <Dropdown menu={[{ title: 'Delete', func: () => handleDeleteCoursework(item.id) }]} />
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
      </div>
    </>
  );
};

export default CourseworksTab;
