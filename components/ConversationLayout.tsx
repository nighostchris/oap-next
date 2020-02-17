import * as React from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { timestampConverter } from '../utilities/timestampConverter';
import ChatboxLayout from './ChatboxLayout';

const GET_CHANNELS = gql`
  query getChannels {
    channels(
      where: {
        _or: [
          { user: { itsc: { _eq: "kristopher" } } },
          { userByReceiver: { itsc: { _eq: "kristopher" } } }
        ]
      }
    ) {
      id
      user {
        name,
        itsc
      }
      userByReceiver {
        name,
        itsc
      }
      conversations(order_by: {created_at: desc}, limit: 1) {
        message
        created_at
      }
    }
  }
`;

const GET_CONVERSATIONS_BY_ID = gql`
  query getConversationsByID($id: bigint!) {
    channels(where: {id: {_eq: $id}}) {
      user {
        name
        itsc
      }
      userByReceiver {
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

const ConversationLayout: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery(GET_CHANNELS);
  const [getConversationsByID, { loading: load, error: err, data: d }] = useLazyQuery(GET_CONVERSATIONS_BY_ID);
  const [search, setSearch] = React.useState('');
  const [input, setInput] = React.useState('');
  let messagesList;
  let channels: any[] = [];

  if (error) {
    console.log(error);
  }

  if (!loading) {
    channels =  data.channels;
  }

  if (err) {
    console.log(err);
  }

  if (!load) {
    if (d !== undefined) {
      messagesList = d.channels[0];
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <div className="conversation-left">
        <div className="conversation-left-header">
          <div className="input-group input-group-merge">
            <input
              type="text"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-control form-control-prepended"
            />
            <div className="input-group-prepend">
              <div className="input-group-text">
                <span className="fas fa-search" />
              </div>
            </div>
          </div>
          <span className="fas fa-edit" />
        </div>
        <div className="conversation-left-scrollable">
          {
            channels.map((channel, index) => (
              <div
                className="channel"
                key={`channel-${index}`}
                onClick={() => getConversationsByID({ variables: { id: channel.id } })}
              >
                <img
                  alt=""
                  src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
                  className="avatar avatar-sm rounded-circle"
                />
                <div style={{ display: 'flex', flexDirection: 'column', width: 'calc(100% - 60px)' }}>
                  <h4>{ channel.user.itsc === 'kristopher' ? channel.userByReceiver.name : channel.user.name }</h4>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'left' }}>
                    <h6 className="mb-0" style={{ width: '74%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      { channel.conversations[0] && channel.conversations[0].message }
                    </h6>
                    <h6 className="mb-0" style={{ width: '26%', textAlign: 'end' }}>
                      { channel.conversations[0] && timestampConverter(new Date(channel.conversations[0].created_at), false).slice(0, -6) }
                    </h6>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <ChatboxLayout
        input={input}
        setInput={setInput}
        messagesList={messagesList}
      />
    </div>
  );
};

export default ConversationLayout;
