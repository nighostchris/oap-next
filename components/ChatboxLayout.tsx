import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { timestampConverter } from '../utilities/timestampConverter';

interface ChatboxLayoutProps {
  input: string
  setInput: (value: string | ((prevVar: string) => string)) => void
  messagesList: any
}

const ChatboxLayout: React.FunctionComponent<ChatboxLayoutProps> = ({ input, setInput, messagesList }) => {
  console.log(messagesList);
  React.useEffect(() => {
    const chatContentDiv = document.getElementById("chat-content");
    if (chatContentDiv !== null) {
      chatContentDiv.scrollTop = chatContentDiv.scrollHeight;
    }
  })

  return (
    <div className="conversation-right">
      <div className="conversation-right-header">
        <div className="header-content">
          <img
            alt=""
            src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
            className="avatar avatar-sm rounded-circle"
          />
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
      <div className="chat-inputbox px-3">
        <textarea
          value={input}
          style={{ resize: 'none' }}
          className="form-control"
          placeholder="Please type..."
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ChatboxLayout;
