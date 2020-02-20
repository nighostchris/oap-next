import * as React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { timestampConverter } from '../../utilities/timestampConverter';

interface ChatboxLayoutProps {
  selectedChannel: number
  channel_refetch: any
}

const GET_CONVERSATIONS_BY_ID = gql`
  query getConversationsByID($id: bigint!) {
    channels(where: {id: {_eq: $id}}) {
      id
      user {
        id
        name
        itsc
      }
      userByReceiver {
        id
        name
        itsc
      }
      conversations {
        message
        created_at
        user {
          itsc
        }
      }
    }
  }
`;

const INSERT_CONVERSATIONS = gql`
  mutation insertConversations($channel_id: bigint!, $message: String!, $user_id: bigint!) {
    insert_conversations(objects: {channel_id: $channel_id, message: $message, user_id: $user_id}) {
      returning {
        created_at
      }
    }
  }
`;

const ChatboxLayout: React.FunctionComponent<ChatboxLayoutProps> = ({ selectedChannel, channel_refetch }) => {
  const [input, setInput] = React.useState('');
  const [insertConversations] = useMutation(INSERT_CONVERSATIONS);
  const { loading: load, error: err, data, refetch } = useQuery(GET_CONVERSATIONS_BY_ID, {
    variables: { id: selectedChannel }
  });
  let messagesList: any;

  React.useEffect(() => {
    const chatContentDiv = document.getElementById("chat-content");
    if (chatContentDiv !== null) {
      chatContentDiv.scrollTop = chatContentDiv.scrollHeight;
    }
  });

  if (err) {
    console.log(err);
  }

  if (!load && data) {
    messagesList = data.channels[0];
  }

  const onEnterPress = (e: any) => {
    if (input !== '') {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        insertConversations({
          variables: {
            channel_id: messagesList.id,
            message: input,
            user_id: messagesList.user.itsc === 'kristopher' ? messagesList.user.id : messagesList.userByReceiver.id
          }
        }).then(() => {
          refetch();
          channel_refetch();
          setInput('');
        }).catch((error) => {
          console.log(error);
          setInput('');
        });
      }
    }
  }

  return (
    <div className="conversation-right">
      <div className="conversation-right-header">
        <div className="header-content">
          {
            messagesList && (
              <img
                alt=""
                src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
                className="avatar avatar-sm rounded-circle"
              />
            )
          }
          <h3 className="mb-0 ml-3">
            {
              messagesList && (messagesList.user.itsc === 'kristopher' ? messagesList.userByReceiver.name : messagesList.user.name)
            }
          </h3>
        </div>
      </div>
      <div id="chat-content" className="chat-content px-4">
        {
          messagesList && messagesList.conversations.map((conversation: any, index: number) => (
            <div className="chatbar" key={`chatbar-${index}`}>
              <OverlayTrigger
                placement={conversation.user.itsc === 'kristopher' ? 'left' : 'right'}
                overlay={
                  <Tooltip id="tooltip">{timestampConverter(new Date(conversation.created_at), true)}</Tooltip>
                }
              >
                <div className={`px-3 ${conversation.user.itsc === 'kristopher' ? 'mychat' : 'otherchat'}`}>
                  {conversation.message}
                </div>
              </OverlayTrigger>
            </div>
          ))
        }
      </div>
      {
        messagesList && (
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

export default ChatboxLayout;
