import * as React from 'react';
import { InputGroup } from 'react-bootstrap';
import { useLazyQuery, gql } from '@apollo/client';
// import { OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { timestampConverter } from '../../utilities/timestampConverter';

const SEARCH_USERS = gql`
  query searchUsers($name: String!) {
    users(where: { name: { _ilike: $name } }) {
      id
      itsc
      name
    }
  }
`;

const NewConversation: React.FunctionComponent = () => {
  const [input, setInput] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [searchUsersList, setSearchUsersList]: any[] = React.useState([]);
  const [searchUsers] = useLazyQuery(SEARCH_USERS, {
    variables: { name: `%${search}%` },
    onCompleted: (data) => {
      setSearchUsersList([...data.users]);
    }
  });

  const onChangeSearchUsers = (e: any) => {
    setSearch(e.target.value);
    searchUsers();
  }

  return (
    <div className="conversation-right">
      <div className="conversation-right-header" style={{ paddingRight: '16px' }}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              Recipient
            </InputGroup.Text>
          </InputGroup.Prepend>
          <input
            type="text"
            value={search}
            placeholder="Search..."
            onChange={(e) => onChangeSearchUsers(e)}
            className="form-control form-control-prepended"
          />
        </InputGroup>
        { search !== '' && (
            <div className="contact-dropdown">
              <h4 style={{ color: '#95AAC9', padding: '0.75rem 0.75rem 0 0.75rem' }}>Users</h4>
              {
                searchUsersList.map((user: any, index: number) => (
                  <div className="contact-dropdown-row" key={`search-user-${index}`}>
                    <img
                      alt=""
                      src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
                      className="avatar avatar-sm rounded-circle"
                    />
                    <h3 className="mb-0 ml-3">{user.name}</h3>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
      <div id="chat-content" className="chat-content px-4">
      </div>
      <div className="chat-inputbox px-3">
        <textarea
          value={input}
          style={{ resize: 'none' }}
          className="form-control"
          placeholder="Please type..."
          onChange={(e) => setInput(e.target.value)}
          //onKeyDown={onEnterPress}
        />
      </div>
    </div>
  );
};

export default NewConversation;
