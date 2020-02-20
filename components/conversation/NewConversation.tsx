import * as React from 'react';
import { InputGroup } from 'react-bootstrap';
import { useMutation, useLazyQuery, gql } from '@apollo/client';

interface NewConversationProps {
  setSelectedChannel: any
  channel_refetch: any
}

const SEARCH_USERS = gql`
  query searchUsers($name: String!) {
    users(where: { name: { _ilike: $name } }) {
      id
      itsc
      name
    }
  }
`;

const INSERT_CHANNEL = gql`
  mutation InsertChannel($sender_id: bigint!, $receiver_id: bigint!) {
    insert_channels(objects: {sender: $sender_id, receiver: $receiver_id}) {
      returning {
        id
      }
    }
  }
`;

const INSERT_CONVERSATION = gql`
  mutation InsertConversation($channel_id: bigint!, $message: String!, $user_id: bigint!) {
    insert_conversations(objects: {channel_id: $channel_id, message: $message, user_id: $user_id}) {
      returning {
        id
      }
    }
  }
`;

const NewConversation: React.FunctionComponent<NewConversationProps> = ({ channel_refetch, setSelectedChannel }) => {
  const [input, setInput] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [channelID, setChannelID] = React.useState(-1);
  const [selectedUser, setSelectedUser] = React.useState({id: -1, name: ''});
  const [searchUsersList, setSearchUsersList]: any[] = React.useState([]);

  const [searchUsers] = useLazyQuery(SEARCH_USERS, {
    variables: { name: `%${search}%` },
    onCompleted: (data) => {
      setSearchUsersList([...data.users]);
    }
  });

  const [insertConversation] = useMutation(INSERT_CONVERSATION, {
    onCompleted: () => {
      channel_refetch();
      setSelectedChannel(channelID);
    }
  });

  const [insertChannel] = useMutation(INSERT_CHANNEL, {
    onCompleted: (data) => {
      setChannelID(data.insert_channels.returning[0].id);

      insertConversation({
        variables: {
          channel_id: data.insert_channels.returning[0].id,
          message: input,
          user_id: 3
        }
      });
    }
  });

  const onChangeSearchUsers = (e: any) => {
    setSearch(e.target.value);
    searchUsers();
  }

  const changeSelectedUser = (index: number) => {
    setSelectedUser({
      id: searchUsersList[index].id,
      name: searchUsersList[index].name
    });
    setSearch('');
  }

  const onEnterPress = (e: any) => {
    if (input !== '') {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        if (input !== '') {
          insertChannel({
            variables: { sender_id: 3, receiver_id: selectedUser.id }
          });
        }
      }
    }
  }

  return (
    <div className="conversation-right">
      <div className="conversation-right-header" style={{ paddingRight: '16px' }}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              { selectedUser.id >= 0 ? `Recipient: ${selectedUser.name}` : 'Recipient' }
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
                  <div
                    key={`search-user-${index}`}
                    className="contact-dropdown-row"
                    onClick={() => changeSelectedUser(index)}
                  >
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
      <div id="chat-content" className="chat-content px-4" />
      {
        selectedUser.id >= 0 && (
          <div className="chat-inputbox px-3">
            <textarea
              value={input}
              style={{ resize: 'none' }}
              className="form-control"
              placeholder="Please type..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onEnterPress}
            />
          </div>
        )
      }
    </div>
  );
};

export default NewConversation;
