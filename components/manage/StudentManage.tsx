import * as React from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { ListGroup } from 'react-bootstrap';
import { useEffect } from 'react';

const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      name
      itsc
    }
  }
`;

const StudentManage: React.FunctionComponent = () => {
  const [keyword, setKeyword] = React.useState('');
  const [userList, setUserList]: any[] = React.useState([]);

  const [getAllUsers] = useLazyQuery(GET_ALL_USERS, {
    onCompleted: (data) => {
      setUserList([...data.users]);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const filterUser = () => {
    return userList.filter((user: any) => user.name.toLowerCase().includes(keyword));
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card mt-5" style={{ flex: 1 }} data-toggle="lists">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col">
                  <h2 className="card-header-title">
                    Manage Users
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
              <ListGroup as="ul" variant="flush" className="list-group-lg list my-n4">
                {
                  filterUser().map((user: any, index: number) => (
                    <ListGroup.Item className="px-0" key={`course-${index}`}>
                      <div className="row align-items-center">
                        <div className="col ml-4">
                          <h3 className="card-title mb-0">
                            {user.name}
                          </h3>
                          <p className="card-text small text-muted">
                            {user.itsc}
                          </p>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManage;
