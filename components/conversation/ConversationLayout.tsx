import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { timestampConverter } from '../../utilities/timestampConverter';
import ChatboxLayout from './ChatboxLayout';
import NewConversation from './NewConversation';

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

const ConversationLayout: React.FunctionComponent = () => {
  const { loading, error, data, refetch: channel_refetch } = useQuery(GET_CHANNELS);
  const [selectedChannel, setSelectedChannel] = React.useState(-1);
  const [search, setSearch] = React.useState('');
  let channels: any[] = [];

  if (error) {
    console.log(error);
  }

  if (!loading) {
    channels =  data.channels;
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
          <span className="fas fa-edit" style={{ cursor: 'pointer' }} />
        </div>
        <div className="conversation-left-scrollable">
          {
            channels.map((channel, index) => (
              <div
                className="channel"
                key={`channel-${index}`}
                onClick={() => setSelectedChannel(channel.id)}
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
      {
        selectedChannel > 0 && <ChatboxLayout selectedChannel={selectedChannel} channel_refetch={channel_refetch} />
      }
      {
        selectedChannel < 0 && (
          // <div className="conversation-right">
          //   <div className="conversation-right-header">
          //     <div className="header-content" />
          //   </div>
          //   <div id="chat-content" className="chat-content px-4" />
          // </div>
          <NewConversation />
        )
      }
    </div>
  );
};

export default ConversationLayout;
